import { Filter, FrequencyResponseResult, FrequencyResponseComponent } from './frequency-response.interface';

export class FrequencyResponse {

    public static calculate(signalLength: number, filter: Filter, warmup: number): FrequencyResponseResult {
        if (!FrequencyResponse.isValidSignalLength(signalLength)) {
            throw new Error('signal length should be power of 2 and not less than 4');
        }

        const spectrumLength = signalLength / 2 - 1;
        const fr: FrequencyResponseResult = {
            label: filter.getMnemonic(),
            frequencies: FrequencyResponse.prepareFrequencyDomain(spectrumLength),
            powerPercent: FrequencyResponse.createFrequencyResponseComponent(spectrumLength),
            powerDecibel: FrequencyResponse.createFrequencyResponseComponent(spectrumLength),
            amplitudePercent: FrequencyResponse.createFrequencyResponseComponent(spectrumLength),
            amplitudeDecibel: FrequencyResponse.createFrequencyResponseComponent(spectrumLength),
            phaseDegrees: FrequencyResponse.createFrequencyResponseComponent(spectrumLength)
        };

        const signal = FrequencyResponse.prepareFilteredSignal(signalLength, filter, warmup);
        FrequencyResponse.directRealFastFourierTransform(signal);
        FrequencyResponse.parseSpectrum(spectrumLength, signal, fr.powerPercent, fr.amplitudePercent, fr.phaseDegrees);
        FrequencyResponse.toDecibels(spectrumLength, fr.powerPercent, fr.powerDecibel);
        FrequencyResponse.toPercents(spectrumLength, fr.powerPercent, fr.powerPercent);
        FrequencyResponse.toDecibels(spectrumLength, fr.amplitudePercent, fr.amplitudeDecibel);
        FrequencyResponse.toPercents(spectrumLength, fr.amplitudePercent, fr.amplitudePercent);

        return fr;
    }

    protected static isValidSignalLength(len: number): boolean {
        while (len > 4) {
            if (len % 2 !== 0) {
                return false;
            }

            len /= 2;
        }

        return len === 4;
    }

    protected static prepareFrequencyDomain(len: number): number[] {
        const freq = new Array<number>(len);
        for (let i = 0; i < len; ++i) {
            freq[i] = (1 + i) / len;
        }

        return freq;
    }

    protected static prepareFilteredSignal(len: number, filter: Filter, warmup: number): number[] {
        for (let i = 0; i < warmup; ++i) {
            filter.update(0);
        }

        const signal = new Array<number>(len);
        signal[0] = filter.update(1000);

        for (let i = 1; i < len; ++i) {
            signal[i] = filter.update(0);
        }

        return signal;
    }

    protected static createFrequencyResponseComponent(len: number): FrequencyResponseComponent {
        return { min: -Infinity, max: Infinity, data: new Array<number>(len) };
    }

    protected static parseSpectrum(len: number, spectrum: number[],
        power: FrequencyResponseComponent, amplitude: FrequencyResponseComponent, phase: FrequencyResponseComponent) {
        const rad2deg = 180 / Math.PI;
        let pmin = Infinity;
        let pmax = -Infinity;
        let amin = Infinity;
        let amax = -Infinity;

        for (let i = 0, k = 2; i < len; ++i) {
            const re = spectrum[k++];
            const im = spectrum[k++];

            const ph = FrequencyResponse.normalizeDegrees(-Math.atan2(im, re) * rad2deg);
            phase.data[i] = ph;

            const pwr = re * re + im * im;
            power.data[i] = pwr;
            pmin = Math.min(pmin, pwr);
            pmax = Math.max(pmax, pwr);

            const amp = Math.sqrt(pwr);
            amplitude.data[i] = amp;
            amin = Math.min(amin, amp);
            amax = Math.max(amax, amp);
        }

        phase.min = -180;
        phase.max = 180;
        power.min = pmin;
        power.max = pmax;
        amplitude.min = amin;
        amplitude.max = amax;
    }

    /** Normalizes degrees to the [-180, 180] range. */
    protected static normalizeDegrees(deg: number): number {
        const limit = 180;

        while (deg > limit) {
            deg -= limit;
        }

        while (deg < -limit) {
            deg += limit;
        }

        return deg;
    }

    protected static toDecibels(len: number, src: FrequencyResponseComponent, tgt: FrequencyResponseComponent) {
        const five = 5;
        const ten = 10;
        const twenty = 20;
        const hundreed = 100;
        let dbmin = Infinity;
        let dbmax = -Infinity;
        let base = src.data[0];
        if (base < Number.EPSILON) {
            base = src.max;
        }

        for (let i = 0; i < len; ++i) {
            const db = twenty * Math.log10(src.data[i] / base);
            dbmin = Math.min(dbmin, db);
            dbmax = Math.max(dbmax, db);
            tgt.data[i] = db;
        }

        // If dbmin falls into one of [-100, -90), [-90, -80), ..., [-10, 0)
        // intervals, set it to the minimum value of the interval.
        for (let i = ten; i > 0; --i) {
            const min = -i * ten;
            const max = -(i - 1) * ten;
            if (dbmin >= min && dbmin < max) {
                dbmin = min;
                break;
            }
        }

        // Limit all minimal decibel values to -100.
        if (dbmin < -hundreed) {
            dbmin = -hundreed;
            for (let i = 0; i < len; ++i) {
                if (tgt.data[i] < -hundreed) {
                    tgt.data[i] = -hundreed;
                }
            }
        }

        // If dbmax falls into one of [0, 5), [5, 10)
        // intervals, set it to the maximum value of the interval.
        for (let i = 2; i > 0; --i) {
            const max = i * five;
            const min = (i - 1) * five;
            if (dbmax >= min && dbmax < max) {
                dbmax = max;
                break;
            }
        }

        // Limit all maximal decibel values to 10.
        if (dbmax > ten) {
            dbmax = ten;
            for (let i = 0; i < len; ++i) {
                if (tgt.data[i] > ten) {
                    tgt.data[i] = ten;
                }
            }
        }

        tgt.min = dbmin;
        tgt.max = dbmax;
    }

    protected static toPercents(len: number, src: FrequencyResponseComponent, tgt: FrequencyResponseComponent) {
        const ten = 10;
        const hundreed = 100;
        const twohundred = 200;
        const pctmin = 0;
        let pctmax = -Infinity;
        let base = src.data[0];
        if (base < Number.EPSILON) {
            base = src.max;
        }

        for (let i = 0; i < len; ++i) {
            const pct = hundreed * src.data[i] / base;
            pctmax = Math.max(pctmax, pct);
            tgt.data[i] = pct;
        }

        // If pctmax falls into one of [100, 110), [110, 120), ...,  [190, 200)
        // intervals, set it to the maximum value of the interval.
        for (let i = 0; i < ten; ++i) {
            const min = hundreed + i * ten;
            const max = hundreed + (i + 1) * ten;
            if (pctmax >= min && pctmax < max) {
                pctmax = max;
                break;
            }
        }

        // Limit all maximal percentages values to 200.
        if (pctmax > twohundred) {
            pctmax = twohundred;
            for (let i = 0; i < len; ++i) {
                if (tgt.data[i] > twohundred) {
                    tgt.data[i] = twohundred;
                }
            }
        }

        tgt.min = pctmin;
        tgt.max = pctmax;
    }

    /**
     * Performs a direct real fast Fourier transform.
     *
     * The input parameter is a data array containing real data on input and {re,im} pairs on return.
     *
     * The length of the input data slice must be a power of 2 (128, 256, 512, 1024, 2048, 4096).
     * Since this is an internal function, we don't check the validity of the length here.
     * */
    protected static directRealFastFourierTransform(array: number[]) {
        const half = 0.5;
        const two = 2;
        const twoPi = two * Math.PI;
        const four = 4;
        const len = array.length;
        const ttheta = twoPi / len;
        const nn = len / 2;

        let j = 1;
        for (let ii = 1; ii <= nn; ++ii) {
            const i = two * ii - 1;
            if (j > i) {
                const tmpR = array[j - 1];
                const tmpI = array[j];
                array[j - 1] = array[i - 1];
                array[j] = array[i];
                array[i - 1] = tmpR;
                array[i] = tmpI;
            }

            let m = nn;
            while (m >= 2 && j > m) {
                j -= m;
                m /= 2;
            }
            j += m;
        }

        let mMax = two;
        let n = len;
        while (n > mMax) {
            const istep = two * mMax;
            const theta = twoPi / mMax;
            const wpI = Math.sin(theta);
            let wpR = Math.sin(half * theta);
            wpR = -two * wpR * wpR;
            let wR = 1.0;
            let wI = 0.0;
            for (let ii = 1; ii <= mMax / two; ++ii) {
                const m = two * ii - 1;
                for (let jj = 0; jj <= (n - m) / istep; ++jj) {
                    const i = m + jj * istep;
                    j = i + mMax;
                    const tmpR = wR * array[j - 1] - wI * array[j];
                    const tmpI = wR * array[j] + wI * array[j - 1];
                    array[j - 1] = array[i - 1] - tmpR;
                    array[j] = array[i] - tmpI;
                    array[i - 1] = array[i - 1] + tmpR;
                    array[i] = array[i] + tmpI;
                }
                const wtemp = wR;
                wR = wR * wpR - wI * wpI + wR;
                wI = wI * wpR + wtemp * wpI + wI;
            }
            mMax = istep;
        }

        const twpI = Math.sin(ttheta);
        let twpR = Math.sin(half * ttheta);
        twpR = -two * twpR * twpR;
        let twR = 1 + twpR;
        let twI = twpI;
        n = len / four + 1;
        for (let i = 2; i <= n; ++i) {
            const i1 = i + i - 2;
            const i2 = i1 + 1;
            const i3 = len + 1 - i2;
            const i4 = i3 + 1;
            const wRs = twR;
            const wIs = twI;
            const h1R = half * (array[i1] + array[i3]);
            const h1I = half * (array[i2] - array[i4]);
            const h2R = half * (array[i2] + array[i4]);
            const h2I = -half * (array[i1] - array[i3]);
            array[i1] = h1R + wRs * h2R - wIs * h2I;
            array[i2] = h1I + wRs * h2I + wIs * h2R;
            array[i3] = h1R - wRs * h2R + wIs * h2I;
            array[i4] = -h1I + wRs * h2I + wIs * h2R;
            const twTmp = twR;
            twR = twR * twpR - twI * twpI + twR;
            twI = twI * twpR + twTmp * twpI + twI;
        }

        twR = array[0];
        array[0] = twR + array[1];
        array[1] = twR - array[1];
    }
}

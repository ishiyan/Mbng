import { FrequencyResponse, Filter } from './frequency-response.interface';

export const isValidSignalLength = (len: number): boolean => {
    while (len > 4) {
        if (len % 2 != 0) {
            return false;
        }

        len /= 2;
    }

    return len == 4
}

export const prepareFrequencyDomain = (len: number, freq: number[]) => {
    for (let i = 0; i < len; ++i) {
        freq[i] = (1 + i) / len;
    }
}

export const prepareFilteredSignal = (len: number, filter: Filter, warmup: number): number[] => {
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


export const normalize = (len: number, array: number[], max: number) => {
    if (max < Number.EPSILON) {
        return;
    }

    for (let i = 0; i < len; ++i) {
        array[i] /= max;
    }
}

/**
 * Performs a direct real fast Fourier transform.
 *
 * The input parameter is a data array containing real data on input and {re,im} pairs on return.
 *
 * The length of the input data slice must be a power of 2 (128, 256, 512, 1024, 2048, 4096).
 * Since this is an internal function, we don't check the validity of the length here.
 * */
export const directRealFastFourierTransform = (array: number[]) => {
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
};

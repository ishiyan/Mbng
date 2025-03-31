import { HilbertTransformerCycleEstimator } from './hilbert-transformer-cycle-estimator.interface';
import { HilbertTransformerCycleEstimatorParams } from './hilbert-transformer-cycle-estimator-params.interface';

const defaultMinPeriod = 6;
const defaultMaxPeriod = 50;
const htLength = 7;
const quadratureIndex = htLength / 2;

/** The default value of the WMA (linear-Weighted Moving Average) smoothing length. */
const defaultSmoothingLength = 4;

/** The default value of α (0 &lt; α ≤ 1) used in EMA to smooth the in-phase and quadrature components. */
const defaultAlphaEmaQuadratureInPhase = 0.2;

/** The default value of α (0 &lt; α ≤ 1) used in EMA to smooth the instantaneous period. */
const defaultAlphaEmaPeriod = 0.2;

/** The default value of the number of updates before the indicator is primed (MaxPeriod * 2 = 100). */
const defaultWarmUpPeriod = defaultMaxPeriod * 2;

/** Shift all elements to the right and place the new value at index zero. */
function push(array: number[], value: number): void {
  for (let i = array.length - 1; i > 0; i--) {
    array[i] = array[i - 1];
  }
  array[0] = value;
}

function correctAmplitude(previousPeriod: number): number {
  const a = 0.54;
  const b = 0.075;
  return a + b * previousPeriod;
}

function ht(array: number[]): number {
  const a = 0.0962;
  const b = 0.5769;
  let value = 0;
  value += a * array[0];
  value += b * array[2];
  value -= b * array[4];
  value -= a * array[6];
  return value;
}

function adjustPeriod(period: number, periodPrevious: number): number {
  const minPreviousPeriodFactor = 0.67;
  const maxPreviousPeriodFactor = 1.5;

  let temp = maxPreviousPeriodFactor * periodPrevious;
  if (period > temp) {
    period = temp;
  } else {
    temp = minPreviousPeriodFactor * periodPrevious;
    if (period < temp)
      period = temp;
  }

  if (period < defaultMinPeriod)
    period = defaultMinPeriod;
  else if (period > defaultMaxPeriod)
    period = defaultMaxPeriod;
  return period;
}

/** A Hilbert transformer of WMA-smoothed and detrended data with the Homodyne Discriminator applied.
  *
  *  John Ehlers, Rocket Science for Traders, Wiley, 2001, 0471405671, pp 52-77.
  */
export class HilbertTransformerHomodyneDiscriminator implements HilbertTransformerCycleEstimator {

  /** The underlying linear-Weighted Moving Average (WMA) smoothing length. */
  public readonly smoothingLength: number = defaultSmoothingLength;

  /** The current WMA-smoothed value used by underlying Hilbert transformer.
   * 
   * The linear-Weighted Moving Average has a window size of __smoothingLength__.
   */
  public get smoothedValue(): number { return this.wmaSmoothed[0]; }

  /** The current de-trended value. */
  public get detrendedValue(): number { return this.detrended[0]; }

  /** The current Quadrature component value. */
  public get quadratureValue(): number { return this.quadrature[0]; }

  /** The current InPhase component value. */
  public get inPhaseValue(): number { return this.inPhase[0]; }

  /** The current period value. */
  public get periodValue(): number { return this.period; }

  /** The current count value. */
  public get countValue(): number { return this.count; }

  /** Indicates whether an estimator is primed. */
  public get primed(): boolean { return this.isWarmedUp; }

  /** The minimal cycle period supported by this Hilbert transformer. */
  public readonly minPeriod: number = defaultMinPeriod;

  /** The maximual cycle period supported by this Hilbert transformer. */
  public readonly maxPeriod: number = defaultMaxPeriod;

  /** The value of α (0 < α ≤ 1) used in EMA to smooth the in-phase and quadrature components. */
  public readonly alphaEmaQuadratureInPhase: number = defaultAlphaEmaQuadratureInPhase;

  /** The value of α (0 < α ≤ 1) used in EMA to smooth the instantaneous period. */
  public readonly alphaEmaPeriod: number = defaultAlphaEmaPeriod;

  /** The number of updates before the estimator is primed (MaxPeriod * 2 = 100). */
  public readonly warmUpPeriod: number = defaultWarmUpPeriod;

  private readonly smoothingLengthPlusHtLengthMin1: number;
  private readonly smoothingLengthPlus2HtLengthMin2: number;
  private readonly smoothingLengthPlus3HtLengthMin3: number;
  private readonly smoothingLengthPlus3HtLengthMin2: number;
  private readonly smoothingLengthPlus3HtLengthMin1: number;
  private readonly smoothingLengthPlus3HtLength: number;

  private readonly oneMinAlphaEmaQuadratureInPhase: number = 1 - defaultAlphaEmaQuadratureInPhase;
  private readonly oneMinAlphaEmaPeriod: number = 1 - defaultAlphaEmaPeriod;

  private readonly rawValues: Array<number>;
  private readonly wmaFactors: Array<number>;
  private readonly wmaSmoothed: Array<number> = new Array(htLength).fill(0);
  private readonly detrended: Array<number> = new Array(htLength).fill(0);
  private readonly inPhase: Array<number> = new Array(htLength).fill(0);
  private readonly quadrature: Array<number> = new Array(htLength).fill(0);
  private readonly jInPhase: Array<number> = new Array(htLength).fill(0);
  private readonly jQuadrature: Array<number> = new Array(htLength).fill(0);

  private count: number = 0;
  private smoothedInPhasePrevious: number = 0;
  private smoothedQuadraturePrevious: number = 0;
  private rePrevious: number = 0;
  private imPrevious: number = 0;
  private period: number = defaultMinPeriod;
  private isPrimed = false;
  private isWarmedUp = false;

  /**
   * Constructs an instance using given parameters.
   **/
  public constructor(params: HilbertTransformerCycleEstimatorParams) {
    const length = Math.floor(params.smoothingLength);
    if (length < 2 || length > 4) {
      throw new Error('smoothingLength should be in range [2, 4]');
    }

    const alphaQuad = params.alphaEmaQuadratureInPhase;
    if (alphaQuad <= 0 || alphaQuad >= 1) {
      throw new Error('alphaEmaQuadratureInPhase should be in range (0, 1)');
    }

    const alphaPeriod = params.alphaEmaPeriod;
    if (alphaPeriod <= 0 || alphaPeriod >= 1) {
      throw new Error('alphaEmaQuadratureInPhase should be in range (0, 1)');
    }

    this.alphaEmaQuadratureInPhase = alphaQuad;
    this.oneMinAlphaEmaQuadratureInPhase = 1 - alphaQuad;
    this.alphaEmaPeriod = alphaPeriod;
    this.oneMinAlphaEmaPeriod = 1 - alphaPeriod;

    this.smoothingLength = length;
    this.smoothingLengthPlusHtLengthMin1 = length + htLength - 1;
    this.smoothingLengthPlus2HtLengthMin2 = this.smoothingLengthPlusHtLengthMin1 + htLength - 1;
    this.smoothingLengthPlus3HtLengthMin3 = this.smoothingLengthPlus2HtLengthMin2 + htLength - 1;
    this.smoothingLengthPlus3HtLengthMin2 = this.smoothingLengthPlus3HtLengthMin3 + 1;
    this.smoothingLengthPlus3HtLengthMin1 = this.smoothingLengthPlus3HtLengthMin2 + 1;
    this.smoothingLengthPlus3HtLength = this.smoothingLengthPlus3HtLengthMin1 + 1;

    this.rawValues = new Array(length).fill(0);

    this.wmaFactors = new Array(length);
    if (length === 4) {
      this.wmaFactors[0] = 4 / 10;
      this.wmaFactors[1] = 3 / 10;
      this.wmaFactors[2] = 2 / 10;
      this.wmaFactors[3] = 1 / 10;
    } else if (length === 3) {
      this.wmaFactors[0] = 3 / 6;
      this.wmaFactors[1] = 2 / 6;
      this.wmaFactors[2] = 1 / 6;
    } else { //if (length === 2)
      this.wmaFactors[0] = 2 / 3;
      this.wmaFactors[1] = 1 / 3;
    }

    if (params.warmUpPeriod && params.warmUpPeriod < this.smoothingLengthPlus3HtLength) {
      this.warmUpPeriod = params.warmUpPeriod;
    } else {
      this.warmUpPeriod = this.smoothingLengthPlus3HtLength;
    }
  }

  private wma(array: number[]): number {
    let value = 0;
    for (let i = 0; i < this.smoothingLength; ++i) {
      value += this.wmaFactors[i] * array[i];
    }

    return value;
  }

  private emaQuadratureInPhase(value: number, valuePrevious: number): number {
    return this.alphaEmaQuadratureInPhase * value + this.oneMinAlphaEmaQuadratureInPhase * valuePrevious;
  }

  private emaPeriod(value: number, valuePrevious: number): number {
    return this.alphaEmaPeriod * value + this.oneMinAlphaEmaPeriod * valuePrevious;
  }

  /** Updates the estimator given the next sample value. */
  public update(sample: number): void {
    if (Number.isNaN(sample)) {
      return;
    }

    push(this.rawValues, sample);
    if (this.isPrimed) {
      if (!this.isWarmedUp && this.warmUpPeriod < ++this.count) {
        this.isWarmedUp = true;
      }

      // The WMA is used to remove some high-frequency components before detrending the signal.
      push(this.wmaSmoothed, this.wma(this.rawValues));

      const amplitudeCorrectionFactor = correctAmplitude(this.period);

      // Since we have an amplitude-corrected Hilbert transformer, and since we want to detrend
      // over its length, we simply use the Hilbert transformer itself as the detrender.
      push(this.detrended, ht(this.wmaSmoothed) * amplitudeCorrectionFactor);

      // Compute both the in-phase and quadrature components of the detrended signal.
      push(this.quadrature, ht(this.detrended) * amplitudeCorrectionFactor);
      push(this.inPhase, this.detrended[quadratureIndex]);

      // Complex averaging: apply the Hilbert Transformer to both the in-phase and quadrature components.
      // This advances the phase of each component by 90°.
      push(this.jInPhase, ht(this.inPhase) * amplitudeCorrectionFactor);
      push(this.jQuadrature, ht(this.quadrature) * amplitudeCorrectionFactor);

      // Phasor addition for 3 bar averaging followed by exponential moving average smoothing.
      const smoothedInPhase = this.emaQuadratureInPhase(this.inPhase[0] - this.jQuadrature[0], this.smoothedInPhasePrevious);
      const smoothedQuadrature = this.emaQuadratureInPhase(this.quadrature[0] + this.jInPhase[0], this.smoothedQuadraturePrevious);

      // Homodyne discriminator. Calculate the real and imaginary components of the signal
      // of the current sample multiplied with the complex conjugate of the signal 1 sample ago.
      let re = smoothedInPhase * this.smoothedInPhasePrevious + smoothedQuadrature * this.smoothedQuadraturePrevious;
      let im = smoothedInPhase * this.smoothedQuadraturePrevious - smoothedQuadrature * this.smoothedInPhasePrevious;
      this.smoothedInPhasePrevious = smoothedInPhase;
      this.smoothedQuadraturePrevious = smoothedQuadrature;

      // Exponential moving average smoothing of the real and imaginary components.
      re = this.emaQuadratureInPhase(re, this.rePrevious);
      im = this.emaQuadratureInPhase(im, this.imPrevious);
      this.rePrevious = re;
      this.imPrevious = im;

      const periodPrevious = this.period;
      // const periodNew = 2 * Math.PI / Math.atan(im / re);
      const periodNew = Math.atan2(im, re);
      if (!Number.isNaN(periodNew) && Number.isFinite(periodNew)) {
        this.period = periodNew;
      }

      this.period = adjustPeriod(this.period, periodPrevious);

      // Exponential moving average smoothing of the period.
      this.period = this.emaPeriod(this.period, periodPrevious);
    } else {
      ++this.count;

      // On (smoothingLength)-th sample we calculate the first WMA smoothed value and begin with the detrender.
      if (this.smoothingLength > this.count) {
        return;
      }

      push(this.wmaSmoothed, this.wma(this.rawValues));
      if (this.smoothingLengthPlusHtLengthMin1 > this.count) {
        return;
      }

      const amplitudeCorrectionFactor = correctAmplitude(this.period);

      push(this.detrended, ht(this.wmaSmoothed) * amplitudeCorrectionFactor);
      if (this.smoothingLengthPlus2HtLengthMin2 > this.count) {
        return;
      }

      push(this.quadrature, ht(this.detrended) * amplitudeCorrectionFactor);
      push(this.inPhase, this.detrended[quadratureIndex]);
      if (this.smoothingLengthPlus3HtLengthMin3 > this.count) {
        return;
      }

      push(this.jInPhase, ht(this.inPhase) * amplitudeCorrectionFactor);
      push(this.jQuadrature, ht(this.quadrature) * amplitudeCorrectionFactor);

      if (this.smoothingLengthPlus3HtLengthMin3 === this.count) {
        this.smoothedInPhasePrevious = this.inPhase[0] - this.jQuadrature[0];
        this.smoothedQuadraturePrevious = this.quadrature[0] + this.jInPhase[0];
        return;
      }

      const smoothedInPhase = this.emaQuadratureInPhase(this.inPhase[0] - this.jQuadrature[0], this.smoothedInPhasePrevious);
      const smoothedQuadrature = this.emaQuadratureInPhase(this.quadrature[0] + this.jInPhase[0], this.smoothedQuadraturePrevious);

      let re = smoothedInPhase * this.smoothedInPhasePrevious + smoothedQuadrature * this.smoothedQuadraturePrevious;
      let im = smoothedInPhase * this.smoothedQuadraturePrevious - smoothedQuadrature * this.smoothedInPhasePrevious;
      this.smoothedInPhasePrevious = smoothedInPhase;
      this.smoothedQuadraturePrevious = smoothedQuadrature;

      if (this.smoothingLengthPlus3HtLengthMin2 === this.count) {
        this.rePrevious = re;
        this.imPrevious = im;
        return;
      }

      re = this.emaQuadratureInPhase(re, this.rePrevious);
      im = this.emaQuadratureInPhase(im, this.imPrevious);
      this.rePrevious = re;
      this.imPrevious = im;

      const periodPrevious = this.period;
      if (this.smoothingLengthPlus3HtLengthMin1 === this.count) {
        // const periodNew = 2 * Math.PI / Math.atan(im / re);
        const periodNew = Math.atan2(im, re);
        if (!Number.isNaN(periodNew) && Number.isFinite(periodNew)) {
          this.period = periodNew;
        }

        this.period = adjustPeriod(this.period, periodPrevious);
        return;
      }

      // const periodNew = 2 * Math.PI / Math.atan(im / re);
      const periodNew = Math.atan2(im, re);
      if (!Number.isNaN(periodNew) && Number.isFinite(periodNew)) {
        this.period = periodNew;
      }

      this.period = adjustPeriod(this.period, periodPrevious);
      this.period = this.emaPeriod(this.period, periodPrevious);
      this.isPrimed = true;
    }
  }
}

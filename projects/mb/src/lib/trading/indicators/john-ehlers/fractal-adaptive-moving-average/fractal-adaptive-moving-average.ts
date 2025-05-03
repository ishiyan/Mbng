import { Bar } from '../../../../data/entities/bar';
import { Quote } from '../../../../data/entities/quote';
import { Scalar } from '../../../../data/entities/scalar';
import { Trade } from '../../../../data/entities/trade';
import { LineIndicator } from '../../indicator/line-indicator';
import { IndicatorMetadata } from '../../indicator/indicator-metadata.interface';
import { IndicatorOutput } from '../../indicator/indicator-output';
import { IndicatorOutputType } from '../../indicator/indicator-output-type.enum';
import { IndicatorType } from '../../indicator/indicator-type.enum';
import { FractalAdaptiveMovingAverageParams } from './fractal-adaptive-moving-average-params.interface';
 
/** Function to calculate mnemonic of the __FractalAdaptiveMovingAverage__ indicator. */
export const fractalAdaptiveMovingAverageMnemonic =
  (params: FractalAdaptiveMovingAverageParams): string => {
      const alpha = params.slowestSmoothingFactor ? ', '+params.slowestSmoothingFactor.toFixed(3) : '';
      return 'frama('.concat(Math.floor(params.length).toString(), alpha, ')');
  };

  /** Function to calculate mnemonic of a fractal dimension output of the __FractalAdaptiveMovingAverage__ indicator. */
export const fractalAdaptiveMovingAverageDimMnemonic =
  (params: FractalAdaptiveMovingAverageParams): string => {
      return 'framaDim('.concat(Math.floor(params.length).toString(), ')');
  };

/** __Fractal Adaptive Moving Average__ (Ehler's fractal adaptive moving average, _FRAMA_)
 * is an EMA with the smoothing factor, α, being changed with each new sample:
 *
 *	FRAMAᵢ = αᵢPᵢ + (1 - αᵢ)*FRAMAᵢ₋₁,  αs ≤ αᵢ ≤ 1
 *
 * Here the αs is the slowest α (default suggested value is 0.01 or equivalent length of 199 samples).
 *
 * The concept of _FRAMA_ is to relate the fractal dimension FDᵢ, calculated on a window
 * samples, to the EMA smoothing factor αᵢ, thus making the EMA adaptive.
 *
 *This dependency is defined as follows:
 *
 *	αᵢ = exp(-w(FDᵢ - 1)),  1 ≤ FDᵢ ≤ 2,
 *
 *	w = ln(αs)
 *
 *	or, given the length ℓs = 2/αs - 1,
 *
 *	w = ln(2/(ℓs + 1))
 *
 * The fractal dimension varies over the range from 1 to 2.
 * 
 * When FDᵢ = 1 (series forms a straight line), the exponent is zero – which means that
 * αᵢ = 1, and the output of the exponential moving average is equal to the input.
 *
 * When FDᵢ = 2 (series fills all plane, excibiting extreme volatility), the exponent
 * is -w, which means that αᵢ = αs, and the output of the exponential moving average
 * is equal to the output of the slowest moving average with αs.
 *
 * The fractal dimension is estimated by using a "box count" method.
 * Since price samples are typically uniformly spaced, the box count is approximated
 * by the average slope of the price curve. This is calculated as the highest price
 * minus the lowest price within an interval, divided by the length of that interval.
 *
 *	FDᵢ = (ln(N1+N2) − ln(N3)) / ln(2)
 *
 * N1 is calculated over the first half of the total lookback period ℓ as the
 * (highest price - lowest price) during the first ℓ/2 bars, divided by ℓ/2.
 *
 * N2 is calculated over the second half of the total lookback period ℓ as the
 * (lighest price - lowest price) during the second ℓ/2 bars (from ℓ/2 to ℓ-1 bars ago),
 * divided by ℓ/2.
 *
 * N3 is calculated over the entire lookback period ℓ as the
 * (highest price - lowest price) during the full ℓ bars, divided by ℓ.
 *
 * The box-counting method itself, often used to determine fractal dimension,
 * is also known as the Minkowski–Bouligand dimension, named after Hermann Minkowski
 * and Georges Bouligand. Here's how the box-counting method generally works.
 *
 *  1. Cover the pattern by overlaying it with a grid of square boxes,
 *     all of the same side length (s).
 *  2. Count the number of boxes (N) in the grid that contain at least
 *     some part of the pattern.
 *  3. Repeat steps 1 and 2 using grids with progressively smaller box sizes (s).
 *  4. Calculate dimension by examining the relationship between N(s) and s,
 *     typically as s approaches zero. Mathematically, it's defined as the limit:
 *     FD = lim(s→0) [ln(N(s)) / ln(1/s)]
 * 
 * Reference:
 *
 *	Falconer, K. (2014). Fractal geometry: Mathematical foundations and applications (3rd ed) Wiley.
 *
 *	Ehlers, John F. (2005). Fractal Adaptive Moving Average. Technical Analysis of Stocks & Commodities, 23(10), 81–82.
 *
 *	Ehlers, John F. (2006). FRAMA – Fractal Adaptive Moving Average, https://www.mesasoftware.com/papers/FRAMA.pdf.
 */
export class FractalAdaptiveMovingAverage extends LineIndicator {
  private readonly length: number;
  private readonly lengthMinOne: number;
  private readonly halfLength: number;
  private readonly alphaSlowest: number;
  private readonly scalingFactor: number;
  private windowCount: number = 0;
  private value: number = Number.NaN;
  private fractalDimension: number = Number.NaN;
  private readonly windowHigh: Array<number>
  private readonly windowLow: Array<number>
  private mnemonicFdim: string;
  private descriptionFdim: string;

  /**
   * Constructs an instance given input parameters.
   **/
  public constructor(params: FractalAdaptiveMovingAverageParams) {
    super();

    let len = Math.floor(params.length);
    if (len < 2) {
      throw new Error('length should be an even integer larger than 1');
    }

    if (len % 2 !== 0) {
      len++;
    }

    let alpha = 0.01
    if (params.slowestSmoothingFactor !== undefined) {
      if (params.slowestSmoothingFactor <= 0 || params.slowestSmoothingFactor >= 1) {
        throw new Error('fast limit smoothing factor should be in range (0, 1)');
      }

      alpha = params.slowestSmoothingFactor;
    }

    this.length = len;
    this.lengthMinOne = len - 1;
    this.halfLength = Math.floor(len / 2);
    this.alphaSlowest = alpha;
    this.scalingFactor = Math.log(alpha);
    this.windowHigh = new Array(len).fill(0);
    this.windowLow = new Array(len).fill(0);
    this.primed = false;

    const lenOriginal = params.length;
    params.length = len;
    this.mnemonic = fractalAdaptiveMovingAverageMnemonic(params);
    this.mnemonicFdim = fractalAdaptiveMovingAverageDimMnemonic(params);
    params.length = lenOriginal;

    const descr = "Fractal adaptive moving average ";
    this.description =  descr + this.mnemonic;
    this.descriptionFdim =  descr + this.mnemonicFdim;
  }

  /** The value of the FRAMA component of the indicator. */
  public getFrama(): number { return this.primed ? this.value : Number.NaN; }

  /** The value of the fractal dimension component of the indicator. */
  public getFdim(): number { return this.primed ? this.fractalDimension : Number.NaN; }

  /** The mnemonic of the fractal dimension component of the indicator. */
  public getMnemonicFdim(): string { return this.mnemonicFdim; }

  /** The description of the fractal dimension component of the indicator. */
  public getDescriptionFdim(): string { return this.descriptionFdim; }

  /** Describes a requested output data of an indicator. */
  public override metadata(): IndicatorMetadata {
    return {
      type: IndicatorType.FractalAdaptiveMovingAverage,
      outputs: [
        {kind: 0, type: IndicatorOutputType.Scalar, mnemonic: this.mnemonic, description: this.description },
        {kind: 1, type: IndicatorOutputType.Scalar, mnemonic: this.mnemonicFdim, description: this.descriptionFdim }
      ]
    };
  }

  /** Updates an indicator given the next scalar sample. */
  public override updateScalar(sample: Scalar): IndicatorOutput {
    const scalarFrama = new Scalar();
    scalarFrama.time = sample.time;
    scalarFrama.value = this.update(sample.value);

    const scalarFdim = new Scalar();
    scalarFdim.time = sample.time;
    scalarFdim.value = this.fractalDimension;
    return [scalarFrama, scalarFdim];
  }

  /** Updates an indicator given the next bar sample. */
  public override updateBar(sample: Bar): IndicatorOutput {
    const scalarFrama = new Scalar();
    scalarFrama.time = sample.time;
    scalarFrama.value = this.updateWithHighLow(this.barComponentFunc(sample), sample.high, sample.low);

    const scalarFdim = new Scalar();
    scalarFdim.time = sample.time;
    scalarFdim.value = this.fractalDimension;
    return [scalarFrama, scalarFdim];
  }

  /** Updates an indicator given the next quote sample. */
  public override updateQuote(sample: Quote): IndicatorOutput {
    const scalarFrama = new Scalar();
    scalarFrama.time = sample.time;
    scalarFrama.value = this.updateWithHighLow(this.quoteComponentFunc(sample), sample.askPrice, sample.bidPrice);

    const scalarFdim = new Scalar();
    scalarFdim.time = sample.time;
    scalarFdim.value = this.fractalDimension;
    return [scalarFrama, scalarFdim];
  }

  /** Updates an indicator given the next trade sample. */
  public override updateTrade(sample: Trade): IndicatorOutput {
    const scalarFrama = new Scalar();
    scalarFrama.time = sample.time;
    scalarFrama.value = this.update(sample.price);

    const scalarFdim = new Scalar();
    scalarFdim.time = sample.time;
    scalarFdim.value = this.fractalDimension;
    return [scalarFrama, scalarFdim];
  }

  /** Updates the value of the indicator given the next sample. */
  public update(sample: number): number {
    return this.updateWithHighLow(sample, sample, sample);
  }

  /** Updates the value of the indicator given the next sample. */
  public updateWithHighLow(sample: number, sampleHigh: number, sampleLow: number): number {
    if (Number.isNaN(sample) || Number.isNaN(sampleHigh) || Number.isNaN(sampleLow)) {
      return Number.NaN;
    }

    if (this.primed) {
      for (let i = 0; i < this.lengthMinOne; i++) {
        const j = i + 1;
        this.windowHigh[i] = this.windowHigh[j];
        this.windowLow[i] = this.windowLow[j];
      }

      this.windowHigh[this.lengthMinOne] = sampleHigh;
      this.windowLow[this.lengthMinOne] = sampleLow;

      this.fractalDimension = this.estimateFractalDimension();

      const alpha = this.estimateAlpha();
      this.value += (sample - this.value) * alpha

      return this.value;
    }

    this.windowHigh[this.windowCount] = sampleHigh;
    this.windowLow[this.windowCount] = sampleLow;
    this.windowCount++;
    if (this.windowCount == this.lengthMinOne) {
      this.value = sample;
    } else if (this.windowCount == this.length) {
      this.fractalDimension = this.estimateFractalDimension();

      const alpha = this.estimateAlpha();
      this.value += (sample - this.value) * alpha;
      this.primed = true;

      return this.value;
    }

    return Number.NaN;
  }

  private estimateFractalDimension(): number {
    let minLowHalf = Number.MAX_VALUE;
    let maxHighHalf = Number.MIN_VALUE;

    for (let i = 0; i < this.halfLength; i++) {
      const l = this.windowLow[i];
      if (minLowHalf > l) {
        minLowHalf = l;
      }

      const h = this.windowHigh[i];
      if (maxHighHalf < h) {
        maxHighHalf = h;
      }
    }

    const rangeN1 = maxHighHalf - minLowHalf;
    let minLowFull = minLowHalf;
    let maxHighFull = maxHighHalf;
    minLowHalf = Number.MAX_VALUE;
    maxHighHalf = Number.MIN_VALUE;

    for (let i = this.halfLength; i < this.length; i++) {
      const l = this.windowLow[i];
      if (minLowHalf > l) {
        minLowHalf = l;
      }
      if (minLowFull > l) {
        minLowFull = l;
      }

      const h = this.windowHigh[i];
      if (maxHighHalf < h) {
        maxHighHalf = h;
      }
      if (maxHighFull < h) {
        maxHighFull = h;
      }
    }

    const rangeN2 = maxHighHalf - minLowHalf
    const rangeN3 = maxHighFull - minLowFull;

    const fdim = (Math.log((rangeN1 + rangeN2)/this.halfLength) -
      Math.log(rangeN3/this.length)) * Math.LOG2E;

    return Math.min(Math.max(fdim, 1), 2);
  }

  private estimateAlpha(): number {
    const factor = this.scalingFactor;

    // We use the fractal dimension to dynamically change the alpha of an exponential moving average.
    // The fractal dimension varies over the range from 1 to 2.
    // Since the prices are log-normal, it seems reasonable to use an exponential function to relate
    // the fractal dimension to alpha.

    // An empirically chosen scaling in Ehlers’s method to map fractal dimension (1–2)
    // to the exponential α.
    const alpha = Math.exp(factor * (this.fractalDimension - 1))    

    // When the fractal dimension is 1, the exponent is zero – which means that alpha is 1, and
    // the output of the exponential moving average is equal to the input.

    // Limit alpha to vary only from αs to 1.
    return Math.min(Math.max(alpha, this.alphaSlowest), 1);
  }
}

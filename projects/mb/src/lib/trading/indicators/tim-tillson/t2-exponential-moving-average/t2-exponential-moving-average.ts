import { componentPairMnemonic } from '../../indicator/component-pair-mnemonic';
import { LineIndicator } from '../../indicator/line-indicator';
import { T2ExponentialMovingAverageLengthParams } from './t2-exponential-moving-average-params.interface';
import { T2ExponentialMovingAverageSmoothingFactorParams } from './t2-exponential-moving-average-params.interface';

const guardLength = (object: any): object is T2ExponentialMovingAverageLengthParams => 'length' in object;

/** Function to calculate mnemonic of an __T2ExponentialMovingAverage__ indicator. */
export const t2ExponentialMovingAverageMnemonic =
  (params: T2ExponentialMovingAverageLengthParams | T2ExponentialMovingAverageSmoothingFactorParams): string => {
  if (guardLength(params)) {
    const p = params as T2ExponentialMovingAverageLengthParams;
    return 't2('.concat(Math.floor(p.length).toString(), ', ', p.vFactor.toFixed(3), p.firstIsAverage ? ', sma' : '',
      componentPairMnemonic(p.barComponent, p.quoteComponent), ')');
  } else {
    const p = params as T2ExponentialMovingAverageSmoothingFactorParams;
    return 't2('.concat(p.smoothingFactor.toFixed(3), ', ', p.vFactor.toFixed(3),
      componentPairMnemonic(p.barComponent, p.quoteComponent), ')');
  }
};

/** __T2 Exponential Moving Average__ (T2 Exponential Moving Average, T2, T2EMA) line indicator
 * is a smoothing indicator with less lag than a straight exponential moving average.
 *
 * The T2 was developed by Tim Tillson and is described in the article:
 *
 *	 ❶ Technical Analysis of Stocks & Commodities v.16:1 (33-37), Smoothing Techniques For More Accurate Signals.
 *
 * The calculation is as follows:
 *
 *	EMA¹ᵢ = EMA(Pᵢ) = αPᵢ + (1-α)EMA¹ᵢ₋₁ = EMA¹ᵢ₋₁ + α(Pᵢ - EMA¹ᵢ₋₁), 0 < α ≤ 1
 *
 *	EMA²ᵢ = EMA(EMA¹ᵢ) = αEMA¹ᵢ + (1-α)EMA²ᵢ₋₁ = EMA²ᵢ₋₁ + α(EMA¹ᵢ - EMA²ᵢ₋₁), 0 < α ≤ 1
 *
 *	GDᵛᵢ = (1+ν)EMA¹ᵢ - νEMA²ᵢ = EMA¹ᵢ + ν(EMA¹ᵢ - EMA²ᵢ), 0 < ν ≤ 1
 *
 *	T2ᵢ = GDᵛᵢ(GDᵛᵢ)
 *
 * where GD stands for 'Generalized DEMA' with 'volume' ν. The default value of ν is 0.7.
 * When ν=0, GD is just an EMA, and when ν=1, GD is DEMA. In between, GD is a cooler DEMA.
 *
 * If x< stands for the action of running a time series through an EMA,
 * ƒ is our formula for Generalized Dema with 'volume' ν:
 *
 *	ƒ = (1+ν)x -νx²
 *
 * Running the filter though itself three times is equivalent to cubing ƒ:
 *
 *	v²x⁴ - 2v(1+ν)x³ + (1+ν)²x²
 *
 * The Metastock code for T2 is:
 *
 *	e1=Mov(P,periods,E)
 *
 *	e2=Mov(e1,periods,E)
 ^
 *	e3=Mov(e2,periods,E)
 *
 *	e4=Mov(e3,periods,E)
 *
 *	c1=v²
 *
 *	c2=-2v(1+ν)
 *
 *	c3=(1+ν)²
 *
 *	t2=c1*e4+c2*e3+c3*e2
 *
 * The very first EMA value (the seed for subsequent values) is calculated differently.
 * This implementation allows for two algorithms for this seed.
 *
 *	❶ Use a simple average of the first 'period'. This is the most widely documented approach.
 *
 *	❷ Use first sample value as a seed. This is used in Metastock.
 */
export class T2ExponentialMovingAverage extends LineIndicator {
  private readonly smoothingFactor: number;
  private readonly firstIsAverage: boolean;
  private readonly length: number;
  private readonly length2: number;
  private readonly length3: number;
  private readonly length4: number;
  private readonly c1: number;
  private readonly c2: number;
  private readonly c3: number;
  private count = 0;
  private sum = 0;
  private ema1 = 0;
  private ema2 = 0;
  private ema3 = 0;
  private ema4 = 0;

  /**
   * Constructs an instance given a length in samples or a smoothing factor in (0, 1).
   **/
  public constructor(params: T2ExponentialMovingAverageLengthParams | T2ExponentialMovingAverageSmoothingFactorParams){
    super();
    let len;
    let v;
    if (guardLength(params)) {
      const p = params as T2ExponentialMovingAverageLengthParams;
      len = Math.floor(p.length);
      if (len < 2) {
        throw new Error('length should be greater than 1');
      }

      v = p.vFactor;
      if (v < 0 || v > 1) {
        throw new Error('volume factor should be in range [0, 1]');
      }

      this.firstIsAverage = p.firstIsAverage;
      this.length = len;
      this.smoothingFactor = 2 / (len + 1);
    } else {
      const p = params as T2ExponentialMovingAverageSmoothingFactorParams;
      if (p.smoothingFactor <= 0 || p.smoothingFactor >= 1) {
        throw new Error('smoothing factor should be in range (0, 1)');
      }

      v = p.vFactor;
      if (v < 0 || v > 1) {
        throw new Error('volume factor should be in range [0, 1]');
      }

      this.firstIsAverage = false;
      this.smoothingFactor = p.smoothingFactor;
      this.length = Math.round(2 / this.smoothingFactor) - 1;
    }

    const v1 = v + 1;
    this.c1 = v * v;
    this.c2 = -2 * v * v1;
    this.c3 = v1 * v1;

    const l = this.length;
    this.length2 = l * 2 - 1;
    this.length3 = l * 3 - 2;
    this.length4 = l * 4 - 3;

    this.mnemonic = t2ExponentialMovingAverageMnemonic(params);
    this.primed = false;
  }

  /** Updates the value of the indicator given the next sample. */
  public update(sample: number): number {
    if (Number.isNaN(sample)) {
      return sample;
    }

    const sf = this.smoothingFactor;
    if (this.primed) {      
      this.ema1 += (sample - this.ema1) * sf;
      this.ema2 += (this.ema1 - this.ema2) * sf;
      this.ema3 += (this.ema2 - this.ema3) * sf;
      this.ema4 += (this.ema3 - this.ema4) * sf;
      return this.c1 * this.ema4 + this.c2 * this.ema3 + this.c3 * this.ema2;
    }

    // Not primed.
    ++this.count;
    if (this.firstIsAverage) {
      if (this.count === 1) {
        this.sum = sample;
      } else if (this.length >= this.count) {
        this.sum += sample;
        if (this.length === this.count) {
          this.ema1 = this.sum / this.length;
          this.sum = this.ema1;
        }
      } else if (this.length2 >= this.count) {
        this.ema1 += (sample - this.ema1) * sf;
        this.sum += this.ema1;
        if (this.length2 === this.count) {
          this.ema2 = this.sum / this.length;
          this.sum = this.ema2;
        }
      } else if (this.length3 >= this.count) {
        this.ema1 += (sample - this.ema1) * sf;
        this.ema2 += (this.ema1 - this.ema2) * sf;
        this.sum += this.ema2;
        if (this.length3 === this.count) {
          this.ema3 = this.sum / this.length;
          this.sum = this.ema3;
        }
      } else { // if (this.length4 >= this.count) {
        this.ema1 += (sample - this.ema1) * sf;
        this.ema2 += (this.ema1 - this.ema2) * sf;
        this.ema3 += (this.ema2 - this.ema3) * sf;
        this.sum += this.ema3;
        if (this.length4 === this.count) {
          this.primed = true;
          this.ema4 = this.sum / this.length;
          return this.c1 * this.ema4 + this.c2 * this.ema3 + this.c3 * this.ema2;
        }
      }
    } else { // firstIsAverage is false.
      if (this.count === 1) {
        this.ema1 = sample;
      } else if (this.length >= this.count) {
        this.ema1 += (sample - this.ema1) * sf;
        if (this.length === this.count) {
          this.ema2 = this.ema1;
        }
      } else if (this.length2 >= this.count) {
        this.ema1 += (sample - this.ema1) * sf;
        this.ema2 += (this.ema1 - this.ema2) * sf;
        if (this.length2 === this.count) {
          this.ema3 = this.ema2;
        }
      } else if (this.length3 >= this.count) {
        this.ema1 += (sample - this.ema1) * sf;
        this.ema2 += (this.ema1 - this.ema2) * sf;
        this.ema3 += (this.ema2 - this.ema3) * sf;
        if (this.length3 === this.count) {
          this.ema4 = this.ema3;
        }
      } else { // if (this.length4 >= this.count) {
        this.ema1 += (sample - this.ema1) * sf;
        this.ema2 += (this.ema1 - this.ema2) * sf;
        this.ema3 += (this.ema2 - this.ema3) * sf;
        this.ema4 += (this.ema3 - this.ema4) * sf;
        if (this.length4 === this.count) {
          this.primed = true;
          return this.c1 * this.ema4 + this.c2 * this.ema3 + this.c3 * this.ema2;
        }
      }
    }

    return Number.NaN;
  }
}

import { componentPairMnemonic } from '../../indicator/component-pair-mnemonic';
import { LineIndicator } from '../../indicator/line-indicator';
import { T3ExponentialMovingAverageLengthParams } from './t3-exponential-moving-average-params.interface';
import { T3ExponentialMovingAverageSmoothingFactorParams } from './t3-exponential-moving-average-params.interface';

const guardLength = (object: any): object is T3ExponentialMovingAverageLengthParams => 'length' in object;

/** Function to calculate mnemonic of an __T3ExponentialMovingAverage__ indicator. */
export const t3ExponentialMovingAverageMnemonic =
  (params: T3ExponentialMovingAverageLengthParams | T3ExponentialMovingAverageSmoothingFactorParams): string => {
  if (guardLength(params)) {
    const p = params as T3ExponentialMovingAverageLengthParams;
    return 't3('.concat(Math.floor(p.length).toString(), ', ', p.vFactor.toFixed(3), p.firstIsAverage ? ', sma' : '',
      componentPairMnemonic(p.barComponent, p.quoteComponent), ')');
  } else {
    const p = params as T3ExponentialMovingAverageSmoothingFactorParams;
    return 't3('.concat(p.smoothingFactor.toFixed(3), ', ', p.vFactor.toFixed(3),
      componentPairMnemonic(p.barComponent, p.quoteComponent), ')');
  }
};

/** The __T3 Exponential Moving Average__ (__T3EMA__) is a smoothing indicator with less lag than
 * a straight exponential moving average.
 * 
 * In filter theory parlance, __T3__ is a six-pole non-linear Kalman filter.
 * 
 * The __T3__ was developed by Tim Tillson and is described in the article:
 *     Technical Analysis of Stocks & Commodities v.16:1 (33-37), Smoothing Techniques For More Accurate Signals.
 * 
 * The calculation is as follows:<
 * 
 *   EMA¹ᵢ = EMA(Pᵢ) = αPᵢ + (1-α)EMA¹ᵢ₋₁ = EMA¹ᵢ₋₁ + α(Pᵢ - EMA¹ᵢ₋₁), 0 < α ≤ 1
 * 
 *   EMA²ᵢ = EMA(EMA¹ᵢ) = αEMA¹ᵢ + (1-α)EMA²ᵢ₋₁ = EMA²ᵢ₋₁ + α(EMA¹ᵢ - EMA²ᵢ₋₁), 0 < α ≤ 1
 * 
 *   GDᵛᵢ = (1+ν)EMA¹ᵢ - νEMA²ᵢ = EMA¹ᵢ + ν(EMA¹ᵢ - EMA²ᵢ), 0 < ν ≤ 1
 * 
 *   T3ᵢ = GDᵛᵢ(GDᵛᵢ(GDᵛᵢ))
 * 
 * where _GD_ stands for 'Generalized DEMA' with 'volume' ν. The default value of __ν__ is 0.7.
 * 
 * When _ν=0_, GD is just an EMA, and when _ν=1_, GD is DEMA. In between, GD is a cooler DEMA.
 * 
 * If _x_ stands for the action of running a time series through an EMA,
 * _ƒ_ is our formula for Generalized Dema with 'volume' ν:
 * 
 *     ƒ = (1+ν)x -νx²
 * 
 * Running the filter though itself three times is equivalent to cubing _ƒ_:
 * 
 *     -ν³x⁶ + (3ν²+3ν³)x⁵ + (-6ν²-3ν-3ν³)x⁴ + (1+3ν+ν³+3ν²)x³
 * 
 * The Metastock code for _T3_ is:
 * 
 *    e1=Mov(P,periods,E)
 * 
 *    e2=Mov(e1,periods,E)
 * 
 *    e3=Mov(e2,periods,E)
 * 
 *    e4=Mov(e3,periods,E)
 * 
 *    e5=Mov(e4,periods,E)
 * 
 *    e6=Mov(e5,periods,E)
 * 
 *    c1=-ν³
 * 
 *    c2=3ν²+3ν³
 * 
 *    c3=-6*ν²-3ν-3ν³
 * 
 *    c4=1+3ν+ν³+3ν²
 * 
 *    t3=c1*e6+c2*e5+c3*e4+c4*e3
 */
export class T3ExponentialMovingAverage extends LineIndicator {
  private readonly smoothingFactor: number;
  private readonly firstIsAverage: boolean;
  private readonly length: number;
  private readonly length2: number;
  private readonly length3: number;
  private readonly length4: number;
  private readonly length5: number;
  private readonly length6: number;
  private readonly c1: number;
  private readonly c2: number;
  private readonly c3: number;
  private readonly c4: number;
  private count = 0;
  private sum = 0;
  private ema1 = 0;
  private ema2 = 0;
  private ema3 = 0;
  private ema4 = 0;
  private ema5 = 0;
  private ema6 = 0;

  /**
   * Constructs an instance given a length in samples or a smoothing factor in (0, 1).
   **/
  public constructor(params: T3ExponentialMovingAverageLengthParams | T3ExponentialMovingAverageSmoothingFactorParams){
    super();
    let len;
    let v;
    if (guardLength(params)) {
      const p = params as T3ExponentialMovingAverageLengthParams;
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
      const p = params as T3ExponentialMovingAverageSmoothingFactorParams;
      if (p.smoothingFactor < 0 || p.smoothingFactor > 1) {
        throw new Error('smoothing factor should be in range [0, 1]');
      }

      v = p.vFactor;
      if (v < 0 || v > 1) {
        throw new Error('volume factor should be in range [0, 1]');
      }

      this.firstIsAverage = false;
      this.smoothingFactor = p.smoothingFactor;
      this.length = Math.round(2 / this.smoothingFactor) - 1;
    }

    const vv = v * v;
    this.c1 = -vv * v;
    this.c2 = 3 * (vv - this.c1);
    this.c3 = -6 * vv - 3 * (v - this.c1);
    this.c4 = 1 + 3 * v - this.c1 + 3 * vv;

    const l = this.length;
    this.length2 = l * 2 - 1;
    this.length3 = l * 3 - 2;
    this.length4 = l * 4 - 3;
    this.length5 = l * 5 - 4;
    this.length6 = l * 6 - 5;

    this.mnemonic = t3ExponentialMovingAverageMnemonic(params);
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
      this.ema5 += (this.ema4 - this.ema5) * sf;
      this.ema6 += (this.ema5 - this.ema6) * sf;
      return this.c1 * this.ema6 + this.c2 * this.ema5 + this.c3 * this.ema4 + this.c4 * this.ema3;
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
      } else if (this.length4 >= this.count) {
        this.ema1 += (sample - this.ema1) * sf;
        this.ema2 += (this.ema1 - this.ema2) * sf;
        this.ema3 += (this.ema2 - this.ema3) * sf;
        this.sum += this.ema3;
        if (this.length4 === this.count) {
          this.ema4 = this.sum / this.length;
          this.sum = this.ema4;
        }
      } else if (this.length5 >= this.count) {
        this.ema1 += (sample - this.ema1) * sf;
        this.ema2 += (this.ema1 - this.ema2) * sf;
        this.ema3 += (this.ema2 - this.ema3) * sf;
        this.ema4 += (this.ema3 - this.ema4) * sf;
        this.sum += this.ema4;
        if (this.length5 === this.count) {
          this.ema5 = this.sum / this.length;
          this.sum = this.ema5;
        }
      } else { // if (this.length6 >= this.count) {
        this.ema1 += (sample - this.ema1) * sf;
        this.ema2 += (this.ema1 - this.ema2) * sf;
        this.ema3 += (this.ema2 - this.ema3) * sf;
        this.ema4 += (this.ema3 - this.ema4) * sf;
        this.ema5 += (this.ema4 - this.ema5) * sf;
        this.sum += this.ema5;
        if (this.length6 === this.count) {
          this.primed = true;
          this.ema6 = this.sum / this.length;
          return this.c1 * this.ema6 + this.c2 * this.ema5 + this.c3 * this.ema4 + this.c4 * this.ema3;
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
      } else if (this.length4 >= this.count) {
        this.ema1 += (sample - this.ema1) * sf;
        this.ema2 += (this.ema1 - this.ema2) * sf;
        this.ema3 += (this.ema2 - this.ema3) * sf;
        this.ema4 += (this.ema3 - this.ema4) * sf;
        if (this.length4 === this.count) {
          this.ema5 = this.ema4;
        }
      } else if (this.length5 >= this.count) {
        this.ema1 += (sample - this.ema1) * sf;
        this.ema2 += (this.ema1 - this.ema2) * sf;
        this.ema3 += (this.ema2 - this.ema3) * sf;
        this.ema4 += (this.ema3 - this.ema4) * sf;
        this.ema5 += (this.ema4 - this.ema5) * sf;
        if (this.length5 === this.count) {
          this.ema6 = this.ema5;
        }
      } else { // if (this.length6 >= this.count) {
        this.ema1 += (sample - this.ema1) * sf;
        this.ema2 += (this.ema1 - this.ema2) * sf;
        this.ema3 += (this.ema2 - this.ema3) * sf;
        this.ema4 += (this.ema3 - this.ema4) * sf;
        this.ema5 += (this.ema4 - this.ema5) * sf;
        this.ema6 += (this.ema5 - this.ema6) * sf;
        if (this.length6 === this.count) {
          this.primed = true;
          return this.c1 * this.ema6 + this.c2 * this.ema5 + this.c3 * this.ema4 + this.c4 * this.ema3;
        }
      }
    }

    return Number.NaN;
  }
}

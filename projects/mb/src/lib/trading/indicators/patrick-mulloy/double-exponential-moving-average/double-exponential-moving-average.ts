import { componentPairMnemonic } from '../../indicator/component-pair-mnemonic';
import { LineIndicator } from '../../indicator/line-indicator';
import { DoubleExponentialMovingAverageLengthParams } from './double-exponential-moving-average-params.interface';
import { DoubleExponentialMovingAverageSmoothingFactorParams } from './double-exponential-moving-average-params.interface';

const guardLength = (object: any): object is DoubleExponentialMovingAverageLengthParams => 'length' in object;

/** Function to calculate mnemonic of an __DoubleExponentialMovingAverage__ indicator. */
export const doubleExponentialMovingAverageMnemonic =
  (params: DoubleExponentialMovingAverageLengthParams | DoubleExponentialMovingAverageSmoothingFactorParams): string => {
  if (guardLength(params)) {
    const p = params as DoubleExponentialMovingAverageLengthParams;
    return 'dema('.concat(Math.floor(p.length).toString(), p.firstIsAverage ? ', sma' : '',
      componentPairMnemonic(p.barComponent, p.quoteComponent), ')');
  } else {
    const p = params as DoubleExponentialMovingAverageSmoothingFactorParams;
    return 'dema('.concat(p.smoothingFactor.toFixed(3),
      componentPairMnemonic(p.barComponent, p.quoteComponent), ')');
  }
};

// https://store.traders.com/-v12-c01-smoothi-pdf.html
// https://store.traders.com/-v12-c02-smoothi-pdf.html

/** __Double Exponential Moving Average__ (_DEMA_) line indicator computes the double exponential, or double exponentially weighted, moving average.
 *
 * _DEMA_ has a lag less than a straight exponential moving average.
 *
 * The _DEMA_ was developed by _Patrick G. Mulloy_ and is described in two articles:
 *
 * ❶ Technical Analysis of Stocks & Commodities v.12:1 (11-19), Smoothing Data With Faster Moving Averages.
 *
 * ❷ Technical Analysis of Stocks &amp; Commodities v.12:2 (72-80), Smoothing Data With Less Lag.
 *
 * The calculation is as follows:
 *
 * EMA¹ᵢ = EMA(Pᵢ) = αPᵢ + (1-α)EMA¹ᵢ₋₁ = EMA¹ᵢ₋₁ + α(Pᵢ - EMA¹ᵢ₋₁), 0 < α ≤ 1
 *
 * EMA²ᵢ = EMA(EMA¹ᵢ) = αEMA¹ᵢ + (1-α)EMA²ᵢ₋₁ = EMA²ᵢ₋₁ + α(EMA¹ᵢ - EMA²ᵢ₋₁), 0 < α ≤ 1
 *
 * DEMAᵢ = 2EMA¹ᵢ - EMA²ᵢ
 *
 * The very first _DEMA_ value (the seed for subsequent values) is calculated differently.
 * This implementation allows for two algorithms for this seed.
 *
 * ❶ Use a simple average of the first 'period'. This is the most widely documented approach.
 *
 * ❷ Use first sample value as a seed. This is used in Metastock.
*/
export class DoubleExponentialMovingAverage extends LineIndicator {
  private readonly smoothingFactor: number;
  private readonly firstIsAverage: boolean;
  private readonly length: number;
  private readonly length2: number;
  private sum = 0;
  private count = 0;
  private ema1 = 0;
  private ema2 = 0;

  /**
   * Constructs an instance given a length in samples or a smoothing factor in (0, 1).
   **/
  public constructor(params: DoubleExponentialMovingAverageLengthParams | DoubleExponentialMovingAverageSmoothingFactorParams){
    super();
    let len;
    if (guardLength(params)) {
      const p = params as DoubleExponentialMovingAverageLengthParams;
      len = Math.floor(p.length);
      if (len < 2) {
        throw new Error('length should be greater than 1');
      }

      this.length = len;
      this.smoothingFactor = 2 / (len + 1);
      this.firstIsAverage = p.firstIsAverage;
    } else {
      const p = params as DoubleExponentialMovingAverageSmoothingFactorParams;
      if (p.smoothingFactor <= 0 || p.smoothingFactor >= 1) {
        throw new Error('smoothing factor should be in range (0, 1)');
      }

      this.smoothingFactor = p.smoothingFactor;
      this.length = Math.round(2 / this.smoothingFactor) - 1;
      this.firstIsAverage = false;
    }

    this.length2 = 2 * this.length - 1;
    this.mnemonic = doubleExponentialMovingAverageMnemonic(params);
    this.primed = false;
  }

  /** Updates the value of the indicator given the next sample. */
  public update(sample: number): number {
    if (Number.isNaN(sample)) {
      return sample;
    }

    if (this.primed) {
      this.ema1 += (sample - this.ema1) * this.smoothingFactor;
      this.ema2 += (this.ema1 - this.ema2) * this.smoothingFactor;
      return  2 * this.ema1 - this.ema2;
    }

    // Not primed.
    ++this.count;
    if (this.firstIsAverage) { // First is the simple average. 
      if (this.count === 1) {
        this.sum = sample;
      } else if (this.length >= this.count) {
        this.sum += sample;
        if (this.length === this.count) {
          this.ema1 = this.sum / this.length;
          this.sum = this.ema1;
        }
      } else { // if (this.length2 >= this.count) {
        this.ema1 += (sample - this.ema1) * this.smoothingFactor;
        this.sum += this.ema1;
        if (this.length2 === this.count) {
          this.primed = true;
          this.ema2 = this.sum / this.length;
          return 2 * this.ema1 - this.ema2;
        }
      }
    } else { // firstIsAverage is false, Metastock.
      if (this.count === 1) {
        this.ema1 = sample;
      } else if (this.length >= this.count) {
        this.ema1 += (sample - this.ema1) * this.smoothingFactor;
        if (this.length === this.count) {
          this.ema2 = this.ema1;
        }
      } else { // if (this.length2 >= this.count) {
        this.ema1 += (sample - this.ema1) * this.smoothingFactor;
        this.ema2 += (this.ema1 - this.ema2) * this.smoothingFactor;
        if (this.length2 === this.count) {
          this.primed = true;
          return 2 * this.ema1 - this.ema2;
        }
      }
    }  

    return Number.NaN;
  }
}

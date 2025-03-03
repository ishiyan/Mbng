import { componentPairMnemonic } from '../../indicator/component-pair-mnemonic';
import { LineIndicator } from '../../indicator/line-indicator';
import { TripleExponentialMovingAverageLengthParams } from './triple-exponential-moving-average-params.interface';
import { TripleExponentialMovingAverageSmoothingFactorParams } from './triple-exponential-moving-average-params.interface';

const guardLength = (object: any): object is TripleExponentialMovingAverageLengthParams => 'length' in object;

/** Function to calculate mnemonic of an __TripleExponentialMovingAverage__ indicator. */
export const tripleExponentialMovingAverageMnemonic =
  (params: TripleExponentialMovingAverageLengthParams | TripleExponentialMovingAverageSmoothingFactorParams): string => {
  if (guardLength(params)) {
    const p = params as TripleExponentialMovingAverageLengthParams;
    return 'tema('.concat(Math.floor(p.length).toString(), p.firstIsAverage ? ', sma' : '',
      componentPairMnemonic(p.barComponent, p.quoteComponent), ')');
  } else {
    const p = params as TripleExponentialMovingAverageSmoothingFactorParams;
    return 'tema('.concat(p.smoothingFactor.toFixed(3),
      componentPairMnemonic(p.barComponent, p.quoteComponent), ')');
  }
};

// https://store.traders.com/-v12-c01-smoothi-pdf.html
// https://store.traders.com/-v12-c02-smoothi-pdf.html

/** __Triple Exponential Moving Average__ line indicator computes the triple exponential, or triple exponentially weighted, moving average (_TEMA_).
 *
 * The TEMA was developed by Patrick G. Mulloy and is described in two articles:
 *
 * ❶ Technical Analysis of Stocks &amp; Commodities v.12:1 (11-19), Smoothing Data With Faster Moving Averages.
 *
 * ❷ Technical Analysis of Stocks &amp; Commodities v.12:2 (72-80), Smoothing Data With Less Lag.
 *
 * The calculation is as follows:
 *
 * EMA¹ᵢ = EMA(Pᵢ) = αPᵢ + (1-α)EMA¹ᵢ₋₁ = EMA¹ᵢ₋₁ + α(Pᵢ - EMA¹ᵢ₋₁), 0 < α ≤ 1
 *
 * EMA²ᵢ = EMA(EMA¹ᵢ) = αEMA¹ᵢ + (1-α)EMA²ᵢ₋₁ = EMA²ᵢ₋₁ + α(EMA¹ᵢ - EMA²ᵢ₋₁), 0 < α ≤ 1
 *
 * EMA³ᵢ = EMA(EMA²ᵢ) = αEMA²ᵢ + (1-α)EMA³ᵢ₋₁ = EMA³ᵢ₋₁ + α(EMA²ᵢ - EMA³ᵢ₋₁), 0 < α ≤ 1
 *
 * TEMAᵢ = 3(EMA¹ᵢ - EMA²ᵢ) + EMA³ᵢ
 *
 * The very first EMA value (the seed for subsequent values) is calculated differently.
 * This implementation allows for two algorithms for this seed.
 *
 * ❶ Use a simple average of the first 'period'. This is the most widely documented approach.
 *
 * ❷ Use first sample value as a seed. This is used in Metastock.
 */
export class TripleExponentialMovingAverage extends LineIndicator {
  private readonly smoothingFactor: number;
  private readonly firstIsAverage: boolean;
  private readonly length: number;
  private readonly length2: number;
  private readonly length3: number;
  private sum1 = 0;
  private sum2 = 0;
  private sum3 = 0;
  private count1 = 0;
  private count2 = 0;
  private count3 = 0;
  private value1 = 0;
  private value2 = 0;
  private value3 = 0;

  /**
   * Constructs an instance given a length in samples or a smoothing factor in (0, 1).
   **/
  public constructor(params: TripleExponentialMovingAverageLengthParams | TripleExponentialMovingAverageSmoothingFactorParams){
    super();
    let len;
    if (guardLength(params)) {
      const p = params as TripleExponentialMovingAverageLengthParams;
      len = Math.floor(p.length);
      if (len < 2) {
        throw new Error('length should be greater than 1');
      }

      this.length = len;
      this.smoothingFactor = 2 / (len + 1);
      this.firstIsAverage = p.firstIsAverage;

    } else {
      const p = params as TripleExponentialMovingAverageSmoothingFactorParams;
      if (p.smoothingFactor <= 0 || p.smoothingFactor >= 1) {
        throw new Error('smoothing factor should be in range (0, 1)');
      }

      this.smoothingFactor = p.smoothingFactor;
      this.length = Math.round(2 / this.smoothingFactor) - 1;
      this.firstIsAverage = false;
    }

    this.length2 = this.length * 2;
    this.length3 = this.length2 + this.length - 2;
    this.mnemonic = tripleExponentialMovingAverageMnemonic(params);
    this.primed = false;
  }

  /** Updates the value of the indicator given the next sample. */
  public update(sample: number): number {
    if (Number.isNaN(sample)) {
      return sample;
    }

    if (this.primed) {
      this.value1 += (sample - this.value1) * this.smoothingFactor;
      this.value2 += (this.value1 - this.value2) * this.smoothingFactor;
      this.value3 += (this.value2 - this.value3) * this.smoothingFactor;
      return  3 * (this.value1 - this.value2) + this.value3;
    } else { // Not primed.
      if (this.firstIsAverage) {
        if (this.length > this.count1) {
          this.sum1 += sample;
          if (this.length === ++this.count1) {
            this.value1 = this.sum1 / this.length;
            this.sum2 += this.value1;
            ++this.count2;
          }
        } else if (this.length > this.count2) {
          this.value1 += (sample - this.value1) * this.smoothingFactor;
          this.sum2 += this.value1;
          if (this.length === ++this.count2) {
            this.value2 = this.sum2 / this.length;
            this.sum3 += this.value2;
            ++this.count3;
          }
        } else {
          this.value1 += (sample - this.value1) * this.smoothingFactor;
          this.value2 += (this.value1 - this.value2) * this.smoothingFactor;
          this.sum3 += this.value2;
          if (this.length === ++this.count3) {
            this.primed = true;
            this.value3 = this.sum3 / this.length;
            return 3 * (this.value1 - this.value2) + this.value3;
          }
        }
      } else { // firstIsAverage is false.
        if (this.length > this.count1) {
          if (1 === ++this.count1) {
            this.value1 = sample;
          } else {
            this.value1 += (sample - this.value1) * this.smoothingFactor;
            if (this.length === this.count1) {
              this.value2 = this.value1;
            }
          }
        } else if (this.length2 > this.count1) {
          this.value1 += (sample - this.value1) * this.smoothingFactor;
          this.value2 += (this.value1 - this.value2) * this.smoothingFactor;
          if (this.length2 === ++this.count1) {
            this.value3 = this.value2;
          }
        } else {
          this.value1 += (sample - this.value1) * this.smoothingFactor;
          this.value2 += (this.value1 - this.value2) * this.smoothingFactor;
          this.value3 += (this.value2 - this.value3) * this.smoothingFactor;
          if (this.length3 === ++this.count1) {
              this.primed = true;
              return 3 * (this.value1 - this.value2) + this.value3;
          }
        }
      }  
    }

    return Number.NaN;
  }
}

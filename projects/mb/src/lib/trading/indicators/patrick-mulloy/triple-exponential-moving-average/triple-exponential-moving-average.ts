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

/** __Triple Exponential Moving Average__ line indicator computes the triple exponential, or triple exponentially weighted, moving average (_TEMA_).
 *
 * Given a constant smoothing percentage factor 0 < α ≤ 1, _TEMA_ is calculated by applying a constant
 * smoothing factor α to a difference of today's sample and yesterday's _TEMA_ value:
 *
 *    EMAᵢ = αPᵢ + (1-α)EMAᵢ₋₁ = EMAᵢ₋₁ + α(Pᵢ - EMAᵢ₋₁), 0 < α ≤ 1.
 *
 * Thus, the weighting for each older sample is given by the geometric progression 1, α, α², α³, …,
 * giving much more importance to recent observations while not discarding older ones: all data
 * previously used are always part of the new _TEMA_ value.
 *
 * α may be expressed as a percentage, so a smoothing factor of 10% is equivalent to α = 0.1. A higher α
 * discounts older observations faster. Alternatively, α may be expressed in terms of ℓ time periods (length),
 * where:
 *
 *    α = 2 / (ℓ + 1) and ℓ = 2/α - 1.
 *
 * The indicator is not primed during the first ℓ-1 updates.
 *
 * The 12- and 26-day EMAs are the most popular short-term averages, and they are used to create indicators
 * like MACD and PPO. In general, the 50- and 200-day EMAs are used as signals of long-term trends.
 *
 * The very first EMA value (the seed for subsequent values) is calculated differently.
 * This implementation, when using a length as an input parameter, allows for two algorithms for this seed.
 *
 * ❶ Use a simple average of the first 'period'. This is the most widely documented approach.
 *
 * ❷ Use first sample value as a seed. This is used in Metastock.
 */
export class TripleExponentialMovingAverage extends LineIndicator {
  private length = 0;
  private sum = 0;
  private count = 0;
  private value = 0;
  private smoothingFactor: number;
  private firstIsAverage = false;

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
    }

    this.mnemonic = tripleExponentialMovingAverageMnemonic(params);
    this.primed = false;
  }

  /** Updates the value of the indicator given the next sample. */
  public update(sample: number): number {
    if (Number.isNaN(sample)) {
      return sample;
    }

    if (this.primed) {
      this.value += (sample - this.value) * this.smoothingFactor;
    } else { // Not primed.
      this.count++;
      if (this.firstIsAverage) {
        this.sum += sample;
        if (this.count < this.length) {
          return Number.NaN;
        }

        this.value = this.sum / this.length;
      } else {
        if (this.count === 1) {
          this.value = sample;
        } else {
          this.value += (sample - this.value) * this.smoothingFactor;
        }

        if (this.count < this.length) {
          return Number.NaN;
        }
      }

      this.primed = true;
    }

    return this.value;
  }
}

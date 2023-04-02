import { componentPairMnemonic } from '../../indicator/component-pair-mnemonic';
import { LineIndicator } from '../../indicator/line-indicator';
import { Variance } from '../variance/variance';
import { StandardDeviationParams } from './standard-deviation-params.interface';

/** Function to calculate mnemonic of a __StandardDeviation__ indicator. */
export const standardDeviationMnemonic = (params: StandardDeviationParams): string =>
  'stdev.'.concat(params.unbiased ? 's(' : 'p(', params.length.toString(),
  componentPairMnemonic(params.barComponent, params.quoteComponent), ')');

/** Standard deviation line indicator.
 *
 * StandardDeviation computes the standard deviation of the samples within a moving window of length ℓ
 * as a square root of variance:
 *
 *     σ² = (∑xᵢ² - (∑xᵢ)²/ℓ)/ℓ
 *
 * for the estimation of the population variance, or as:
 *
 *     σ² = (∑xᵢ² - (∑xᵢ)²/ℓ)/(ℓ-1)
 *
 * for the unbiased estimation of the sample variance, i={0,…,ℓ-1}.
 */
export class StandardDeviation extends LineIndicator {
  private variance: Variance;

  /**
   * Constructs an instance given a length in samples.
   * The length should be an integer greater than 1.
   **/
  public constructor(params: StandardDeviationParams){
    super();
    const length = Math.floor(params.length);
    if (length < 2) {
      throw new Error('length should be greater than 1');
    }

    this.mnemonic = standardDeviationMnemonic(params);
    this.variance = new Variance(params);
    this.primed = false;
  }

  /** Updates the value of the indicator given the next sample. */
  public update(sample: number): number {
    const value = this.variance.update(sample);
    if (Number.isNaN(value)) {
      return value;
    }

    this.primed = this.variance.isPrimed();
    return Math.sqrt(value);
  }
}

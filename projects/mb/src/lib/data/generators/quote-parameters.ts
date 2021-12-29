import { objectName, spreadFractionName, askSizeName, bidSizeName } from './constants';

/** The quote related input parameters for the waveform generators.
 *
 *  ➊ The ask and bid prices are equidistant from the mid price.
 *  - (a) The half-length of the spread is defined as a ratio ∈[0, 1].
 *  - (b) When the ratio is 1, the bid price is zero and the ask price is twice the mid price.
 *  - (c) When the ratio is 0, the both ask and bid prices are equal to the the mid price.
 *
 *  ➋ The ask and bid sizes are constant values.
 */
export class QuoteParameters {
  private static readonly defaultSpreadFraction: number = 0.3;
  private static readonly defaultAskSize: number = 100;
  private static readonly defaultBidSize: number = 100;

  /** The spread fraction, ρs, which determines the ask and bid prices as a fraction of the mid price. */
  spreadFraction: number = QuoteParameters.defaultSpreadFraction;

  /** The ask size, which is the same for all quotes; should be positive. */
  askSize: number = QuoteParameters.defaultAskSize;

  /** The bid size, which is the same for all quotes; should be positive. */
  bidSize: number = QuoteParameters.defaultBidSize;

  constructor(data?: QuoteParameters) {
    if (data) {
      for (const property in data) {
        if (data.hasOwnProperty(property)) {
          (this as any)[property] = (data as any)[property];
        }
      }
    }
  }

  toJSON(data?: any) {
    data = typeof data === objectName ? data : {};
    data[spreadFractionName] = this.spreadFraction;
    data[askSizeName] = this.askSize;
    data[bidSizeName] = this.bidSize;
    return data;
  }
}

import { BarComponent } from '../../../../data/entities/bar-component.enum';
import { QuoteComponent } from '../../../../data/entities/quote-component.enum';

/** Describes parameters to create an instance of the indicator. */
export interface FractalAdaptiveMovingAverageParams {
  /** Length is the length, ℓ, (the number of time periods) of the Fractal Adaptive Moving Average.
   *
   * The value should be an even integer, greater or equal to 2.
   * The default value is 16.
   */
  length: number;

  /** SlowestSmoothingFactor is the slowest boundary smoothing factor, αs in (0,1).
   * The equivalent length ℓs is
   *
   *   ℓs = 2/αs - 1, 0 < αs ≤ 1, 1 ≤ ℓs
   *
   * The default value is 0.01 (equivalent ℓs = 199).
    */
  slowestSmoothingFactor?: number;

  /**
   * A component of a bar to use when updating the indicator with a bar sample.
   *
   * If _undefined_, the bar component will have a default value and will not be shown in the indicator mnemonic.
   */
  barComponent?: BarComponent;

  /**
   * A component of a quote to use when updating the indicator with a quote sample.
   *
   * If _undefined_, the quote component will have a default value and will not be shown in the indicator mnemonic.
   */
  quoteComponent?: QuoteComponent;
}

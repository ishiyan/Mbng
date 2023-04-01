import { BarComponent } from '../../../data/entities/bar-component.enum';
import { QuoteComponent } from '../../../data/entities/quote-component.enum';

/** Describes parameters to create an instance of the indicator. */
export interface WeightedMovingAverageParams {
    /**
     * Length is the length (the number of time periods, ℓ) of the moving window to calculate the average.
     *
     * The value should be greater than 1.
     */
    length: number;

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

import { BarComponent } from '../../../../data/entities/bar-component.enum';
import { QuoteComponent } from '../../../../data/entities/quote-component.enum';

/** Describes parameters to create an instance of the indicator. */
export interface VarianceParams {
    /**
     * Length is the length (the number of time periods, ℓ) of the moving window to calculate the variance.
     *
     * The value should be greater than 1.
     */
    length: number;

    /**
     * Unbiased indicates whether the estimate of the variance is the unbiased sample variance or the population variance.
     *
     * When in doubt, use the unbiased sample variance (value is true).
     */
    unbiased: boolean;

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

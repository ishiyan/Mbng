import { BarComponent } from '../../../../data/entities/bar-component.enum';
import { QuoteComponent } from '../../../../data/entities/quote-component.enum';

/** Describes parameters to create an instance of the indicator based on length. */
export interface KaufmanAdaptiveMovingAverageLengthParams {
	/**
     * Efficiency ratio length is the number of last samples used to calculate the efficiency ratio.
	 *
	 * The value should be greater than 1.
	 * The default value is 10.
    */
	efficiencyRatioLength: number;

	/** Fastest length is the fastest boundary length, ℓf.
	 * The equivalent smoothing factor αf is
	 *
	 *   αf = 2/(ℓf + 1), 2 ≤ ℓ
	 *
	 * The value should be greater than 1.
	 * The default value is 2.
    */
	fastestLength: number;

	/** Slowest length is the slowest boundary length, ℓs.
	 * The equivalent smoothing factor αs is
	 *
	 *   αs = 2/(ℓs + 1), 2 ≤ ℓ
	 *
	 * The value should be greater than 1.
	 * The default value is 30.
    */
	slowestLength: number;

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

/** Describes parameters to create an instance of the indicator based on smoothing factor. */
export interface KaufmanAdaptiveMovingAverageSmoothingFactorParams {
    /**
     * Efficiency ratio length is the number of last samples used to calculate the efficiency ratio.
	 *
	 * The value should be greater than 1.
	 * The default value is 10.
    */
	efficiencyRatioLength: number;

	/** Fastest smoothing factor is the fastest boundary smoothing factor, αf in (0,1).
	 * The equivalent length ℓf is
	 *
	 *   ℓf = 2/αf - 1, 0 < αf ≤ 1, 1 ≤ ℓf
	 *
	 * The default value is 2/3 (0.6666...).
     */
	fastestSmoothingFactor: number;

	/** Slowest smoothing factor is the slowest boundary smoothing factor, αs in (0,1).
	 * The equivalent length ℓs is
	 *
	 *   ℓs = 2/αs - 1, 0 < αs ≤ 1, 1 ≤ ℓs
	 *
	 * The default value is 2/31 (0.06451612903225806451612903225806).
     */
	slowestSmoothingFactor: number;

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

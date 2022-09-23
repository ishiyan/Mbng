import { Bar } from '../../../data/entities/bar';
import { Quote } from '../../../data/entities/quote';
import { Scalar } from '../../../data/entities/scalar';
import { Trade } from '../../../data/entities/trade';
import { IndicatorMetadata } from './indicator-metadata.interface';
import { IndicatorOutput } from './indicator-output';

/** Describes a common indicator functionality. */
export interface Indicator {
    /** Indicates whether an indicator is primed. */
    isPrimed(): boolean;

    /** Describes a requested output data of an indicator. */
    metadata(): IndicatorMetadata;

    /** Updates an indicator given the next scalar sample. */
    updateScalar(sample: Scalar): IndicatorOutput;

    /** Updates an indicator given the next bar sample. */
    updateBar(sample: Bar): IndicatorOutput;

    /** Updates an indicator given the next quote sample. */
    updateQuote(sample: Quote): IndicatorOutput;

    /** Updates an indicator given the next trade sample. */
    updateTrade(sample: Trade): IndicatorOutput;
}

import { IndicatorOutputMetadata } from './indicator-output-metadata.interface';
import { IndicatorType } from './indicator-type.enum';

/** Describes a type and requested outputs of an indicator. */
export interface IndicatorMetadata {
    /** Identifies a type this indicator. */
    type: IndicatorType;

    /** An array of metadata for individual requested outputs. */
    outputs: IndicatorOutputMetadata[];
}

import { IndicatorOutputType } from './indicator-output-type.enum';

/** Describes a single indicator output. */
export interface IndicatorOutputMetadata {
    /**
     * An identification of this indicator output.
     *
     * It is an integer representation of provided outputs enumeration of a related indicator.
     */
    kind: number;

    /** Identifies a data type of this indicator output. */
    type: IndicatorOutputType;

    /** A short name (mnemonic) of this indicator output. */
    name: string;

    /** A description of this indicator output. */
    description: string;
}

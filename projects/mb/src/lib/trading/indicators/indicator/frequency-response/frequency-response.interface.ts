/**
 * Represents a filter which frequency response is to be calculated.
 **/
 export interface Filter {
    getName(): string;
    update(sample: number): number;
}

/**
 * Contains calculated filter frequency response data.
 * All arrays have the same spectrum length.
 **/
 export interface FrequencyResponseResult {
    label: string;
    /**
     * Normalized frequencies in range (0, 1] expressed in units of **cycles per sample**.
     *
     * The maximal value of **1** corresponds to the Nyquist frequency, or the 'one cycle per two samples'.
     *
     * The minimal value of **0** corresponds to the zero frequency, or the 'one cycle per infinite samples'.
     **/
    frequencies: number[];
    /** Spectrum power in perscentages from a maximum value. */
    powerPercent: FrequencyResponseComponent;
    /** Spectrum power in decibels. */
    powerDecibel: FrequencyResponseComponent;
    /** Spectrum amplitude in perscentages from a maximum value. */
    amplitudePercent: FrequencyResponseComponent;
    /** Spectrum amplitude in decibels. */
    amplitudeDecibel: FrequencyResponseComponent;
    /** Phase in degrees in range [-180, 180]. */
    phaseDegrees: FrequencyResponseComponent;
}

/**
 * Contains a singlce calculated filter frequency response component data.
 * All arrays have the same spectrum length.
 **/
 export interface FrequencyResponseComponent {
    data: number[];
    min: number;
    max: number;
}

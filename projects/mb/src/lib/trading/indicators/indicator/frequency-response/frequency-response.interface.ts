/**
 * Contains calculated filter frequency response data.
 * All arrays have the same spectrum length.
 **/
export interface FrequencyResponse {
    /**
     * Frequencies in range (0, 1] expressed in units of **cycles per sample**.
     *
     * The maximal value of **1** corresponds to the Nyquist frequency, or the 'one cycle per two samples'.
     *
     * The minimal value of **0** corresponds to the zero frequency, or the 'one cycle per infinite samples'.
     **/
    normalizedFrequency: number[];
    powerLinear: number[];
    powerDecibel: number[];
    amplitudeLinear: number[];
    amplitudeDecibel: number[];
    /** Phase in degrees in range [-180, 180]. */
    phase: number[];
}

export interface Filter {
    update(sample: number): number;
}
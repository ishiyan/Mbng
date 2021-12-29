/** Enumerates chirp sweep shapes. */
export enum ChirpSweep {
  /** Linear period chirp sweep. */
  LinearPeriod = 'linearPeriod',

  /** Linear frequency chirp sweep. */
  LinearFrequency = 'linearFrequency',

  /** Quadratic period chirp sweep. */
  QuadraticPeriod = 'quadraticPeriod',

  /** Quadratic frequency chirp sweep. */
  QuadraticFrequency = 'quadraticFrequency',

  /** Logarithmic period chirp sweep. */
  LogarithmicPeriod = 'logarithmicPeriod',

  /** Logarithmic frequency chirp sweep. */
  LogarithmicFrequency = 'logarithmicFrequency',
}

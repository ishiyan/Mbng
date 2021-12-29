export enum FractionalBrownianMotionAlgorithm {
  /** Generates a fractional Brownian motion or a fractional Gaussian noise using the Hosking method. */
  Hosking = 'hosking',

  /** Generates a fractional Brownian motion or a fractional Gaussian noise using the approximate Paxson method. */
  Paxson = 'paxson',

  /** Generates a fractional Brownian motion or a fractional Gaussian noise using the circulant method. */
  Circulant = 'circulant',

  /** Generates a fractional Brownian motion or a fractional Gaussian noise using the approximate circulant method. */
  ApproximateCirculant = 'approximateCirculant',
}

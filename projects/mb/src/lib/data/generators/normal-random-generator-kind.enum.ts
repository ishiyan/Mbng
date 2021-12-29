/** Different kinds of a normal random generator. */
export enum NormalRandomGeneratorKind {
  /** A fast Gaussian distribution sampler by Colin Green. */
  ZigguratColinGreen = 'zigguratColinGreen',

  /** The Gaussian random number generator by Marsaglia and Tsang with with modifications of Leong, Zhang et al. */
  ZigguratLeongZhang = 'zigguratLeongZhang',

  /** The Gaussian random number generator based on the original Marsaglia and Tsang article. */
  ZigguratMarsagliaTsang = 'zigguratMarsagliaTsang',

  /** The Gaussian random number generator which uses the polar form of the Box-Muller method. */
  BoxMuller = 'boxMuller',
}

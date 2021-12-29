import { FractionalBrownianMotionAlgorithm } from './fractional-brownian-motion-algorithm.enum';
import { NormalRandomGeneratorKind } from '../normal-random-generator-kind.enum';
import { UniformRandomGeneratorKind } from '../uniform-random-generator-kind.enum';
import {
  amplitudeName, minimalValueName, hurstExponentName, algorithmName, normalRandomGeneratorKindName,
  associatedUniformRandomGeneratorKindName, seedName, objectName
} from '../constants';

/** The input parameters for the fractional Brownian motion generators. */
export class FractionalBrownianMotionParameters {
  private static readonly defaultAmplitude: number = 100;
  private static readonly defaultMinimalValue: number = 10;
  private static readonly defaultHurstExponent: number = 0.63;
  private static readonly defaultAlgorithm: FractionalBrownianMotionAlgorithm = FractionalBrownianMotionAlgorithm.Hosking;
  private static readonly defaultNormalRandomGeneratorKind: NormalRandomGeneratorKind = NormalRandomGeneratorKind.ZigguratColinGreen;
  private static readonly defaultAssociatedUniformRandomGeneratorKind: UniformRandomGeneratorKind = UniformRandomGeneratorKind.Well44497A;
  private static readonly defaultSeed: number = 123456789;

  /** The amplitude of the fractional Brownian motion, should be positive. */
  amplitude: number = FractionalBrownianMotionParameters.defaultAmplitude;

  /** The minimum of the fractional Brownian motion, should be positive. */
  minimalValue: number = FractionalBrownianMotionParameters.defaultMinimalValue;

  /** The Hurst exponent of the fractional Brownian motion, H∈[0, 1]. */
  hurstExponent: number = FractionalBrownianMotionParameters.defaultHurstExponent;

  /** The fractional Brownian motion algorithm. */
  algorithm: FractionalBrownianMotionAlgorithm = FractionalBrownianMotionParameters.defaultAlgorithm;

  /** The kind of a Gaussian distribution random generator. */
  normalRandomGeneratorKind: NormalRandomGeneratorKind = FractionalBrownianMotionParameters.defaultNormalRandomGeneratorKind;

  /** The kind of a uniform random generator optionally associated with the Gaussian random generator.
   *
   * Used only by ZigguratColinGreen and BoxMuller Gaussian generators.
   */
  associatedUniformRandomGeneratorKind: UniformRandomGeneratorKind =
    FractionalBrownianMotionParameters.defaultAssociatedUniformRandomGeneratorKind;

  /** The seed of a random generator.
   *
   * If ZigguratColinGreen or BoxMuller Gaussian generator is used, the seed will be applied to the associated uniform generator.
   * Otherwise, it will be applied to the Gaussian generator.
   */
  seed: number = FractionalBrownianMotionParameters.defaultSeed;

  constructor(data?: FractionalBrownianMotionParameters) {
    if (data) {
      for (const property in data) {
        if (data.hasOwnProperty(property)) {
          (this as any)[property] = (data as any)[property];
        }
      }
    }
  }

  toJSON(data?: any) {
    data = typeof data === objectName ? data : {};
    data[amplitudeName] = this.amplitude;
    data[minimalValueName] = this.minimalValue;
    data[hurstExponentName] = this.hurstExponent;
    data[algorithmName] = this.algorithm;
    data[normalRandomGeneratorKindName] = this.normalRandomGeneratorKind;
    data[associatedUniformRandomGeneratorKindName] = this.associatedUniformRandomGeneratorKind;
    data[seedName] = this.seed;
    return data;
  }
}

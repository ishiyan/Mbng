import { NormalRandomGeneratorKind } from '../normal-random-generator-kind.enum';
import { UniformRandomGeneratorKind } from '../uniform-random-generator-kind.enum';
import {
  amplitudeName, minimalValueName, driftName, volatilityName, normalRandomGeneratorKindName,
  associatedUniformRandomGeneratorKindName, seedName, objectName
} from '../constants';

/** The input parameters for the geometric Brownian motion generator. */
export class GeometricBrownianMotionParameters {
  private static readonly defaultAmplitude: number = 100;
  private static readonly defaultMinimalValue: number = 10;
  private static readonly defaultDrift: number = 0.003;
  private static readonly defaultVolatility: number = 0.3;
  private static readonly defaultNormalRandomGeneratorKind: NormalRandomGeneratorKind = NormalRandomGeneratorKind.ZigguratColinGreen;
  private static readonly defaultAssociatedUniformRandomGeneratorKind: UniformRandomGeneratorKind = UniformRandomGeneratorKind.Well44497A;
  private static readonly defaultSeed: number = 123456789;

  /** The amplitude of the geometric Brownian motion, should be positive. */
  amplitude: number = GeometricBrownianMotionParameters.defaultAmplitude;

  /** The minimum of the geometric Brownian motion, should be positive. */
  minimalValue: number = GeometricBrownianMotionParameters.defaultMinimalValue;

  /** The drift (the expected return), μ, of the geometric Brownian motion. */
  drift: number = GeometricBrownianMotionParameters.defaultDrift;

  /** The volatility (standard deviation), σ, of the geometric Brownian motion.
   *
   * At each step, the drift will be shocked (added or subtracted) by this value multiplied by a normal random number.
   */
  volatility: number = GeometricBrownianMotionParameters.defaultVolatility;

  /** The kind of a Gaussian distribution random generator. */
  normalRandomGeneratorKind: NormalRandomGeneratorKind = GeometricBrownianMotionParameters.defaultNormalRandomGeneratorKind;

  /** The kind of a uniform random generator optionally associated with the Gaussian random generator.
   *
   * Used only by ZigguratColinGreen and BoxMuller Gaussian generators.
   */
  associatedUniformRandomGeneratorKind: UniformRandomGeneratorKind =
    GeometricBrownianMotionParameters.defaultAssociatedUniformRandomGeneratorKind;

  /** The seed of a random generator.
   *
   * If ZigguratColinGreen or BoxMuller Gaussian generator is used, the seed will be applied to the associated uniform generator.
   * Otherwise, it will be applied to the Gaussian generator.
   */
  seed: number = GeometricBrownianMotionParameters.defaultSeed;

  constructor(data?: GeometricBrownianMotionParameters) {
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
    data[driftName] = this.drift;
    data[volatilityName] = this.volatility;
    data[normalRandomGeneratorKindName] = this.normalRandomGeneratorKind;
    data[associatedUniformRandomGeneratorKindName] = this.associatedUniformRandomGeneratorKind;
    data[seedName] = this.seed;
    return data;
  }
}

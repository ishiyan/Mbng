import { amplitudeName, periodName, phaseInPiName, objectName } from '../constants';

/** The input parameters for an individual component of the multi-sinusoidal generator. */
export class MultiSinusoidalComponentParameters {
  private static readonly defaultAmplitude: number = 100;
  private static readonly defaultPeriod: number = 16;
  private static readonly defaultPhaseInPi: number = 0;

  /** The amplitude of the sinusoidal component, should be positive. */
  amplitude: number = MultiSinusoidalComponentParameters.defaultAmplitude;

  /** The period of the sinusoidal component in samples, should be ≥ 2. */
  period: number = MultiSinusoidalComponentParameters.defaultPeriod;

  /** The phase, φ, of the sinusoid in ratios of π; if φ∈[-1, 1], then the phase ∈[-π, π]. */
  phaseInPi: number = MultiSinusoidalComponentParameters.defaultPhaseInPi;

  constructor(data?: MultiSinusoidalComponentParameters) {
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
    data[periodName] = this.period;
    data[phaseInPiName] = this.phaseInPi;
    return data;
  }
}

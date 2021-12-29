import { ChirpSweep } from './chirp-sweep.enum';
import {
  amplitudeName, minimalValueName, initialPeriodName, finalPeriodName, phaseInPiName, isBiDirectionalName, chirpSweepName,
  objectName
} from '../constants';

/** The input parameters for the chirp generator. */
export class ChirpParameters {
  private static readonly defaultAmplitude: number = 100;
  private static readonly defaultMinimalValue: number = 10;
  private static readonly defaultInitialPeriod: number = 128;
  private static readonly defaultFinalPeriod: number = 16;
  private static readonly defaultPhaseInPi: number = 0;
  private static readonly defaultIsBiDirectional: boolean = false;
  private static readonly defaultChirpSweep: ChirpSweep = ChirpSweep.LinearPeriod;

  /** The amplitude of the chirp, should be positive. */
  amplitude: number = ChirpParameters.defaultAmplitude;

  /** The minimum of the chirp, should be positive. */
  minimalValue: number = ChirpParameters.defaultMinimalValue;

  /** The instantaneous initial period of the chirp in samples, should be ≥ 2. */
  initialPeriod: number = ChirpParameters.defaultInitialPeriod;

  /** The instantaneous final period of the chirp in samples, should be ≥ 2. */
  finalPeriod: number = ChirpParameters.defaultFinalPeriod;

  /** The initial phase, φ, of the chirp in ratios of π; if φ∈[-1, 1], then the phase ∈[-π, π]. */
  phaseInPi: number = ChirpParameters.defaultPhaseInPi;

  /** If the period of even chirps descends from the final period to the initial one, to form a symmetrical shape with odd chirps. */
  isBiDirectional: boolean = ChirpParameters.defaultIsBiDirectional;

  /** The chirp sweep. */
  chirpSweep: ChirpSweep = ChirpParameters.defaultChirpSweep;

  constructor(data?: ChirpParameters) {
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
    data[initialPeriodName] = this.initialPeriod;
    data[finalPeriodName] = this.finalPeriod;
    data[phaseInPiName] = this.phaseInPi;
    data[isBiDirectionalName] = this.isBiDirectional;
    data[chirpSweepName] = this.chirpSweep;
    return data;
  }
}

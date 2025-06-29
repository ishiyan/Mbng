import { ChirpSweep } from './chirp-sweep.enum';
import {
  amplitudeName, minimalValueName, initialPeriodName, finalPeriodName, phaseInPiName, isBiDirectionalName, chirpSweepName,
  objectName
} from '../constants';

const defaultAmplitude: number = 100;
const defaultMinimalValue: number = 10;
const defaultInitialPeriod: number = 128;
const defaultFinalPeriod: number = 16;
const defaultPhaseInPi: number = 0;
const defaultIsBiDirectional: boolean = false;
const defaultChirpSweep: ChirpSweep = ChirpSweep.LinearPeriod;
const defaultChirpSweepSamples: number = 128;

/** The input parameters for the chirp generator. */
export class ChirpParameters {

  /** The amplitude of the chirp, should be positive. */
  amplitude: number = defaultAmplitude;

  /** The minimum of the chirp, should be positive. */
  minimalValue: number = defaultMinimalValue;

  /** The instantaneous initial period of the chirp in samples, should be ≥ 2. */
  initialPeriod: number = defaultInitialPeriod;

  /** The instantaneous final period of the chirp in samples, should be ≥ 2. */
  finalPeriod: number = defaultFinalPeriod;

  /** The initial phase, φ, of the chirp in ratios of π; if φ∈[-1, 1], then the phase ∈[-π, π]. */
  phaseInPi: number = defaultPhaseInPi;

  /** If the period of even chirps descends from the final period to the initial one, to form a symmetrical shape with odd chirps. */
  isBiDirectional: boolean = defaultIsBiDirectional;

  /** The chirp sweep. */
  chirpSweep: ChirpSweep = defaultChirpSweep;

  /** The number of data points in the chirp sweep. */
  chirpSweepSamples: number = defaultChirpSweepSamples;

  constructor(data?: ChirpParameters) {
    if (data) {
      for (const property in data) {
        if (Object.prototype.hasOwnProperty.call(data, property)) {
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

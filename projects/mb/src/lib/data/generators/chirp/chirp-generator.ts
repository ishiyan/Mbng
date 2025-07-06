import { ChirpParameters } from './chirp-parameters';
import { ChirpSweep } from './chirp-sweep.enum';

const PI = Math.PI;
const TWO_PI = 2 * PI;

function sweepName(chirpSweep: ChirpSweep): string {
  switch (chirpSweep) {
    case ChirpSweep.LinearPeriod:
      return 'linPer';
    case ChirpSweep.LinearFrequency:
      return 'linFreq';
    case ChirpSweep.QuadraticPeriod:
      return 'quadPer';
    case ChirpSweep.QuadraticFrequency:
      return 'quadFreq';
    case ChirpSweep.LogarithmicPeriod:
      return 'logPer';
    case ChirpSweep.LogarithmicFrequency:
      return 'logFreq';
    default:
      throw new Error(`Unknown chirp shape ${chirpSweep}`);
  }
}

export function createChirpGenerator(params: ChirpParameters): ChirpGenerator {
  return new ChirpGenerator(
    params.chirpSweep,
    params.chirpSweepSamples,
    params.initialPeriod,
    params.finalPeriod,
    params.phaseInPi,
    params.amplitude,
    params.minimalValue,
    params.isBiDirectional,
    params.noiseAmplitudeFraction
  );
}

/**
 * The chirp waveform generator produces samples which form a period-swept cosine wave
 * defined by the given initial/final periods, amplitude, minimum value, and phase.
 * 
 * The chirp waveform can be linear, quadratic, or logarithmic in period or frequency.
 * 
 * The chirp waveform can be uni-directional or bi-directional.
 * 
 * The bi-directional waveform goes forward from the initial period to the final one,
 * and then goes backward from the final period back to the initial period.
 * This repeats infinitely, forming a symmetrical shape with odd chirps.
 * 
 * The uni-directional chirp waveform goes forward from the initial period to the final one,
 * then instantly jumps to the initial period, repeating infinitely.
 *
 * An optional noise may be added to the samples.
 */
export class ChirpGenerator {
  private readonly sweepSamplesMinusOne: number;
  private readonly initialFrequency: number;
  private readonly finalFrequency: number;
  private readonly summand: number;
  private readonly phase: number;
  private readonly ratio: number;
  private angle: number;
  private instantPeriod: number;
  private instantFrequency: number;
  private directionForward: boolean = true;
  private currentSample: number = 0;

  public readonly sweepSamples: number;
  public readonly sampleAmplitude: number;
  public readonly sampleMinimum: number;
  public readonly initialPeriod: number;
  public readonly finalPeriod: number;
  public readonly phaseInPi: number;
  public readonly chirpSweep: ChirpSweep;
  public readonly isBiDirectional: boolean;
  public readonly noiseAmplitudeFraction: number;
  public readonly moniker: string = '';

  /**
   * Initializes a new instance of the ChirpGenerator class.
   *
   * @param sweep The type of chirp sweep (linear, quadratic, logarithmic).
   * @param sweepSamples The number of samples in the single chirp sweep, should be ≥ 2.
   * @param initialPeriod The initial period of the chirp in samples, should be ≥ 2.
   * @param finalPeriod The final period of the chirp in samples, should be ≥ 2.
   * @param phaseInPi The initial phase of the chirp in ratios of π; if φ∈[-1, 1], then the phase ∈[-π, π].
   * @param amplitude The amplitude of the chirp, should be positive.
   * @param minimum The minimum value of the chirp, should be positive.
   * @param biDirectional If true, the chirp waveform is bi-directional, going forward and backward.
   * @param noiseAmplitudeFraction The fraction of the amplitude to be used for noise, should be in [0, 1].
   */
  constructor(
    sweep: ChirpSweep = ChirpSweep.LinearPeriod,
    sweepSamples: number = 128,
    initialPeriod: number = 128,
    finalPeriod: number = 16,
    phaseInPi: number = 0.0,
    amplitude: number = 100.0,
    minimum: number = 10.0,
    biDirectional: boolean = true,
    noiseAmplitudeFraction: number = 0.0
  ) {
    if (sweepSamples < 2) {
      throw new Error(`The number of samples ${sweepSamples} in chirp sweep should be ≥ 2`);
    }
    if (initialPeriod < 2) {
      throw new Error(`The initial period ${initialPeriod} in chirp sweep should be ≥ 2`);
    }
    if (finalPeriod < 2) {
      throw new Error(`The final period ${finalPeriod} in chirp sweep should be ≥ 2`);
    }
    this.sweepSamples = sweepSamples;
    this.sweepSamplesMinusOne = sweepSamples - 1;
    this.sampleAmplitude = amplitude;
    this.sampleMinimum = minimum;
    this.summand = minimum + amplitude;
    this.initialPeriod = initialPeriod;
    this.instantPeriod = initialPeriod;
    this.initialFrequency = TWO_PI / initialPeriod;
    this.instantFrequency = this.initialFrequency;
    this.finalPeriod = finalPeriod;
    this.finalFrequency = TWO_PI / finalPeriod;
    this.chirpSweep = sweep;
    this.isBiDirectional = biDirectional;
    this.phaseInPi = phaseInPi;
    this.phase = PI * phaseInPi;
    this.angle = this.phase;
    this.noiseAmplitudeFraction = noiseAmplitudeFraction;
    this.ratio = this.calculateRatio(sweep);

    const cAmplitude = this.sampleAmplitude.toFixed(0);
    const cInitialPeriod = this.initialPeriod.toFixed(0);
    const cFinalPeriod = this.finalPeriod.toFixed(0);
    const cChirpSweep = sweepName(this.chirpSweep);
    const cChirpSweepSamples = this.sweepSamples.toFixed(0);
    this.moniker = `${cAmplitude}∙chirp(${cChirpSweep}, ${cChirpSweepSamples}, ${cInitialPeriod} ➜ ${cFinalPeriod}`;

    const delta = 0.00005;
    if (Math.abs(this.phaseInPi) > delta) {
      const cPhase = this.phaseInPi.toFixed(2);
      this.moniker = `${this.moniker}, ${cPhase}∙π`;
    }

    if (this.isBiDirectional) {
      this.moniker += ', bidir)';
    } else {
      this.moniker += ')';
    }

    if (this.sampleMinimum > delta) {
      const cMinimum = this.sampleMinimum.toFixed(0);
      this.moniker = `${cMinimum} + ${this.moniker}`;
    }

    if (this.noiseAmplitudeFraction > delta) {
      this.moniker = `${this.moniker} + noise(${this.noiseAmplitudeFraction.toFixed(2)})`;
    }
  }

  /** Resets the generator to its initial state. */
  public reset(): void {
    this.angle = this.phase;
    this.instantFrequency = this.initialFrequency;
    this.instantPeriod = this.initialPeriod;
    this.directionForward = true;
    this.currentSample = 0;
  }

  /** Generates the next sample in the chirp waveform. */
  public nextSample(): number {
    this.currentSample++;
    if (this.currentSample > this.sweepSamples) {
      this.currentSample = 1;
      if (this.isBiDirectional) {
        this.directionForward = !this.directionForward;
      }
    }
    if (this.isBiDirectional) {
      this.instantFrequency = this.directionForward ?
        this.nextFrequencyForward() : this.nextFrequencyBackward();
    } else {
      this.instantFrequency = this.nextFrequencyForward();
    }

    this.angle += this.instantFrequency;
    if (this.angle > TWO_PI) {
      this.angle -= TWO_PI;
    } else if (this.angle < -TWO_PI) {
      this.angle += TWO_PI;
    }

    return this.summand + this.sampleAmplitude * Math.cos(this.angle);
  }

  private calculateRatio(chirpSweep: ChirpSweep): number {
    switch (chirpSweep) {
      case ChirpSweep.LinearPeriod:
        return (this.finalPeriod - this.initialPeriod) / this.sweepSamplesMinusOne;
      case ChirpSweep.LinearFrequency:
        return (this.finalFrequency - this.initialFrequency) / this.sweepSamplesMinusOne;
      case ChirpSweep.QuadraticPeriod:
        return (this.finalPeriod - this.initialPeriod) / (this.sweepSamplesMinusOne * this.sweepSamplesMinusOne);
      case ChirpSweep.QuadraticFrequency:
        return (this.finalFrequency - this.initialFrequency) / (this.sweepSamplesMinusOne * this.sweepSamplesMinusOne);
      case ChirpSweep.LogarithmicPeriod:
        return this.finalPeriod / this.initialPeriod;
      case ChirpSweep.LogarithmicFrequency:
        return this.finalFrequency / this.initialFrequency;
      default:
        throw new Error(`Unknown chirp sweep ${chirpSweep}`);
    }
  }

  private nextFrequencyForward(): number {
    if (this.currentSample === 1) {
      this.instantPeriod = this.initialPeriod;
      this.instantFrequency = this.initialFrequency;
      return this.initialFrequency;
    }

    let n: number;
    switch (this.chirpSweep) {
      case ChirpSweep.LinearPeriod:
        this.instantPeriod += this.ratio;
        return TWO_PI / this.instantPeriod;
      case ChirpSweep.LinearFrequency:
        return this.instantFrequency + this.ratio;
      case ChirpSweep.QuadraticPeriod:
        n = this.currentSample - 1;
        this.instantPeriod = this.initialPeriod + this.ratio * n * n;
        return TWO_PI / this.instantPeriod;
      case ChirpSweep.QuadraticFrequency:
        n = this.currentSample - 1;
        return this.initialFrequency + this.ratio * n * n;
      case ChirpSweep.LogarithmicPeriod:
        this.instantPeriod = this.initialPeriod * Math.pow(this.ratio, (this.currentSample - 1) / this.sweepSamplesMinusOne);
        return TWO_PI / this.instantPeriod;
      case ChirpSweep.LogarithmicFrequency:
        return this.initialFrequency * Math.pow(this.ratio, (this.currentSample - 1) / this.sweepSamplesMinusOne);
    }

    return this.initialFrequency;
  }

  private nextFrequencyBackward(): number {
    if (this.currentSample === 1) {
      this.instantPeriod = this.finalPeriod;
      this.instantFrequency = this.finalFrequency;
      return this.finalFrequency;
    }

    let n: number;
    switch (this.chirpSweep) {
      case ChirpSweep.LinearPeriod:
        this.instantPeriod -= this.ratio;
        return TWO_PI / this.instantPeriod;
      case ChirpSweep.LinearFrequency:
        return this.instantFrequency - this.ratio;
      case ChirpSweep.QuadraticPeriod:
        n = this.sweepSamples - this.currentSample + 1;
        this.instantPeriod = this.initialPeriod + this.ratio * n * n;
        return TWO_PI / this.instantPeriod;
      case ChirpSweep.QuadraticFrequency:
        n = this.sweepSamples - this.currentSample + 1;
        return this.initialFrequency + this.ratio * n * n;
      case ChirpSweep.LogarithmicPeriod:
        this.instantPeriod = this.initialPeriod * Math.pow(this.ratio, (this.sweepSamples - this.currentSample + 1) / this.sweepSamplesMinusOne);
        return TWO_PI / this.instantPeriod;
      case ChirpSweep.LogarithmicFrequency:
        return this.initialFrequency * Math.pow(this.ratio, (this.sweepSamples - this.currentSample + 1) / this.sweepSamplesMinusOne);
    }

    return this.finalFrequency;
  }
}
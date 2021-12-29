import { UniformRandomGeneratorKind } from './uniform-random-generator-kind.enum';
import {
  objectName, waveformSamplesName, offsetSamplesName, repetitionsCountName, noiseAmplitudeFractionName,
  noiseUniformRandomGeneratorKindName, noiseUniformRandomGeneratorSeedName
} from './constants';

/** The waveform input parameters for the generators. */
export class WaveformParameters {
  private static readonly defaultWaveformSamples: number = 512;
  private static readonly defaultOffsetSamples: number = 0;
  private static readonly defaultRepetitionsCount: number = 0;
  private static readonly defaultNoiseAmplitudeFraction: number = 0.01;
  private static readonly defaultNoiseUniformRandomGeneratorKind: UniformRandomGeneratorKind = UniformRandomGeneratorKind.Well44497A;
  private static readonly defaultNoiseUniformRandomGeneratorSeed: number = 12345678;

  /** The number of samples in the waveform. */
  waveformSamples: number = WaveformParameters.defaultWaveformSamples;

  /** The number of samples before the very first waveform sample. The value of zero means the waveform starts immediately. */
  offsetSamples: number = WaveformParameters.defaultOffsetSamples;

  /** The number of repetitions of the waveform. The value of zero means infinite. */
  repetitionsCount: number = WaveformParameters.defaultRepetitionsCount;

  /** The amplitude of the noise as a fraction of the sample value. If zero, noise will be not produced. */
  noiseAmplitudeFraction: number = WaveformParameters.defaultNoiseAmplitudeFraction;

  /** The kind of an uniform random generator to produce the noise. */
  noiseUniformRandomGeneratorKind: UniformRandomGeneratorKind = WaveformParameters.defaultNoiseUniformRandomGeneratorKind;

  /** The seed of a random generator to produce the noise. */
  noiseUniformRandomGeneratorSeed: number = WaveformParameters.defaultNoiseUniformRandomGeneratorSeed;

  constructor(data?: WaveformParameters) {
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
    data[waveformSamplesName] = this.waveformSamples;
    data[offsetSamplesName] = this.offsetSamples;
    data[repetitionsCountName] = this.repetitionsCount;
    data[noiseAmplitudeFractionName] = this.noiseAmplitudeFraction;
    data[noiseUniformRandomGeneratorKindName] = this.noiseUniformRandomGeneratorKind;
    data[noiseUniformRandomGeneratorSeedName] = this.noiseUniformRandomGeneratorSeed;
    return data;
  }
}

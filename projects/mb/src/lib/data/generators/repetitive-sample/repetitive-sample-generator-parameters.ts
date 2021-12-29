import { TimeParameters } from '../time-parameters';
import { sampleCountName, offsetSamplesName, repetitionsCountName, timeParametersName, objectName } from '../constants';

/** The input parameters for the repetitive sample generator. */
export class RepetitiveSampleGeneratorParameters {
  private static readonly defaultSampleCount: number = 252;
  private static readonly defaultOffsetSamples: number = 0;
  private static readonly defaultRepetitionsCount: number = 0;

  /** The number of samples to generate. */
  sampleCount: number = RepetitiveSampleGeneratorParameters.defaultSampleCount;

  /** The number of samples before the very first waveform sample.
   *
   * The value of zero means the waveform starts immediately. */
  offsetSamples: number = RepetitiveSampleGeneratorParameters.defaultOffsetSamples;

  /** The number of repetitions of the waveform.
   *
   * The value of zero means infinite. */
  repetitionsCount: number = RepetitiveSampleGeneratorParameters.defaultRepetitionsCount;

  /** The time related input parameters. */
  timeParameters: TimeParameters = new TimeParameters();

  constructor(data?: RepetitiveSampleGeneratorParameters) {
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
    data[sampleCountName] = this.sampleCount;
    data[offsetSamplesName] = this.offsetSamples;
    data[repetitionsCountName] = this.repetitionsCount;
    data[timeParametersName] = this.timeParameters ? this.timeParameters.toJSON() : new TimeParameters();
    return data;
  }
}

import { SinusoidalParameters } from './sinusoidal-parameters';
import { TimeParameters } from '../time-parameters';
import { WaveformParameters } from '../waveform-parameters';
import { SyntheticDataParameters } from '../synthetic-data-parameters';
import { sampleCountName, timeParametersName, waveformParametersName, sinusoidalParametersName, objectName } from '../constants';

/** The input parameters for the sinusoidal scalar generator. */
export class SinusoidalScalarGeneratorParameters {
  /** The number of samples to generate. */
  sampleCount: number = SyntheticDataParameters.defaultSampleCount;

  /** The time related input parameters. */
  timeParameters: TimeParameters = new TimeParameters();

  /** The waveform related input parameters. */
  waveformParameters: WaveformParameters = new WaveformParameters();

  /** The sinusoidal related input parameters. */
  sinusoidalParameters: SinusoidalParameters = new SinusoidalParameters();

  constructor(data?: SinusoidalScalarGeneratorParameters) {
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
    data[timeParametersName] = this.timeParameters ? this.timeParameters.toJSON() : undefined as any;
    data[waveformParametersName] = this.waveformParameters ? this.waveformParameters.toJSON() : undefined as any;
    data[sinusoidalParametersName] = this.sinusoidalParameters ? this.sinusoidalParameters.toJSON() : undefined as any;
    return data;
  }
}

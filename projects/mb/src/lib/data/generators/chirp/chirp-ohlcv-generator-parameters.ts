import { ChirpParameters } from './chirp-parameters';
import { TimeParameters } from '../time-parameters';
import { WaveformParameters } from '../waveform-parameters';
import { OhlcvParameters } from '../ohlcv-parameters';
import { SyntheticDataParameters } from '../synthetic-data-parameters';
import {
  sampleCountName, timeParametersName, waveformParametersName, chirpParametersName, ohlcvParametersName,
  objectName
} from '../constants';

/** The input parameters for the chirp ohlcv generator. */
export class ChirpOhlcvGeneratorParameters {
  /** The number of samples to generate. */
  sampleCount: number = SyntheticDataParameters.defaultSampleCount;

  /** The time related input parameters. */
  timeParameters: TimeParameters = new TimeParameters();

  /** The waveform related input parameters. */
  waveformParameters: WaveformParameters = new WaveformParameters();

  /** The chirp related input parameters. */
  chirpParameters: ChirpParameters = new ChirpParameters();

  /** The ohlcv related input parameters. */
  ohlcvParameters: OhlcvParameters = new OhlcvParameters();

  constructor(data?: ChirpOhlcvGeneratorParameters) {
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
    data[chirpParametersName] = this.chirpParameters ? this.chirpParameters.toJSON() : undefined as any;
    data[ohlcvParametersName] = this.ohlcvParameters ? this.ohlcvParameters.toJSON() : undefined as any;
    return data;
  }
}

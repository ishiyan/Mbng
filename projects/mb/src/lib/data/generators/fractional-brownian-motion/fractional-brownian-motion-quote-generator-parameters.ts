import { FractionalBrownianMotionParameters } from './fractional-brownian-motion-parameters';
import { TimeParameters } from '../time-parameters';
import { WaveformParameters } from '../waveform-parameters';
import { QuoteParameters } from '../quote-parameters';
import { SyntheticDataParameters } from '../synthetic-data-parameters';
import {
  sampleCountName, timeParametersName, waveformParametersName, fbmParametersName, quoteParametersName,
  objectName
} from '../constants';

/** The input parameters for the fractional Brownian motion quote generator. */
export class FractionalBrownianMotionQuoteGeneratorParameters {
  /** The number of samples to generate. */
  sampleCount: number = SyntheticDataParameters.defaultSampleCount;

  /** The time related input parameters. */
  timeParameters: TimeParameters = new TimeParameters();

  /** The waveform related input parameters. */
  waveformParameters: WaveformParameters = new WaveformParameters();

  /** The fractional Brownian motion related input parameters. */
  fbmParameters: FractionalBrownianMotionParameters = new FractionalBrownianMotionParameters();

  /** The quote related input parameters. */
  quoteParameters: QuoteParameters = new QuoteParameters();

  constructor(data?: FractionalBrownianMotionQuoteGeneratorParameters) {
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
    data[sampleCountName] = this.sampleCount;
    data[timeParametersName] = this.timeParameters ? this.timeParameters.toJSON() : undefined as any;
    data[waveformParametersName] = this.waveformParameters ? this.waveformParameters.toJSON() : undefined as any;
    data[fbmParametersName] = this.fbmParameters ? this.fbmParameters.toJSON() : undefined as any;
    data[quoteParametersName] = this.quoteParameters ? this.quoteParameters.toJSON() : undefined as any;
    return data;
  }
}

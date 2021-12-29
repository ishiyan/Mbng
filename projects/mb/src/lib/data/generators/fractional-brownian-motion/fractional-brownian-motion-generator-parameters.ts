import { FractionalBrownianMotionParameters } from './fractional-brownian-motion-parameters';
import { TimeParameters } from '../time-parameters';
import { WaveformParameters } from '../waveform-parameters';
import { OhlcvParameters } from '../ohlcv-parameters';
import { QuoteParameters } from '../quote-parameters';
import { TradeParameters } from '../trade-parameters';
import {
  sampleCountName, timeParametersName, waveformParametersName, fbmParametersName, ohlcvParametersName,
  quoteParametersName, tradeParametersName, objectName
} from '../constants';

/** The input parameters for the fractional Brownian motion generator. */
export class FractionalBrownianMotionGeneratorParameters {
  static readonly defaultSampleCount: number = 128;

  /** The number of samples to generate. */
  sampleCount: number = FractionalBrownianMotionGeneratorParameters.defaultSampleCount;

  /** The time related input parameters. */
  timeParameters: TimeParameters = new TimeParameters();

  /** The waveform related input parameters. */
  waveformParameters: WaveformParameters = new WaveformParameters();

  /** The fractional Brownian motion related input parameters. */
  fbmParameters: FractionalBrownianMotionParameters = new FractionalBrownianMotionParameters();

  /** The ohlcv related input parameters. */
  ohlcvParameters: OhlcvParameters = new OhlcvParameters();

  /** The quote related input parameters. */
  quoteParameters: QuoteParameters = new QuoteParameters();

  /** The trade related input parameters. */
  tradeParameters: TradeParameters = new TradeParameters();

  constructor(data?: FractionalBrownianMotionGeneratorParameters) {
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
    data[fbmParametersName] = this.fbmParameters ? this.fbmParameters.toJSON() : undefined as any;
    data[ohlcvParametersName] = this.ohlcvParameters ? this.ohlcvParameters.toJSON() : undefined as any;
    data[quoteParametersName] = this.quoteParameters ? this.quoteParameters.toJSON() : undefined as any;
    data[tradeParametersName] = this.tradeParameters ? this.tradeParameters.toJSON() : undefined as any;
    return data;
  }
}

import { objectName, candlestickShadowFractionName, candlestickBodyFractionName, volumeName } from './constants';

/** The ohlcv input parameters for the waveform generators. */
export class OhlcvParameters {
  private static readonly defaultCandlestickShadowFraction: number = 0.03;
  private static readonly defaultCandlestickBodyFraction: number = 0.01;
  private static readonly defaultVolume: number = 100;

  /** The shadow fraction, ρs, which determines the length of the candlestick shadows as a fraction of the mid price; ρs∈[0, 1].
   *
   *  The value should be greater or equal to the candlestick body fraction.
   */
  candlestickShadowFraction: number = OhlcvParameters.defaultCandlestickShadowFraction;

  /** The body fraction, ρb, which determines the half-length of the candlestick body as a fraction of the mid price; ρb∈[0, 1].
   *
   *  The value should be less or equal to the candlestick shadow fraction.
   */
  candlestickBodyFraction: number = OhlcvParameters.defaultCandlestickBodyFraction;

  /** The volume, which is the same for all candlesticks; should be positive. */
  volume: number = OhlcvParameters.defaultVolume;

  constructor(data?: OhlcvParameters) {
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
    data[candlestickShadowFractionName] = this.candlestickShadowFraction;
    data[candlestickBodyFractionName] = this.candlestickBodyFraction;
    data[volumeName] = this.volume;
    return data;
  }
}

import { objectName, volumeName } from './constants';

/** The trade related input parameters for the waveform generators. */
export class TradeParameters {
  private static readonly defaultVolume: number = 100;

  /** The volume, which is the same for all trades; should be positive. */
  volume: number = TradeParameters.defaultVolume;

  constructor(data?: TradeParameters) {
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
    data[volumeName] = this.volume;
    return data;
  }
}

import { Ohlcv } from '../../../data/entities/ohlcv';

/** Describes an ohlcv data. */
export class OhlcvData {
  /** A name of the data. */
  public name = '';

  /** Data array. */
  public data: Ohlcv[] = [];

  /** If data is displayed as candlesticks or as bars */
  public candlesticks = true;
}

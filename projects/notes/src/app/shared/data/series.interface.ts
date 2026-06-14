import { TimeGranularity } from 'mb';
import { Bar, Quote, Trade, Scalar } from 'mb';

/** The union of supported series data array types. */
export type SeriesData = Bar[] | Quote[] | Trade[] | Scalar[];

/** Contains a series of temporal entities. */
export interface Series {
  /** Brief mnemonic of the series. */
  mnemonic: string;

  /** Text describing the series. */
  description: string;

  /** URL describing the series. */
  url?: string;

  /** The name to display URL as. */
  urlName?: string;

  /** The time of the first element of the series. */
  timeStart: Date;

  /** The time of the last element of the series. */
  timeEnd: Date;

  /** The time granularity of the series. */
  timeGranularity: TimeGranularity;

  /** The actual data array. */
  data: SeriesData;
}

import { TimeGranularity } from 'projects/mb/src/lib/trading/time/time-granularity.enum';
import { TemporalEntity } from 'projects/mb/src/lib/data/entities/temporal-entity.interface';

/** Contains a series of temporal entities. */
export interface Series {
  /** Brief mnemonic of the series. */
  mnemonic: string;

  /** Text describing the series. */
  description: string;

  /** The time of the first element of the series. */
  timeStart: Date;

  /** The time of the last element of the series. */
  timeEnd: Date;

  /** The time granularity of the series. */
  timeGranularity: TimeGranularity;

  /** The actual data array. */
  data: TemporalEntity[];
}

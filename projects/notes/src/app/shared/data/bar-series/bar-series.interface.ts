import { Bar } from "projects/mb/src/lib/data/entities/bar";
import { TimeGranularity } from "projects/mb/src/lib/trading/time/time-granularity.enum";

/** Contains a series of bars. */
export interface BarSeries {
  /** Brief name of the series. */
  name: string;

  /** Text describing the series. */
  description: string;

  /** The time of the first element of the series. */
  timeStart: Date;

  /** The time of the last element of the series. */
  timeEnd: Date;

  /** The time granularity of a bar in the series. */
  timeGranularity: TimeGranularity;

  /** The actual data array. */
  data: Bar[];
}

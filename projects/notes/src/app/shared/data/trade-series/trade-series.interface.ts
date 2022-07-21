import { Trade } from 'projects/mb/src/lib/data/entities/trade';
import { Series } from '../series.interface';

/** Contains a series of trades. */
export interface TradeSeries extends Series {
  /** The actual data array. */
  data: Trade[];
}

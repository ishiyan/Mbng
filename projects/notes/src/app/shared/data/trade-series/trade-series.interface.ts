import { Trade } from 'mb';

import { Series } from '../series.interface';

/** Contains a series of trades. */
export interface TradeSeries extends Series {
  /** The actual data array. */
  data: Trade[];
}

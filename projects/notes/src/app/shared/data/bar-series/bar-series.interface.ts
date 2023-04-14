import { Bar } from 'mb';

import { Series } from '../series.interface';

/** Contains a series of bars. */
export interface BarSeries extends Series {
  /** The actual data array. */
  data: Bar[];
}

import { Scalar } from 'mb';

import { Series } from '../series.interface';

/** Contains a series of scalars. */
export interface ScalarSeries extends Series {
  /** The actual data array. */
  data: Scalar[];
}

import { Scalar } from 'projects/mb/src/lib/data/entities/scalar';
import { Series } from '../series.interface';

/** Contains a series of scalars. */
export interface ScalarSeries extends Series {
  /** The actual data array. */
  data: Scalar[];
}

import { Quote } from 'projects/mb/src/lib/data/entities/quote';
import { Series } from '../series.interface';

/** Contains a series of quotes. */
export interface QuoteSeries extends Series {
  /** The actual data array. */
  data: Quote[];
}

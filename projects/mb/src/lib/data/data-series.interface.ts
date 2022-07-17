import { Bar } from './entities/bar';
import { Trade } from './entities/trade';
import { Quote } from './entities/quote';
import { Scalar } from './entities/scalar';

/** Contains a series of data elements. */
export interface DataSeries {
  /** Brief mnemonic of the series. */
  title?: string;

  /** The actual data array. */
  data: Bar[] | Quote[] | Trade[] | Scalar[];
}

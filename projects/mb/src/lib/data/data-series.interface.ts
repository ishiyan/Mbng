import { TemporalEntity } from './entities/temporal-entity.interface';

/** Contains a series of temporal data elements. */
export interface DataSeries {
  /** Brief mnemonic of the series. */
  title?: string;

  /** The actual data array. */
  data: TemporalEntity[];
}

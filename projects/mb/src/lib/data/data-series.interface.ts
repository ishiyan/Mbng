import { TemporalEntity } from './entities/temporal-entity.type';

/** Contains a series of temporal data elements. */
export interface DataSeries {
  /** Brief mnemonic of the series. */
  title?: string;

  /** The actual data array. */
  data: TemporalEntity[];
}

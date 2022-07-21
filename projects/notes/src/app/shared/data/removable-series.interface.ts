import { Series } from './series.interface';

export interface RemovableSeries extends Series {
  removable?: boolean;
}

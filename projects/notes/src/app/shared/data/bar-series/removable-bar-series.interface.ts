import { BarSeries } from './bar-series.interface';

export interface RemovableBarSeries extends BarSeries {
  removable?: boolean;
}

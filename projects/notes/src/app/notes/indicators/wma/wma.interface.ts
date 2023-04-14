import { LineStyle } from 'mb';
import { WeightedMovingAverageParams } from 'mb';

export interface Wma {
  params: WeightedMovingAverageParams;
  style: LineStyle;
  showStyle: boolean;
}

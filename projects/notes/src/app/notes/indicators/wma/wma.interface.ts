import { LineStyle } from 'mb';
import { WeightedMovingAverageParams } from 'mb';

export interface Wma {
  id: number;
  params: WeightedMovingAverageParams;
  style: LineStyle;
  showStyle: boolean;
}

import { LineStyle } from 'mb';
import { SimpleMovingAverageParams } from 'mb';

export interface Sma {
  id: number;
  params: SimpleMovingAverageParams;
  style: LineStyle;
  showStyle: boolean;
}

import { LineStyle } from 'mb';
import { SimpleMovingAverageParams } from 'mb';

export interface Sma {
  params: SimpleMovingAverageParams;
  style: LineStyle;
  showStyle: boolean;
}

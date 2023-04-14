import { LineStyle } from 'mb';
import { TriangularMovingAverageParams } from 'mb';

export interface Trima {
  params: TriangularMovingAverageParams;
  style: LineStyle;
  showStyle: boolean;
}

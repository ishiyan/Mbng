import { LineStyle } from 'mb';
import { TriangularMovingAverageParams } from 'mb';

export interface Trima {
  id: number;
  params: TriangularMovingAverageParams;
  style: LineStyle;
  showStyle: boolean;
}

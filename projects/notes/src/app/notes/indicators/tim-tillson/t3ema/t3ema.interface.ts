import { LineStyle } from 'mb';
import { T3ExponentialMovingAverageLengthParams, T3ExponentialMovingAverageSmoothingFactorParams } from 'mb';

export interface T3ema {
  id: number;
  params: T3ExponentialMovingAverageLengthParams | T3ExponentialMovingAverageSmoothingFactorParams;
  style: LineStyle;
  showStyle: boolean;
}

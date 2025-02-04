import { LineStyle } from 'mb';
import { T2ExponentialMovingAverageLengthParams, T2ExponentialMovingAverageSmoothingFactorParams } from 'mb';

export interface T2ema {
  id: number;
  params: T2ExponentialMovingAverageLengthParams | T2ExponentialMovingAverageSmoothingFactorParams;
  style: LineStyle;
  showStyle: boolean;
}

import { LineStyle } from 'mb';
import { T2ExponentialMovingAverageLengthParams, T2ExponentialMovingAverageSmoothingFactorParams } from 'mb';

export interface T2ema {
  params: T2ExponentialMovingAverageLengthParams | T2ExponentialMovingAverageSmoothingFactorParams;
  style: LineStyle;
  showStyle: boolean;
}

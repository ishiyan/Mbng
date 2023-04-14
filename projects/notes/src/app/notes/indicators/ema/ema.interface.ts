import { LineStyle } from 'mb';
import { ExponentialMovingAverageLengthParams, ExponentialMovingAverageSmoothingFactorParams } from 'mb';

export interface Ema {
  params: ExponentialMovingAverageLengthParams | ExponentialMovingAverageSmoothingFactorParams;
  style: LineStyle;
  showStyle: boolean;
}

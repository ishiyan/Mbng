import { LineStyle } from 'mb';
import { ExponentialMovingAverageLengthParams, ExponentialMovingAverageSmoothingFactorParams } from 'mb';

export interface Ema {
  id: number;
  params: ExponentialMovingAverageLengthParams | ExponentialMovingAverageSmoothingFactorParams;
  style: LineStyle;
  showStyle: boolean;
}

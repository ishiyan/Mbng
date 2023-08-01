import { LineStyle } from 'mb';
import { DoubleExponentialMovingAverageLengthParams, DoubleExponentialMovingAverageSmoothingFactorParams } from 'mb';

export interface Dema {
  params: DoubleExponentialMovingAverageLengthParams | DoubleExponentialMovingAverageSmoothingFactorParams;
  style: LineStyle;
  showStyle: boolean;
}

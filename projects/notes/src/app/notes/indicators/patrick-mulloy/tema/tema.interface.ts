import { LineStyle } from 'mb';
import { TripleExponentialMovingAverageLengthParams, TripleExponentialMovingAverageSmoothingFactorParams } from 'mb';

export interface Tema {
  id: number;
  params: TripleExponentialMovingAverageLengthParams | TripleExponentialMovingAverageSmoothingFactorParams;
  style: LineStyle;
  showStyle: boolean;
}

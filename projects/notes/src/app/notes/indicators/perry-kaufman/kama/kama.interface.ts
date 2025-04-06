import { LineStyle } from 'mb';
import { KaufmanAdaptiveMovingAverageLengthParams, KaufmanAdaptiveMovingAverageSmoothingFactorParams } from 'mb';

export interface Kama {
  id: number;
  params: KaufmanAdaptiveMovingAverageLengthParams | KaufmanAdaptiveMovingAverageSmoothingFactorParams;
  style: LineStyle;
  showStyle: boolean;
}

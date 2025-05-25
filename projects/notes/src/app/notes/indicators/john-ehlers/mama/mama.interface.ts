import { LineStyle } from 'mb';
import { MesaAdaptiveMovingAverageLengthParams, MesaAdaptiveMovingAverageSmoothingFactorParams } from 'mb';

export interface Mama {
  id: number;
  params: MesaAdaptiveMovingAverageLengthParams | MesaAdaptiveMovingAverageSmoothingFactorParams;
  style: LineStyle;
  showStyle: boolean;
}

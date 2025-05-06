import { LineStyle } from 'mb';
import { FractalAdaptiveMovingAverageParams } from 'mb';

export interface Frama {
  id: number;
  params: FractalAdaptiveMovingAverageParams;
  style: LineStyle;
  showStyle: boolean;
}

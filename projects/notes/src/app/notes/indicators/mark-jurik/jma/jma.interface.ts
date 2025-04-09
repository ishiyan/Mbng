import { LineStyle } from 'mb';
import { JurikMovingAverageParams } from 'mb';

export interface Jma {
  id: number;
  params: JurikMovingAverageParams;
  style: LineStyle;
  showStyle: boolean;
}

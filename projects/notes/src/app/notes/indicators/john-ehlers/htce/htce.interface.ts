import { LineStyle } from 'mb';
import { BarComponent } from 'mb';
import { HilbertTransformerCycleEstimatorType } from 'mb';
import { HilbertTransformerCycleEstimatorParams } from 'mb';

export interface Htce {
  id: number;
  estimatorType: HilbertTransformerCycleEstimatorType;
  params: HilbertTransformerCycleEstimatorParams;
  barComponent: BarComponent,
  style: LineStyle;
  showStyle: boolean;
}

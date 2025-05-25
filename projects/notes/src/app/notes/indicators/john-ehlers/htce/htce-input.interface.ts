import { BarComponent } from 'mb';
import { HilbertTransformerCycleEstimatorType } from 'mb';
import { HilbertTransformerCycleEstimatorParams } from 'mb';

export interface HtceInput {
  estimatorType: HilbertTransformerCycleEstimatorType[];
  params: HilbertTransformerCycleEstimatorParams[];
  barComponent?: BarComponent;
  showStyle: boolean;
}

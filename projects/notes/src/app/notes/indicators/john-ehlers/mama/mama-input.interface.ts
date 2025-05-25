import { BarComponent } from 'mb';
import { HilbertTransformerCycleEstimatorType } from 'mb';
import { HilbertTransformerCycleEstimatorParams } from 'mb';

export interface MamaLengthInput {
  estimatorType?: HilbertTransformerCycleEstimatorType;
  estimatorParams?: HilbertTransformerCycleEstimatorParams[];
  fastLimitLength: number;
  slowLimitLength: number;
  barComponent?: BarComponent;
  showStyle: boolean;
}

export interface MamaSmoothingFactorInput {
  estimatorType?: HilbertTransformerCycleEstimatorType;
  estimatorParams?: HilbertTransformerCycleEstimatorParams[];
  fastLimitSmoothingFactor: number;
  slowLimitSmoothingFactor: number;
  barComponent?: BarComponent;
  showStyle: boolean;
}

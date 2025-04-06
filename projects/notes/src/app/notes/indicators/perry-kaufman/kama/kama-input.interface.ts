import { BarComponent } from 'mb';

export interface KamaLengthInput {
  efficiencyRatioLength: number[];
  fastestLength: number;
  slowestLength: number;
  barComponent?: BarComponent;
  showStyle: boolean;
}

export interface KamaSmoothingFactorInput {
  efficiencyRatioLength: number[];
  fastestSmoothingFactor: number;
  slowestSmoothingFactor: number;
  barComponent?: BarComponent;
  showStyle: boolean;
}

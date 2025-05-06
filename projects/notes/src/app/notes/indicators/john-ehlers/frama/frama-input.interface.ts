import { BarComponent } from 'mb';

export interface FramaInput {
  length: number[];
  slowestSmoothingFactor: number;
  barComponent?: BarComponent;
  showStyle: boolean;
}

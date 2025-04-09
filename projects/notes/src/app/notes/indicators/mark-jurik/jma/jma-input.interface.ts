import { BarComponent } from 'mb';

export interface JmaInput {
  length: number[];
  phase: number[];
  barComponent?: BarComponent;
  showStyle: boolean;
}

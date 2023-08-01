import { BarComponent } from 'mb';

export interface T2emaLengthInput {
  length: number[];
  vFactor: number;
  firstIsAverage: boolean;
  barComponent?: BarComponent;
  showStyle: boolean;
}

export interface T2emaSmoothingFactorInput {
  smoothingFactor: number[];
  vFactor: number;
  barComponent?: BarComponent;
  showStyle: boolean;
}

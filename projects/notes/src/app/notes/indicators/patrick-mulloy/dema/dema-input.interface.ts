import { BarComponent } from 'mb';

export interface DemaLengthInput {
  length: number[];
  firstIsAverage: boolean;
  barComponent?: BarComponent;
  showStyle: boolean;
}

export interface DemaSmoothingFactorInput {
  smoothingFactor: number[];
  barComponent?: BarComponent;
  showStyle: boolean;
}

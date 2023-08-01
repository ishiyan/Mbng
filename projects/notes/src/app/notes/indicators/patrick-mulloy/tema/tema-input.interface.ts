import { BarComponent } from 'mb';

export interface TemaLengthInput {
  length: number[];
  firstIsAverage: boolean;
  barComponent?: BarComponent;
  showStyle: boolean;
}

export interface TemaSmoothingFactorInput {
  smoothingFactor: number[];
  barComponent?: BarComponent;
  showStyle: boolean;
}

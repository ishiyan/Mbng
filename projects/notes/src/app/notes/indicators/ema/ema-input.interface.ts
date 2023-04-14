import { BarComponent } from 'mb';

export interface EmaLengthInput {
  length: number[];
  firstIsAverage: boolean;
  barComponent?: BarComponent;
  showStyle: boolean;
}

export interface EmaSmoothingFactorInput {
  smoothingFactor: number[];
  barComponent?: BarComponent;
  showStyle: boolean;
}

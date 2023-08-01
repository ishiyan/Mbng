import { BarComponent } from 'mb';

export interface T3emaLengthInput {
  length: number[];
  vFactor: number;
  firstIsAverage: boolean;
  barComponent?: BarComponent;
  showStyle: boolean;
}

export interface T3emaSmoothingFactorInput {
  smoothingFactor: number[];
  vFactor: number;
  barComponent?: BarComponent;
  showStyle: boolean;
}

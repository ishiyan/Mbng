import { BarComponent } from 'projects/mb/src/lib/data/entities/bar-component.enum';

export interface SmaInput {
  length: number[];
  barComponent?: BarComponent;
  showStyle: boolean;
}

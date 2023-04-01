import { BarComponent } from 'projects/mb/src/lib/data/entities/bar-component.enum';

export interface TrimaInput {
  length: number[];
  barComponent?: BarComponent;
  showStyle: boolean;
}

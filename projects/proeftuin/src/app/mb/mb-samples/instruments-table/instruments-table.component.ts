import { ChangeDetectionStrategy, Component } from '@angular/core';
import { Table1Component } from './table1/table1.component';
import { Table12Component } from './table12/table12.component';

@Component({
  selector: 'mb-sample-instrument-table',
  templateUrl: './instruments-table.component.html',
  styleUrls: ['./instruments-table.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [Table1Component, Table12Component]
})
export class InstrumentsTableComponent { }

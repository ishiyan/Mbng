import { Component, ElementRef, viewChild, ChangeDetectionStrategy } from '@angular/core';
import { animate, state, style, transition, trigger } from '@angular/animations';
import { MatTable, MatColumnDef, MatHeaderCellDef, MatHeaderCell, MatCellDef, MatCell, MatHeaderRowDef, MatHeaderRow, MatRowDef, MatRow } from '@angular/material/table';

import { InstrumentType } from 'projects/mb/src/lib/trading/instruments/types/instrument-type.enum';
import { ExchangeMic } from 'projects/mb/src/lib/trading/markets/exchange-mic.enum';
import { CurrencyCode } from 'projects/mb/src/lib/trading/currencies/currency-code.enum';
import { Instrument } from 'projects/mb/src/lib/trading/instruments/instrument';
// import { euronextListShort } from 'projects/mb/src/lib/euronext-list-short';

@Component({
  selector: 'mb-sample-table1',
  templateUrl: './table1.component.html',
  styleUrls: ['./table1.component.scss'],
  animations: [
    trigger('detailExpand', [
      state('collapsed', style({ height: '0px', minHeight: '0', display: 'none' })),
      state('expanded', style({ height: '*' })),
      transition('expanded <=> collapsed', animate('225ms cubic-bezier(0.4, 0.0, 0.2, 1)')),
    ]),
  ],
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [
    MatTable,
    MatColumnDef,
    MatHeaderCellDef,
    MatHeaderCell,
    MatCellDef,
    MatCell,
    MatHeaderRowDef,
    MatHeaderRow,
    MatRowDef,
    MatRow
  ]
})
export class Table1Component {
  readonly container = viewChild.required<ElementRef>('container');

  public InstrumentType = InstrumentType;
  public ExchangeMic = ExchangeMic;
  public CurrencyCode = CurrencyCode;
  public expandedInstrument!: Instrument;
  displayedColumns: string[] = ['type', 'symbol', 'name', 'isin', 'mic'];
  dataSource: any[] = [];

  public getMic(instrument: Instrument): ExchangeMic {
    // @ts-ignore
    return ExchangeMic[instrument.mic];
  }

  public getType(instrument: Instrument): InstrumentType {
    // @ts-ignore
    return InstrumentType[instrument.type];
  }
}

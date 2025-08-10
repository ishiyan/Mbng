import { ChangeDetectionStrategy, Component, OnInit, effect, input, viewChild } from '@angular/core';
import { NgClass, DecimalPipe, DatePipe } from '@angular/common';
import { MatFormField, MatLabel } from '@angular/material/form-field';
import { MatSelect } from '@angular/material/select';
import { MatOption } from '@angular/material/core';
import { MatExpansionPanel, MatExpansionPanelHeader, MatExpansionPanelTitle } from '@angular/material/expansion';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource, MatTable, MatColumnDef, MatHeaderCellDef, MatHeaderCell, MatCellDef, MatCell, MatHeaderRowDef, MatHeaderRow, MatRowDef, MatRow } from '@angular/material/table';

import { TemporalEntityKind } from '../../data/entities/temporal-entity-kind.enum';
import { HistoricalData } from '../../data/historical-data';
import { Ohlcv } from '../../data/entities/ohlcv';
import { Quote } from '../../data/entities/quote';
import { Trade } from '../../data/entities/trade';
import { Scalar } from '../../data/entities/scalar';
import { HistoricalDataDownloadComponent } from './historical-data-download.component';

@Component({
  selector: 'mb-historical-data-table',
  templateUrl: './historical-data-table.component.html',
  styleUrls: ['./historical-data-table.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [
    NgClass,
    DecimalPipe,
    DatePipe,
    MatFormField,
    MatLabel,
    MatSelect,
    MatOption,
    MatExpansionPanel,
    MatExpansionPanelHeader,
    MatExpansionPanelTitle,
    MatPaginator,
    MatTable,
    MatColumnDef,
    MatHeaderCellDef,
    MatHeaderCell,
    MatCellDef,
    MatCell,
    MatHeaderRowDef,
    MatHeaderRow,
    MatRowDef,
    MatRow,
    HistoricalDataDownloadComponent
  ]
})
export class HistoricalDataTableComponent implements OnInit {
  readonly paginator = viewChild.required(MatPaginator);
  readonly enableDownload = input(true);
  readonly historicalData = input.required<HistoricalData>();

  constructor() {
    effect(() => {
      this.dataSource.paginator = this.paginator();
    });
    effect(() => {
      const v = this.historicalData();
      if (v) {
        this.temporalEntityKind = v.temporalEntityKind;
        this.dataSource.data = v.data;
        this.canDownload = v.data && v.data.length > 0;
        switch (v.temporalEntityKind) {
          case TemporalEntityKind.Bar:
            this.currentColumns = ['time', 'open', 'high', 'low', 'close', 'volume'];
            break;
          case TemporalEntityKind.Quote:
            this.currentColumns = ['time', 'bidPrice', 'bidSize', 'askPrice', 'askSize'];
            break;
          case TemporalEntityKind.Trade:
            this.currentColumns = ['time', 'price', 'volume'];
            break;
          case TemporalEntityKind.Scalar:
            this.currentColumns = ['time', 'value'];
            break;
          default:
            this.currentColumns = [];
            break;
        }
      } else {
        this.temporalEntityKind = undefined;
        this.dataSource.data = [];
        this.canDownload = false;
        this.currentColumns = [];
      }
    });
  }

  readonly timeFormats: string[] = [
    'yyyy-MM-dd', 'yyyy-MM-dd HH:mm:ss', 'yyyy-MM-dd HH:mm:ss.SSSSSSS', 'yyyy-MM-ddTHH:mm:ss.SSSSSSS'
  ];
  readonly decimalFormats: string[] = [
    '1.0-15', '1.0-2', '1.0-4'
  ];
  currentColumns: string[] = [];
  selectedTimeFormat: string = this.timeFormats[0];
  selectedDecimalFormat = 2;
  canDownload = false;
  currentHistoricalData!: HistoricalData;
  dataSource: MatTableDataSource<Ohlcv | Quote | Trade | Scalar> = new MatTableDataSource<Ohlcv | Quote | Trade | Scalar>();
  private temporalEntityKind: TemporalEntityKind | undefined;

  ngOnInit() {
    this.dataSource.paginator = this.paginator();
  }

  get isOhlcv(): boolean {
    return this.temporalEntityKind === TemporalEntityKind.Bar;
  }

  get isQuote(): boolean {
    return this.temporalEntityKind === TemporalEntityKind.Quote;
  }

  get isTrade(): boolean {
    return this.temporalEntityKind === TemporalEntityKind.Trade;
  }

  get isScalar(): boolean {
    return this.temporalEntityKind === TemporalEntityKind.Scalar;
  }
}

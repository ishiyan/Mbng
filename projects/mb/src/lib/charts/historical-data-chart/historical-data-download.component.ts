import { Component, Input } from '@angular/core';
import { DatePipe, DecimalPipe } from '@angular/common';

import { TemporalEntityKind } from '../../data//entities/temporal-entity-kind.enum';
import { HistoricalData } from '../../data/historical-data';

@Component({
  selector: 'mb-data-historical-data-download',
  templateUrl: './historical-data-download.component.html',
  styleUrls: ['./historical-data-download.component.scss']
})
export class HistoricalDataDownloadComponent {
  @Input()
  set historicalData(historicalData: HistoricalData) {
    this.currentHistoricalData = historicalData;
    if (historicalData) {
      this.canDownload = historicalData.data && historicalData.data.length > 0;
      switch (historicalData.temporalEntityKind) {
        case TemporalEntityKind.Ohlcv:
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
      this.canDownload = false;
      this.currentColumns = [];
    }
  }

  readonly timeFormats: string[] = [
    'yyyy-MM-dd', 'yyyy-MM-dd HH:mm:ss', 'yyyy-MM-dd HH:mm:ss.SSSSSSS', 'yyyy-MM-ddTHH:mm:ss.SSSSSSS'
  ];
  readonly decimalFormats: string[] = [
    '1.0-15', '1.0-2', '1.0-4'
  ];
  readonly locale = 'en-US';

  currentColumns: string[] = [];
  currentHistoricalData!: HistoricalData;
  selectedTimeFormat: string = this.timeFormats[0];
  selectedDecimalFormat = 0;
  canDownload = false;
  writeDescription = true;
  writeHeader = false;
  writeByteOrderMark = false;
  private datePipe = new DatePipe(this.locale);
  private decimalPipe = new DecimalPipe(this.locale);

  doDownload(): void {
    if (!this.canDownload) {
      return;
    }
    const csv = this.writeByteOrderMark ? '\ufeff' + this.convertToCSV() : this.convertToCSV();
    const blob = new Blob([csv], { type: 'text/csv;charset=utf8;' });
    // @ts-ignore
    const filename = this.currentHistoricalData.name.replace(/ /g, '_') + '.csv';

    if (navigator.msSaveBlob) {
      navigator.msSaveBlob(blob, filename);
    } else {
      const link = document.createElement('a');
      link.href = URL.createObjectURL(blob);
      link.setAttribute('visibility', 'hidden');
      link.download = filename;

      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    }
  }

  private convertToCSV(): string {
    if (!this.canDownload) {
      return '';
    }
    const eol = '\r\n';
    const separator = ';';
    const items = this.currentHistoricalData.data;
    const headers = this.currentColumns;
    const timeFormat = this.selectedTimeFormat;
    const decimalFormat = this.decimalFormats[this.selectedDecimalFormat];

    const replacer = (key: string, value: string | number) => {
      if (!value || value === null) {
        return '';
      }
      if (key === 'time') {
        return this.datePipe.transform(value, timeFormat);
      }
      return this.decimalPipe.transform(value, decimalFormat);
    };

    // @ts-ignore
    const csv = items.map(row => headers.map(fieldName => replacer(fieldName, row[fieldName])).join(separator));
    if (this.writeDescription) {
      const comment = '# ';
      csv.unshift(this.writeHeader ? headers.join(separator) : (comment + headers.join(separator)));
      csv.unshift(comment + this.currentHistoricalData.moniker);
      csv.unshift(comment + this.currentHistoricalData.name);
    } else if (this.writeHeader) {
      csv.unshift(headers.join(separator));
    }
    return csv.join(eol);
  }
}

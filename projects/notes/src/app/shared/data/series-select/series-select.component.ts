import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

import { SparklineConfiguration } from 'mb';

import { primaryColor } from '../../theme-colors';
import { BarSeriesService } from '../bar-series/bar-series.service';
import { ScalarSeriesService } from '../scalar-series/scalar-series.service';
import { TradeSeriesService } from '../trade-series/trade-series.service';
import { QuoteSeriesService } from '../quote-series/quote-series.service';
import { Series } from '../series.interface';

@Component({
    selector: 'app-series-select',
    templateUrl: './series-select.component.html',
    styleUrls: ['./series-select.component.scss'],
    standalone: false
})
export class SeriesSelectComponent implements OnInit {
  protected barSeriesArray!: Series[];
  protected scalarSeriesArray!: Series[];
  protected tradeSeriesArray!: Series[];
  protected quoteSeriesArray!: Series[];
  protected allSeriesArray!: Series[];
  protected selected!: Series;
  protected labelText = '';
  protected configFill: SparklineConfiguration = {
    fillColor: primaryColor, strokeColor: undefined, strokeWidth: 1
  };

  /** Event emitted when the selection has been changed. */
  @Output() selectionChange: EventEmitter<Series> = new EventEmitter<Series>();

  /** Specifies the sparkline fill color. */
  @Input() set color(c: string) {
    if (c && c != null && c.length > 0) {
      this.configFill.fillColor = c;
      this.configFill = { ...this.configFill };
    }
  }

  /** Specifies the label of the form field. */
  @Input() set label(text: string) {
    if (text && text != null) {
      this.labelText = text;
    }
  }

  constructor(
    private barSeriesService: BarSeriesService,
    private scalarSeriesService: ScalarSeriesService,
    private tradeSeriesService: TradeSeriesService,
    private quoteSeriesService: QuoteSeriesService) {
    this.barSeriesArray = this.barSeriesService.get();
    this.scalarSeriesArray = this.scalarSeriesService.get();
    this.tradeSeriesArray = this.tradeSeriesService.get();
    this.quoteSeriesArray = this.quoteSeriesService.get();
    this.selected = this.barSeriesArray[0];
  }

  ngOnInit(): void {
    this.selectionChange.emit(this.selected);
    this.barSeriesService.getObservable().subscribe(ar => {
      this.barSeriesArray = ar;
      this.concatenateAll();
      if (!this.allSeriesArray.includes(this.selected)) {
        this.selected = this.allSeriesArray[0];
      }
    });
    this.scalarSeriesService.getObservable().subscribe(ar => {
      this.scalarSeriesArray = ar;
      this.concatenateAll();
      if (!this.allSeriesArray.includes(this.selected)) {
        this.selected = this.allSeriesArray[0];
      }
    });
    this.tradeSeriesService.getObservable().subscribe(ar => {
      this.tradeSeriesArray = ar;
      this.concatenateAll();
      if (!this.allSeriesArray.includes(this.selected)) {
        this.selected = this.allSeriesArray[0];
      }
    });
    this.quoteSeriesService.getObservable().subscribe(ar => {
      this.quoteSeriesArray = ar;
      this.concatenateAll();
      if (!this.allSeriesArray.includes(this.selected)) {
        this.selected = this.allSeriesArray[0];
      }
    });
  }

  protected changed(selection: Series): void {
    this.selectionChange.emit(selection);
  }

  private concatenateAll() {
    const ar: Series[] = [];
    this.allSeriesArray = ar.concat(
      this.barSeriesArray, this.scalarSeriesArray, this.tradeSeriesArray, this.quoteSeriesArray);
  }
}

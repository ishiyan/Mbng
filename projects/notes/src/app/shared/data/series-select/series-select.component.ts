import { Component, Input, OnInit, output, inject, ChangeDetectionStrategy } from '@angular/core';
import { MatFormField, MatLabel } from '@angular/material/form-field';
import { MatSelect, MatSelectTrigger } from '@angular/material/select';
import { MatOptgroup, MatOption } from '@angular/material/core';

import { SparklineConfiguration, SparklineComponent } from 'mb';

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
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [
    MatFormField,
    MatLabel,
    MatSelect,
    MatSelectTrigger,
    MatOption,
    MatOptgroup,
    SparklineComponent
  ]
})
export class SeriesSelectComponent implements OnInit {
  private barSeriesService = inject(BarSeriesService);
  private scalarSeriesService = inject(ScalarSeriesService);
  private tradeSeriesService = inject(TradeSeriesService);
  private quoteSeriesService = inject(QuoteSeriesService);

  protected barSeriesArray: Series[] = this.barSeriesService.get();
  protected scalarSeriesArray: Series[] = this.scalarSeriesService.get();
  protected tradeSeriesArray: Series[] = this.tradeSeriesService.get();
  protected quoteSeriesArray: Series[] = this.quoteSeriesService.get();
  protected allSeriesArray!: Series[];
  protected selected: Series = this.barSeriesArray[0];
  protected labelText = '';
  protected configFill: SparklineConfiguration = {
    fillColor: primaryColor, strokeColor: undefined, strokeWidth: 1
  };

  /** Event emitted when the selection has been changed. */
  readonly selectionChange = output<Series>();

  /** Specifies the sparkline fill color. */
  // TODO: Skipped for migration because:
  //  Accessor inputs cannot be migrated as they are too complex.
  @Input() set color(c: string) {
    if (c && c != null && c.length > 0) {
      this.configFill.fillColor = c;
      this.configFill = { ...this.configFill };
    }
  }

  /** Specifies the label of the form field. */
  // TODO: Skipped for migration because:
  //  Accessor inputs cannot be migrated as they are too complex.
  @Input() set label(text: string) {
    if (text && text != null) {
      this.labelText = text;
    }
  }

  constructor() {
    /* this.barSeriesArray = this.barSeriesService.get();
    this.scalarSeriesArray = this.scalarSeriesService.get();
    this.tradeSeriesArray = this.tradeSeriesService.get();
    this.quoteSeriesArray = this.quoteSeriesService.get(); */
    //this.selected = this.barSeriesArray[0];
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

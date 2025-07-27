import { Component, OnInit, output, inject, ChangeDetectionStrategy, input, effect, computed } from '@angular/core';
import { MatFormField, MatLabel } from '@angular/material/form-field';
import { MatSelect, MatSelectTrigger } from '@angular/material/select';
import { MatOptgroup, MatOption } from '@angular/material/core';

import { SparklineConfiguration, SparklineComponent } from 'mb';

import { DynamicColorService } from '../../../dynamic-color.service';
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
  private dcs = inject(DynamicColorService);

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

  protected readonly configFill = computed((): SparklineConfiguration => ({
    fillColor: this.dcs.primaryColor(),
    strokeColor: undefined,
    strokeWidth: 1
  }));

  /** Specifies the label of the form field. */
  readonly label = input<string>();

  /** Event emitted when the selection has been changed. */
  readonly selectionChange = output<Series>();

  constructor() {
    effect(() => {
      const text = this.label();
      if (text && text != null) {
        this.labelText = text;
      }
    });
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

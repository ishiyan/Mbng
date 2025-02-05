import { Component, OnInit, output, inject, ChangeDetectionStrategy, input, effect } from '@angular/core';
import { MatFormField, MatLabel } from '@angular/material/form-field';
import { MatSelect, MatSelectTrigger } from '@angular/material/select';
import { MatOption } from '@angular/material/core';

import { SparklineComponent } from 'mb';

import { SeriesSelect } from '../../abstractions/series-select';
import { Series } from '../../series.interface';
import { TradeSeries } from '../trade-series.interface';
import { TradeSeriesService } from '../trade-series.service';

@Component({
  selector: 'app-trade-series-select',
  templateUrl: '../../abstractions/series-select.html',
  styleUrls: ['../../abstractions/series-select.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [
    MatFormField,
    MatLabel,
    MatSelect,
    MatSelectTrigger,
    MatOption,
    SparklineComponent
  ]
})
export class TradeSeriesSelectComponent extends SeriesSelect implements OnInit {
  private tradeSeriesService = inject(TradeSeriesService);

  /** Specifies the sparkline fill color. */
  readonly color = input<string>();

  /** Specifies the label of the form field. */
  readonly label = input<string>();

  /** Event emitted when the selection has been changed. */
  readonly selectionChange = output<TradeSeries>();

  constructor() {
    super();
    effect(() => {
      this.setColor(this.color());
    });
    effect(() => {
      this.setLabel(this.label());
    });
    this.seriesArray = this.tradeSeriesService.get();
    this.selected = this.seriesArray[0];
  }

  ngOnInit(): void {
    this.selectionChange.emit(this.selected as TradeSeries);
    this.tradeSeriesService.getObservable().subscribe(ar => {
      this.seriesArray = ar;
      if (!ar.includes(this.selected)) {
        this.selected = ar[0];
      }
    });
  }

  protected changed(selection: Series): void {
    this.selectionChange.emit(selection as TradeSeries);
  }
}

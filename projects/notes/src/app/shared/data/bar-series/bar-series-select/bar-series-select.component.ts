import { Component, OnInit, output, inject, ChangeDetectionStrategy, input, effect } from '@angular/core';
import { MatFormField, MatLabel } from '@angular/material/form-field';
import { MatSelect, MatSelectTrigger } from '@angular/material/select';
import { MatOption } from '@angular/material/core';

import { SparklineComponent } from 'mb';

import { SeriesSelect } from '../../abstractions/series-select';
import { Series } from '../../series.interface';
import { BarSeries } from '../bar-series.interface';
import { BarSeriesService } from '../bar-series.service';

@Component({
  selector: 'app-bar-series-select',
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
export class BarSeriesSelectComponent extends SeriesSelect implements OnInit {
  private barSeriesService = inject(BarSeriesService);

  /** Specifies the sparkline fill color. */
  readonly color = input<string>();

  /** Specifies the label of the form field. */
  readonly label = input<string>();

  /** Event emitted when the selection has been changed. */
  readonly selectionChange = output<BarSeries>();

  constructor() {
    super();
    effect(() => {
      this.setColor(this.color());
    });
    effect(() => {
      this.setLabel(this.label());
    });
    this.seriesArray = this.barSeriesService.get();
    this.selected = this.seriesArray[0];
  }

  ngOnInit(): void {
    this.selectionChange.emit(this.selected as BarSeries);
    this.barSeriesService.getObservable().subscribe(ar => {
      this.seriesArray = ar;
      if (!ar.includes(this.selected)) {
        this.selected = ar[0];
      }
    });
  }

  protected changed(selection: Series): void {
    this.selectionChange.emit(selection as BarSeries);
  }
}

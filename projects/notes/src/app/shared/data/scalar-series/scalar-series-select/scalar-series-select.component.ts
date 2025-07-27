import { Component, OnInit, output, inject, ChangeDetectionStrategy, input, effect } from '@angular/core';
import { MatFormField, MatLabel } from '@angular/material/form-field';
import { MatSelect, MatSelectTrigger } from '@angular/material/select';
import { MatOption } from '@angular/material/core';

import { SparklineComponent } from 'mb';

import { SeriesSelect } from '../../abstractions/series-select';
import { Series } from '../../series.interface';
import { ScalarSeries } from '../scalar-series.interface';
import { ScalarSeriesService } from '../scalar-series.service';

@Component({
  selector: 'app-scalar-series-select',
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
export class ScalarSeriesSelectComponent extends SeriesSelect implements OnInit {
  private scalarSeriesService = inject(ScalarSeriesService);

  /** Specifies the label of the form field. */
  readonly label = input<string>();

  /** Event emitted when the selection has been changed. */
  readonly selectionChange = output<ScalarSeries>();

  constructor() {
    super();
    effect(() => {
      this.setLabel(this.label());
    });
    this.seriesArray = this.scalarSeriesService.get();
    this.selected = this.seriesArray[0];
  }

  ngOnInit(): void {
    this.selectionChange.emit(this.selected as ScalarSeries);
    this.scalarSeriesService.getObservable().subscribe(ar => {
      this.seriesArray = ar;
      if (!ar.includes(this.selected)) {
        this.selected = ar[0];
      }
    });
  }

  protected changed(selection: Series): void {
    this.selectionChange.emit(selection as ScalarSeries);
  }
}

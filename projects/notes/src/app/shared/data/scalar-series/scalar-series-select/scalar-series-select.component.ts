import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

import { SeriesSelect } from '../../abstractions/series-select';
import { Series } from '../../series.interface';
import { ScalarSeries } from '../scalar-series.interface';
import { ScalarSeriesService } from '../scalar-series.service';

@Component({
    selector: 'app-scalar-series-select',
    templateUrl: '../../abstractions/series-select.html',
    styleUrls: ['../../abstractions/series-select.scss'],
    standalone: false
})
export class ScalarSeriesSelectComponent extends SeriesSelect implements OnInit {
  /** Specifies the sparkline fill color. */
  @Input() set color(c: string) {
    this.setColor(c);
  }

  /** Specifies the label of the form field. */
  @Input() set label(text: string) {
    this.setLabel(text);
  }

  /** Event emitted when the selection has been changed. */
  @Output() selectionChange: EventEmitter<ScalarSeries> = new EventEmitter<ScalarSeries>();

  constructor(private scalarSeriesService: ScalarSeriesService) {
    super();
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

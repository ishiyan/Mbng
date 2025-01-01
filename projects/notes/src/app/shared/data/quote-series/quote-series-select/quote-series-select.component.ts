import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

import { SeriesSelect } from '../../abstractions/series-select';
import { Series } from '../../series.interface';
import { QuoteSeries } from '../quote-series.interface';
import { QuoteSeriesService } from '../quote-series.service';

@Component({
    selector: 'app-quote-series-select',
    templateUrl: '../../abstractions/series-select.html',
    styleUrls: ['../../abstractions/series-select.scss'],
    standalone: false
})
export class QuoteSeriesSelectComponent extends SeriesSelect implements OnInit {
  /** Specifies the sparkline fill color. */
  @Input() set color(c: string) {
    this.setColor(c);
  }

  /** Specifies the label of the form field. */
  @Input() set label(text: string) {
    this.setLabel(text);
  }

  /** Event emitted when the selection has been changed. */
  @Output() selectionChange: EventEmitter<QuoteSeries> = new EventEmitter<QuoteSeries>();

  constructor(private quoteSeriesService: QuoteSeriesService) {
    super();
    this.seriesArray = this.quoteSeriesService.get();
    this.selected = this.seriesArray[0];
  }

  ngOnInit(): void {
    this.selectionChange.emit(this.selected as QuoteSeries);
    this.quoteSeriesService.getObservable().subscribe(ar => {
      this.seriesArray = ar;
      if (!ar.includes(this.selected)) {
        this.selected = ar[0];
      }
    });
  }

  protected changed(selection: Series): void {
    this.selectionChange.emit(selection as QuoteSeries);
  }
}

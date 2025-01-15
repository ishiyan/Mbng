import { Component, OnInit } from '@angular/core';

import { QuoteSeriesService } from '../quote-series.service';
import { RemovableSeries } from '../../removable-series.interface';
import { NgFor } from '@angular/common';
import { SeriesCardComponent } from '../../series-card/series-card.component';
import { QuoteSeriesLoadComponent } from '../quote-series-load/quote-series-load.component';

@Component({
    selector: 'app-quote-series-list',
    templateUrl: './quote-series-list.component.html',
    styleUrls: ['./quote-series-list.component.scss'],
    imports: [NgFor, SeriesCardComponent, QuoteSeriesLoadComponent]
})
export class QuoteSeriesListComponent implements OnInit {
  protected seriesArray!: RemovableSeries[];

  constructor(private seriesService: QuoteSeriesService) {
    this.seriesArray = this.seriesService.get();
  }

  ngOnInit(): void {
    this.seriesService.getObservable().subscribe(x => (this.seriesArray = x as RemovableSeries[]));
  }

  protected removed(series: RemovableSeries): void {
    this.seriesService.remove(series);
  }
}

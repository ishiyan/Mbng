import { Component, OnInit } from '@angular/core';

import { QuoteSeriesService } from '../quote-series.service';
import { RemovableSeries } from '../../removable-series.interface';

@Component({
    selector: 'app-quote-series-list',
    templateUrl: './quote-series-list.component.html',
    styleUrls: ['./quote-series-list.component.scss'],
    standalone: false
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

import { Component, OnInit } from '@angular/core';

import { TradeSeriesService } from '../trade-series.service';
import { RemovableSeries } from '../../removable-series.interface';

@Component({
    selector: 'app-trade-series-list',
    templateUrl: './trade-series-list.component.html',
    styleUrls: ['./trade-series-list.component.scss'],
    standalone: false
})
export class TradeSeriesListComponent implements OnInit {
  protected seriesArray!: RemovableSeries[];

  constructor(private tradeSeriesService: TradeSeriesService) {
    this.seriesArray = this.tradeSeriesService.get();
  }

  ngOnInit(): void {
    this.tradeSeriesService.getObservable().subscribe(x => (this.seriesArray = x as RemovableSeries[]));
  }

  protected removed(series: RemovableSeries): void {
    this.tradeSeriesService.remove(series);
  }
}

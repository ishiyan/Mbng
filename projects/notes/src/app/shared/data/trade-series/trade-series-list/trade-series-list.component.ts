import { Component, OnInit } from '@angular/core';

import { TradeSeriesService } from '../trade-series.service';
import { RemovableSeries } from '../../removable-series.interface';
import { NgFor } from '@angular/common';
import { SeriesCardComponent } from '../../series-card/series-card.component';
import { TradeSeriesLoadComponent } from '../trade-series-load/trade-series-load.component';

@Component({
    selector: 'app-trade-series-list',
    templateUrl: './trade-series-list.component.html',
    styleUrls: ['./trade-series-list.component.scss'],
    imports: [NgFor, SeriesCardComponent, TradeSeriesLoadComponent]
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

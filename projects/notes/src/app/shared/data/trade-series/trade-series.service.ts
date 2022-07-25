import { Injectable } from '@angular/core';

import { tradeSeriesRdsaXamsAperiodic } from './trade-series-data/trade-series-rdsa-xams-aperiodic';
import { RemovableSeries } from '../removable-series.interface';
import { SeriesService } from '../abstractions/series.service';

@Injectable({
  providedIn: 'root'
})
export class TradeSeriesService extends SeriesService {
  protected seriesArray: RemovableSeries[] = [
    tradeSeriesRdsaXamsAperiodic
  ];
}

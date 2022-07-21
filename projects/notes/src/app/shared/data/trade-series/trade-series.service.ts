import { Injectable } from '@angular/core';

import { tradeSeriesRdsaXamsAperiodic } from './trade-series-data/trade-series-rdsa-xams-aperiodic';
import { tradeSeriesEsh22XcmeAperiodic } from './trade-series-data/trade-series-esh22-xcme-aperiodic';
import { RemovableSeries } from '../removable-series.interface';
import { SeriesService } from '../abstractions/series.service';

@Injectable({
  providedIn: 'root'
})
export class TradeSeriesService extends SeriesService {
  protected seriesArray: RemovableSeries[] = [
    tradeSeriesRdsaXamsAperiodic,
    tradeSeriesEsh22XcmeAperiodic
  ];
}

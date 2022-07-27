import { Injectable } from '@angular/core';

import { barSeriesTalib1d } from './bar-series-data/bar-series-talib-1d';
import { barSeriesRdsaXams1d } from './bar-series-data/bar-series-rdsa-xams-1d';
import { barSeriesRdsaXams1m } from './bar-series-data/bar-series-rdsa-xams-1m';
import { RemovableSeries } from '../removable-series.interface';
import { SeriesService } from '../abstractions/series.service';

@Injectable({
  providedIn: 'root'
})
export class BarSeriesService extends SeriesService {
  protected seriesArray: RemovableSeries[] = [
    barSeriesTalib1d,
    barSeriesRdsaXams1d,
    barSeriesRdsaXams1m
  ];
}

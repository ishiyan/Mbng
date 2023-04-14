import { Injectable } from '@angular/core';

import { barSeriesRcoXpar1dSmall }
  from './bar-series-data/bar-series-rco-xpar-1d-small';
import { barSeriesMbwsXpar1dSmall }
  from './bar-series-data/bar-series-mbws-xpar-1d-small';
import { barSeriesOrXpar1d } from './bar-series-data/bar-series-or-xpar-1d';
import { barSeriesCdiXpar1d } from './bar-series-data/bar-series-cdi-xpar-1d';
import { barSeriesRdsaXams1d } from './bar-series-data/bar-series-rdsa-xams-1d';
import { barSeriesRdsaXams1m } from './bar-series-data/bar-series-rdsa-xams-1m';
import { RemovableSeries } from '../removable-series.interface';
import { SeriesService } from '../abstractions/series.service';

@Injectable({
  providedIn: 'root'
})
export class BarSeriesService extends SeriesService {
  protected seriesArray: RemovableSeries[] = [
    barSeriesRcoXpar1dSmall,
    barSeriesMbwsXpar1dSmall,
    barSeriesOrXpar1d,
    barSeriesCdiXpar1d,
    barSeriesRdsaXams1d,
    barSeriesRdsaXams1m
  ];
}

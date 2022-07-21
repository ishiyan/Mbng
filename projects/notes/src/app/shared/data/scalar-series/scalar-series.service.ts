import { Injectable } from '@angular/core';

import { scalarSeriesEonia1d } from './scalar-series-data/scalar-series-eonia-1d';
import { scalarSeriesSescSsn1d } from './scalar-series-data/scalar-series-sesc-ssn-1d';
import { RemovableSeries } from '../removable-series.interface';
import { SeriesService } from '../abstractions/series.service';

@Injectable({
  providedIn: 'root'
})
export class ScalarSeriesService extends SeriesService {
  protected seriesArray: RemovableSeries[] = [
    scalarSeriesEonia1d,
    scalarSeriesSescSsn1d
  ];
}

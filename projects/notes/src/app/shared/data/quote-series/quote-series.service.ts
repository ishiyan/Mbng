import { Injectable } from '@angular/core';

import { quoteSeriesSp500Aperiodic } from './quote-series-data/quote-series-sp500-aperiodic';
import { RemovableSeries } from '../removable-series.interface';
import { SeriesService } from '../abstractions/series.service';

@Injectable({
  providedIn: 'root'
})
export class QuoteSeriesService extends SeriesService {
  protected seriesArray: RemovableSeries[] = [
    quoteSeriesSp500Aperiodic
  ];

  constructor() {
    super();
    // Initialize the signal after construction
    this.initializeSignal();
  }
}

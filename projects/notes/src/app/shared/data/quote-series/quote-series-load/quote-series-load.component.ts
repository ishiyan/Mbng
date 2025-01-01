import { Component } from '@angular/core';

import { Quote } from 'mb';
import { TimeGranularity } from 'mb';
import { TemporalEntity } from 'mb';

import { Series } from '../../series.interface';
import { SeriesLoad } from '../../abstractions/series-load';
import { QuoteSeriesService } from '../quote-series.service';

@Component({
    selector: 'app-quote-series-load',
    templateUrl: '../../abstractions/series-load.html',
    styleUrls: ['../../abstractions/series-load.scss'],
    standalone: false
})
export class QuoteSeriesLoadComponent extends SeriesLoad {

  constructor(private quoteSeriesService: QuoteSeriesService) {
    super();
  }

  protected entity = 'quotes';
  protected minParts = 3;

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  protected determineGranularity(data: TemporalEntity[]): TimeGranularity {
    return TimeGranularity.Aperiodic;
  }

  protected addSeries(s: Series): void {
    this.quoteSeriesService.add(s);
  }

  protected parseEntity(time: Date, splitted: string[]): TemporalEntity | string {
    const quote = new Quote();
    quote.time = time;

    quote.askPrice = +splitted[1];
    if (isNaN(quote.askPrice)) {
      return `invalid ask prise '${splitted[1]}'`;
    }

    quote.bidPrice = +splitted[2];
    if (isNaN(quote.bidPrice)) {
      return `invalid bid prise '${splitted[1]}'`;
    }

    if (splitted.length > this.minParts) {
      quote.askSize = +splitted[this.minParts];
      if (isNaN(quote.askSize)) {
        return `invalid ask size '${splitted[1]}'`;
      }
    } else {
      quote.askSize = 0;
    }

    if (splitted.length > this.minParts + 1) {
      quote.bidSize = +splitted[this.minParts + 1];
      if (isNaN(quote.bidSize)) {
        return `invalid bid size '${splitted[1]}'`;
      }
    } else {
      quote.bidSize = 0;
    }

    return quote;
  }
}

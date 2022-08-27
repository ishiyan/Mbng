import { Component } from '@angular/core';

import { Trade } from 'projects/mb/src/lib/data/entities/trade';
import { TimeGranularity } from 'projects/mb/src/lib/trading/time/time-granularity.enum';
import { TemporalEntity } from 'projects/mb/src/lib/data/entities/temporal-entity.type';

import { Series } from '../../series.interface';
import { SeriesLoad } from '../../abstractions/series-load';
import { TradeSeriesService } from '../trade-series.service';

@Component({
  selector: 'app-trade-series-load',
  templateUrl: '../../abstractions/series-load.html',
  styleUrls: ['../../abstractions/series-load.scss']
})
export class TradeSeriesLoadComponent extends SeriesLoad {

  constructor(private tradeSeriesService: TradeSeriesService) {
    super();
  }

  protected entity = 'trades';
  protected minParts = 2;

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  protected determineGranularity(data: TemporalEntity[]): TimeGranularity {
    return TimeGranularity.Aperiodic;
  }

  protected addSeries(s: Series): void {
    this.tradeSeriesService.add(s);
  }

  protected parseEntity(time: Date, splitted: string[]): TemporalEntity | string {
    const trade = new Trade();
    trade.time = time;
    trade.price = +splitted[1];
    if (isNaN(trade.price)) {
      return `invalid price '${splitted[1]}'`;
    }

    if (splitted.length > this.minParts) {
      trade.volume = +splitted[this.minParts];
      if (isNaN(trade.volume)) {
        return `invalid volume '${splitted[1]}'`;
      }
    } else {
      trade.volume = 0;
    }

    return trade;
  }
}

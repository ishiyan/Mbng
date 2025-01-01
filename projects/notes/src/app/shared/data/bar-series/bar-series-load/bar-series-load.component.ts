import { Component } from '@angular/core';

import { Bar } from 'mb';
import { TimeGranularity } from 'mb';
import { TemporalEntity } from 'mb';

import { determineTimeGranularity } from '../../determine-time-granularity';
import { Series } from '../../series.interface';
import { SeriesLoad } from '../../abstractions/series-load';
import { BarSeriesService } from '../bar-series.service';

@Component({
    selector: 'app-bar-series-load',
    templateUrl: '../../abstractions/series-load.html',
    styleUrls: ['../../abstractions/series-load.scss'],
    standalone: false
})
export class BarSeriesLoadComponent extends SeriesLoad {

  constructor(private barSeriesService: BarSeriesService) {
    super();
  }

  protected entity = 'bars';
  protected minParts = 5;

  protected determineGranularity(data: TemporalEntity[]): TimeGranularity {
    return determineTimeGranularity(data[0].time, data[1].time);
  }

  protected addSeries(s: Series): void {
    this.barSeriesService.add(s);
  }

  protected parseEntity(time: Date, splitted: string[]): TemporalEntity | string {
    const bar = new Bar();
    bar.time = time;

    bar.open = +splitted[1];
    if (isNaN(bar.open)) {
      return `invalid open '${splitted[1]}'`;
    }

    bar.high = +splitted[2];
    if (isNaN(bar.high)) {
      return `invalid high '${splitted[1]}'`;
    }

    bar.low = +splitted[3];
    if (isNaN(bar.low)) {
      return `invalid low '${splitted[1]}'`;
    }

    bar.close = +splitted[4];
    if (isNaN(bar.close)) {
      return `invalid close '${splitted[1]}'`;
    }

    if (splitted.length > this.minParts) {
      bar.volume = +splitted[this.minParts];
      if (isNaN(bar.volume)) {
        return `invalid volume '${splitted[1]}'`;
      }
    } else {
      bar.volume = 0;
    }

    if (bar.high < bar.low || bar.high < bar.open || bar.high < bar.close) {
      return 'high is not the highest value';
    }

    if (bar.low > bar.high || bar.low > bar.open || bar.low > bar.close) {
      return 'low is not the lowest value';
    }

    return bar;
  }
}

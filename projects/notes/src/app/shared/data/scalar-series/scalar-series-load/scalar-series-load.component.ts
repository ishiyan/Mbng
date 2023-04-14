import { Component } from '@angular/core';

import { Scalar } from 'mb';
import { TimeGranularity } from 'mb';
import { TemporalEntity } from 'mb';

import { determineTimeGranularity } from '../../determine-time-granularity';
import { Series } from '../../series.interface';
import { SeriesLoad } from '../../abstractions/series-load';
import { ScalarSeriesService } from '../scalar-series.service';

@Component({
  selector: 'app-scalar-series-load',
  templateUrl: '../../abstractions/series-load.html',
  styleUrls: ['../../abstractions/series-load.scss']
})
export class ScalarSeriesLoadComponent extends SeriesLoad {

  constructor(private scalarSeriesService: ScalarSeriesService) {
    super();
  }

  protected entity = 'scalars';
  protected minParts = 2;

  protected determineGranularity(data: TemporalEntity[]): TimeGranularity {
    return determineTimeGranularity(data[0].time, data[1].time);
  }

  protected addSeries(s: Series): void {
    this.scalarSeriesService.add(s);
  }

  protected parseEntity(time: Date, splitted: string[]): TemporalEntity | string {
    const scalar = new Scalar();
    scalar.time = time;

    scalar.value = +splitted[1];
    if (isNaN(scalar.value)) {
      return `invalid value '${splitted[1]}'`;
    }

    return scalar;
  }
}

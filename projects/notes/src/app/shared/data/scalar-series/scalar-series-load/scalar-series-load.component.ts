import { Component } from '@angular/core';

import { Scalar, MultilineComponent } from 'mb';
import { TimeGranularity } from 'mb';
import { TemporalEntity } from 'mb';

import { determineTimeGranularity } from '../../determine-time-granularity';
import { Series } from '../../series.interface';
import { SeriesLoad } from '../../abstractions/series-load';
import { ScalarSeriesService } from '../scalar-series.service';
import { MatMiniFabButton, MatButton } from '@angular/material/button';
import { MatIcon } from '@angular/material/icon';
import { NgIf, DatePipe } from '@angular/common';
import { MatProgressBar } from '@angular/material/progress-bar';
import { MatFormField } from '@angular/material/form-field';
import { MatInput } from '@angular/material/input';
import { FormsModule } from '@angular/forms';
import { FilesizePipe } from '../../filesize/filesize.pipe';

@Component({
    selector: 'app-scalar-series-load',
    templateUrl: '../../abstractions/series-load.html',
    styleUrls: ['../../abstractions/series-load.scss'],
    imports: [MatMiniFabButton, MatIcon, NgIf, MatProgressBar, MatButton, MultilineComponent, MatFormField, MatInput, FormsModule, DatePipe, FilesizePipe]
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

import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { DatePipe } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MatFormField } from '@angular/material/form-field';
import { MatInput } from '@angular/material/input';
import { MatIcon } from '@angular/material/icon';
import { MatMiniFabButton, MatButton } from '@angular/material/button';
import { MatProgressBar } from '@angular/material/progress-bar';

import { Bar, MultilineComponent } from 'mb';
import { TimeGranularity } from 'mb';
import { TemporalEntity } from 'mb';

import { determineTimeGranularity } from '../../determine-time-granularity';
import { Series } from '../../series.interface';
import { SeriesLoad } from '../../abstractions/series-load';
import { BarSeriesService } from '../bar-series.service';
import { FilesizePipe } from '../../filesize/filesize.pipe';

@Component({
  selector: 'app-bar-series-load',
  templateUrl: '../../abstractions/series-load.html',
  styleUrls: ['../../abstractions/series-load.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [
    DatePipe,
    FormsModule,
    MatFormField,
    MatInput,
    MatIcon,
    MatButton,
    MatMiniFabButton,
    MatProgressBar,
    MultilineComponent,
    FilesizePipe
  ]
})
export class BarSeriesLoadComponent extends SeriesLoad {
  private barSeriesService = inject(BarSeriesService);

  constructor() {
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

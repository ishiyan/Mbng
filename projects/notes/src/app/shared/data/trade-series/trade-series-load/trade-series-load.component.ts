import { Component } from '@angular/core';

import { Trade, MultilineComponent } from 'mb';
import { TimeGranularity } from 'mb';
import { TemporalEntity } from 'mb';

import { Series } from '../../series.interface';
import { SeriesLoad } from '../../abstractions/series-load';
import { TradeSeriesService } from '../trade-series.service';
import { MatMiniFabButton, MatButton } from '@angular/material/button';
import { MatIcon } from '@angular/material/icon';
import { NgIf, DatePipe } from '@angular/common';
import { MatProgressBar } from '@angular/material/progress-bar';
import { MatFormField } from '@angular/material/form-field';
import { MatInput } from '@angular/material/input';
import { FormsModule } from '@angular/forms';
import { FilesizePipe } from '../../filesize/filesize.pipe';

@Component({
    selector: 'app-trade-series-load',
    templateUrl: '../../abstractions/series-load.html',
    styleUrls: ['../../abstractions/series-load.scss'],
    imports: [MatMiniFabButton, MatIcon, NgIf, MatProgressBar, MatButton, MultilineComponent, MatFormField, MatInput, FormsModule, DatePipe, FilesizePipe]
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

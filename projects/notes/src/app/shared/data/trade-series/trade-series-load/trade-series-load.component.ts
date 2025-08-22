import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { DatePipe } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MatFormField, MatLabel } from '@angular/material/form-field';
import { MatInput } from '@angular/material/input';
import { MatIcon } from '@angular/material/icon';
import { MatMiniFabButton, MatButton } from '@angular/material/button';
import { MatProgressBar } from '@angular/material/progress-bar';

import { Trade, MultilineComponent } from 'mb';
import { TimeGranularity } from 'mb';
import { TemporalEntity } from 'mb';

import { Series } from '../../series.interface';
import { SeriesLoad } from '../../abstractions/series-load';
import { TradeSeriesService } from '../trade-series.service';
import { FilesizePipe } from '../../filesize/filesize.pipe';

@Component({
  selector: 'app-trade-series-load',
  templateUrl: '../../abstractions/series-load.html',
  styleUrls: ['../../abstractions/series-load.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [
    DatePipe,
    FormsModule,
    MatFormField,
    MatLabel,
    MatInput,
    MatIcon,
    MatButton,
    MatMiniFabButton,
    MatProgressBar,
    MultilineComponent,
    FilesizePipe
  ]
})
export class TradeSeriesLoadComponent extends SeriesLoad {
  private tradeSeriesService = inject(TradeSeriesService);

  constructor() {
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

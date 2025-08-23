import { ChangeDetectionStrategy, Component, computed, inject } from '@angular/core';

import { TradeSeriesService } from '../trade-series.service';
import { RemovableSeries } from '../../removable-series.interface';

import { SeriesCardComponent } from '../../series-card/series-card.component';
import { TradeSeriesLoadComponent } from '../trade-series-load/trade-series-load.component';

@Component({
  selector: 'app-trade-series-list',
  templateUrl: './trade-series-list.component.html',
  styleUrls: ['./trade-series-list.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [SeriesCardComponent, TradeSeriesLoadComponent]
})
export class TradeSeriesListComponent {
  private seriesService = inject(TradeSeriesService);

  protected readonly seriesArray = computed(() => 
    this.seriesService.series() as RemovableSeries[]
  );

  protected removed(series: RemovableSeries): void {
    this.seriesService.remove(series);
  }
}

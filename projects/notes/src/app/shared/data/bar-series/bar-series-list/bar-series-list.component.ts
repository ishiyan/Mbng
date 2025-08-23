import { ChangeDetectionStrategy, Component, computed, inject } from '@angular/core';

import { BarSeriesService } from '../bar-series.service';
import { RemovableSeries } from '../../removable-series.interface';

import { SeriesCardComponent } from '../../series-card/series-card.component';
import { BarSeriesLoadComponent } from '../bar-series-load/bar-series-load.component';

@Component({
  selector: 'app-bar-series-list',
  templateUrl: './bar-series-list.component.html',
  styleUrls: ['./bar-series-list.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [SeriesCardComponent, BarSeriesLoadComponent]
})
export class BarSeriesListComponent {
  private seriesService = inject(BarSeriesService);

  protected readonly seriesArray = computed(() => 
    this.seriesService.series() as RemovableSeries[]
  );

  protected removed(series: RemovableSeries): void {
    this.seriesService.remove(series);
  }
}

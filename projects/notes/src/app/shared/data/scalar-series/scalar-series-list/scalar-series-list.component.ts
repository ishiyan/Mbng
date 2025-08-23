import { ChangeDetectionStrategy, Component, computed, inject } from '@angular/core';

import { ScalarSeriesService } from '../scalar-series.service';
import { RemovableSeries } from '../../removable-series.interface';

import { SeriesCardComponent } from '../../series-card/series-card.component';
import { ScalarSeriesLoadComponent } from '../scalar-series-load/scalar-series-load.component';

@Component({
  selector: 'app-scalar-series-list',
  templateUrl: './scalar-series-list.component.html',
  styleUrls: ['./scalar-series-list.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [SeriesCardComponent, ScalarSeriesLoadComponent]
})
export class ScalarSeriesListComponent {
  private seriesService = inject(ScalarSeriesService);

  protected readonly seriesArray = computed(() => 
    this.seriesService.series() as RemovableSeries[]
  );

  protected removed(series: RemovableSeries): void {
    this.seriesService.remove(series);
  }
}

import { ChangeDetectionStrategy, Component, computed, inject } from '@angular/core';

import { QuoteSeriesService } from '../quote-series.service';
import { RemovableSeries } from '../../removable-series.interface';

import { SeriesCardComponent } from '../../series-card/series-card.component';
import { QuoteSeriesLoadComponent } from '../quote-series-load/quote-series-load.component';

@Component({
  selector: 'app-quote-series-list',
  templateUrl: './quote-series-list.component.html',
  styleUrls: ['./quote-series-list.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [SeriesCardComponent, QuoteSeriesLoadComponent]
})
export class QuoteSeriesListComponent {
  private seriesService = inject(QuoteSeriesService);

  protected readonly seriesArray = computed(() => 
    this.seriesService.series() as RemovableSeries[]
  );

  protected removed(series: RemovableSeries): void {
    this.seriesService.remove(series);
  }
}

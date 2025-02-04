import { ChangeDetectionStrategy, Component, OnInit, inject } from '@angular/core';

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
export class QuoteSeriesListComponent implements OnInit {
  private seriesService = inject(QuoteSeriesService);

  protected seriesArray: RemovableSeries[] = this.seriesService.get();

  /* constructor() {
    this.seriesArray = this.seriesService.get();
  } */

  ngOnInit(): void {
    this.seriesService.getObservable().subscribe(x => (this.seriesArray = x as RemovableSeries[]));
  }

  protected removed(series: RemovableSeries): void {
    this.seriesService.remove(series);
  }
}

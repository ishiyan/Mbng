import { ChangeDetectionStrategy, Component, OnInit, inject } from '@angular/core';

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
export class ScalarSeriesListComponent implements OnInit {
  private seriesService = inject(ScalarSeriesService);

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

import { ChangeDetectionStrategy, Component, OnInit, inject } from '@angular/core';

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
export class BarSeriesListComponent implements OnInit {
  private seriesService = inject(BarSeriesService);

  protected seriesArray: RemovableSeries[] = this.seriesService.get();

  ngOnInit(): void {
    this.seriesService.getObservable().subscribe(x => (this.seriesArray = x as RemovableSeries[]));
  }

  protected removed(series: RemovableSeries): void {
    this.seriesService.remove(series);
  }
}

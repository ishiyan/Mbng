import { Component, OnInit } from '@angular/core';

import { ScalarSeriesService } from '../scalar-series.service';
import { RemovableSeries } from '../../removable-series.interface';
import { NgFor } from '@angular/common';
import { SeriesCardComponent } from '../../series-card/series-card.component';
import { ScalarSeriesLoadComponent } from '../scalar-series-load/scalar-series-load.component';

@Component({
    selector: 'app-scalar-series-list',
    templateUrl: './scalar-series-list.component.html',
    styleUrls: ['./scalar-series-list.component.scss'],
    imports: [NgFor, SeriesCardComponent, ScalarSeriesLoadComponent]
})
export class ScalarSeriesListComponent implements OnInit {
  protected seriesArray!: RemovableSeries[];

  constructor(private seriesService: ScalarSeriesService) {
    this.seriesArray = this.seriesService.get();
  }

  ngOnInit(): void {
    this.seriesService.getObservable().subscribe(x => (this.seriesArray = x as RemovableSeries[]));
  }

  protected removed(series: RemovableSeries): void {
    this.seriesService.remove(series);
  }
}

import { Component, OnInit } from '@angular/core';

import { RemovableBarSeries } from '../removable-bar-series.interface';
import { BarSeriesService } from '../bar-series.service';

@Component({
  selector: 'app-bar-series-list',
  templateUrl: './bar-series-list.component.html',
  styleUrls: ['./bar-series-list.component.scss']
})
export class BarSeriesListComponent implements OnInit {
  protected seriesArray: RemovableBarSeries[] = [];

  constructor(private barSeriesService: BarSeriesService) {
    this.seriesArray = this.barSeriesService.get();
  }

  ngOnInit(): void {
    this.barSeriesService.getObservable().subscribe(x => (this.seriesArray = x as RemovableBarSeries[]));
  }

  protected removed(series: RemovableBarSeries): void {
    this.barSeriesService.remove(series);
  }
}

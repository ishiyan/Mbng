import { Component, OnInit } from '@angular/core';

import { BarSeriesService } from '../bar-series.service';
import { RemovableSeries } from '../../removable-series.interface';

@Component({
  selector: 'app-bar-series-list',
  templateUrl: './bar-series-list.component.html',
  styleUrls: ['./bar-series-list.component.scss']
})
export class BarSeriesListComponent implements OnInit {
  protected seriesArray!: RemovableSeries[];

  constructor(private seriesService: BarSeriesService) {
    this.seriesArray = this.seriesService.get();
  }

  ngOnInit(): void {
    this.seriesService.getObservable().subscribe(x => (this.seriesArray = x as RemovableSeries[]));
  }

  protected removed(series: RemovableSeries): void {
    this.seriesService.remove(series);
  }
}

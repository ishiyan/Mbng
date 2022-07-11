import { Component, Input } from '@angular/core';

import { BarSeries } from '../bar-series.interface';
import { barSeriesTalib1d } from '../bar-series-data/bar-series-talib-1d';
import { barSeriesRdsaXams1d } from '../bar-series-data/bar-series-rdsa-xams-1d';

interface RemovableBarSeries {
  removable: boolean;
  data: BarSeries;
}

@Component({
  selector: 'app-bar-series-list',
  templateUrl: './bar-series-list.component.html',
  styleUrls: ['./bar-series-list.component.scss']
})
export class BarSeriesListComponent {
  readonly seriesList: RemovableBarSeries[] = [
    {data: barSeriesTalib1d, removable: false},
    {data: barSeriesRdsaXams1d, removable: true},
  ];

  add() {    
  }

  removed(series: BarSeries) {
    const i = this.seriesIndex(series);
    if (i >= 0 && this.seriesList[i].removable) {
      this.seriesList.splice(i, 1);
    }
  }

  private seriesIndex(series: BarSeries): number {
    for (let i = 0; i < this.seriesList.length; i++) {
      const el = this.seriesList[i];
      if (el.data == series) {
        return i;
      }
    }

    return -1;
  }
}

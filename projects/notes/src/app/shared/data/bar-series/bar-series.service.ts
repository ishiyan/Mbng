import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';

import { BarSeries } from './bar-series.interface';
import { RemovableBarSeries } from './removable-bar-series.interface';
import { barSeriesTalib1d } from './bar-series-data/bar-series-talib-1d';
import { barSeriesRdsaXams1d } from './bar-series-data/bar-series-rdsa-xams-1d';

@Injectable({
  providedIn: 'root'
})
export class BarSeriesService {

  // Initially contains predefined unremovable bar series.
  private seriesArray: RemovableBarSeries[] = [
    barSeriesTalib1d,
    barSeriesRdsaXams1d
  ];

  private seriesArrayUpdated = new Subject<BarSeries[]>();

  public get(): BarSeries[] {
    return [...this.seriesArray];
  }

  public getObservable(): Observable<BarSeries[]> {
    return this.seriesArrayUpdated.asObservable();
  }

  public add(series: BarSeries) {
    const r: RemovableBarSeries = series as RemovableBarSeries;
    r.removable = true;
    this.seriesArray.push(r);
    this.seriesArrayUpdated.next([...this.seriesArray]);
  }

  public remove(series: BarSeries) {
    const r: RemovableBarSeries = series as RemovableBarSeries;
    const i = this.seriesIndex(r);
    if (i >= 0 && r.removable) {
      this.seriesArray.splice(i, 1);
      this.seriesArrayUpdated.next([...this.seriesArray]);
    }
  }

  private seriesIndex(series: RemovableBarSeries): number {
    for (let i = 0; i < this.seriesArray.length; i++) {
      const el = this.seriesArray[i];
      if (el === series) {
        return i;
      }
    }

    return -1;
  }
}

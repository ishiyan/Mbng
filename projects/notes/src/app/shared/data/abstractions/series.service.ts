import { Observable, Subject } from 'rxjs';

import { RemovableSeries } from '../removable-series.interface';
import { Series } from '../series.interface';

/** An abstract series service. */
export abstract class SeriesService {

  // Initially contains predefined unremovable series.
  protected abstract seriesArray: RemovableSeries[];

  private seriesArrayUpdated = new Subject<Series[]>();

  public get(): Series[] {
    return [...this.seriesArray];
  }

  public getObservable(): Observable<Series[]> {
    return this.seriesArrayUpdated.asObservable();
  }

  public add(series: Series) {
    const r: RemovableSeries = series as RemovableSeries;
    r.removable = true;
    this.seriesArray.push(r);
    this.seriesArrayUpdated.next([...this.seriesArray]);
  }

  public remove(series: Series) {
    const r: RemovableSeries = series as RemovableSeries;
    const i = this.seriesIndex(r);
    if (i >= 0 && r.removable) {
      this.seriesArray.splice(i, 1);
      this.seriesArrayUpdated.next([...this.seriesArray]);
    }
  }

  private seriesIndex(series: RemovableSeries): number {
    for (let i = 0; i < this.seriesArray.length; i++) {
      const el = this.seriesArray[i];
      if (el === series) {
        return i;
      }
    }

    return -1;
  }
}

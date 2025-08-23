import { computed, signal } from '@angular/core';

import { RemovableSeries } from '../removable-series.interface';
import { Series } from '../series.interface';

/** An abstract series service. */
export abstract class SeriesService {
  // Initially contains predefined unremovable series.
  protected abstract seriesArray: RemovableSeries[];

  private readonly seriesSignal = signal<Series[]>([]);

  // Simple computed signal - no side effects
  public readonly series = computed(() => {
    const current = this.seriesSignal();
    // If signal is empty, return the seriesArray directly
    if (current.length === 0 && this.seriesArray.length > 0) {
      return [...this.seriesArray];
    }
    return current;
  });

  // Initialization method for derived classes to call
  protected initializeSignal(): void {
    if (this.seriesSignal().length === 0 && this.seriesArray.length > 0) {
      this.seriesSignal.set([...this.seriesArray]);
    }
  }

  public get(): Series[] {
    return [...this.seriesArray];
  }

  public add(series: Series) {
    const r: RemovableSeries = series as RemovableSeries;
    r.removable = true;
    this.seriesArray.push(r);
    this.seriesSignal.set([...this.seriesArray]);
  }

  public remove(series: Series) {
    const r: RemovableSeries = series as RemovableSeries;
    const i = this.seriesIndex(r);
    if (i >= 0 && r.removable) {
      this.seriesArray.splice(i, 1);
      this.seriesSignal.set([...this.seriesArray]);
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
import { Component, output, inject, ChangeDetectionStrategy, input, effect, computed, signal } from '@angular/core';
import { MatFormField, MatLabel } from '@angular/material/form-field';
import { MatSelect, MatSelectTrigger } from '@angular/material/select';
import { MatOption } from '@angular/material/core';

import { SparklineComponent } from 'mb';

import { SeriesSelect } from '../../abstractions/series-select';
import { Series } from '../../series.interface';
import { BarSeries } from '../bar-series.interface';
import { BarSeriesService } from '../bar-series.service';

@Component({
  selector: 'app-bar-series-select',
  templateUrl: '../../abstractions/series-select.html',
  styleUrls: ['../../abstractions/series-select.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [
    MatFormField,
    MatLabel,
    MatSelect,
    MatSelectTrigger,
    MatOption,
    SparklineComponent
  ]
})
export class BarSeriesSelectComponent extends SeriesSelect {
  private barSeriesService = inject(BarSeriesService);

  /** Specifies the label of the form field. */
  readonly label = input<string>();

  /** Event emitted when the selection has been changed. */
  readonly selectionChange = output<BarSeries>();

  // Use signals for reactive state
  private readonly selectedSignal = signal<Series | null>(null);
  
  // Computed series array from service
  protected readonly seriesArray = computed(() => this.barSeriesService.series());
  
  // Computed selected series with fallback
  protected readonly selected = computed(() => {
    const current = this.selectedSignal();
    const available = this.seriesArray();
    
    // If current selection is still available, use it
    if (current && available.includes(current)) {
      return current;
    }
    
    // Otherwise, select first available series
    return available.length > 0 ? available[0] : null;
  });

  constructor() {
    super();
    
    // Handle label changes
    effect(() => {
      this.setLabel(this.label());
    });
    
    // Initialize with first series
    effect(() => {
      const series = this.seriesArray();
      if (series.length > 0 && !this.selectedSignal()) {
        this.selectedSignal.set(series[0]);
      }
    });
    
    // Emit selection changes
    effect(() => {
      const selected = this.selected();
      if (selected) {
        this.selectionChange.emit(selected as BarSeries);
      }
    });
  }

  protected changed(selection: Series): void {
    this.selectedSignal.set(selection);
    this.selectionChange.emit(selection as BarSeries);
  }
}
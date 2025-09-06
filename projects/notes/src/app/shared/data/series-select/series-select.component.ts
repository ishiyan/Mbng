import { Component, output, inject, ChangeDetectionStrategy, input, effect, computed, signal } from '@angular/core';
import { MatFormField, MatLabel } from '@angular/material/form-field';
import { MatSelect, MatSelectTrigger } from '@angular/material/select';
import { MatOptgroup, MatOption } from '@angular/material/core';

import { SparklineComponent } from 'mb';

import { BarSeriesService } from '../bar-series/bar-series.service';
import { ScalarSeriesService } from '../scalar-series/scalar-series.service';
import { TradeSeriesService } from '../trade-series/trade-series.service';
import { QuoteSeriesService } from '../quote-series/quote-series.service';
import { Series } from '../series.interface';

@Component({
  selector: 'app-series-select',
  templateUrl: './series-select.component.html',
  styleUrls: ['./series-select.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [
    MatFormField,
    MatLabel,
    MatSelect,
    MatSelectTrigger,
    MatOption,
    MatOptgroup,
    SparklineComponent
  ]
})
export class SeriesSelectComponent {
  private barSeriesService = inject(BarSeriesService);
  private scalarSeriesService = inject(ScalarSeriesService);
  private tradeSeriesService = inject(TradeSeriesService);
  private quoteSeriesService = inject(QuoteSeriesService);

  protected readonly barSeriesArray = computed(() => this.barSeriesService.series());
  protected readonly scalarSeriesArray = computed(() => this.scalarSeriesService.series());
  protected readonly tradeSeriesArray = computed(() => this.tradeSeriesService.series());
  protected readonly quoteSeriesArray = computed(() => this.quoteSeriesService.series());

  // Computed all series array
  protected readonly allSeriesArray = computed(() => [
    ...this.barSeriesArray(),
    ...this.scalarSeriesArray(),
    ...this.tradeSeriesArray(),
    ...this.quoteSeriesArray()
  ]);

  // Signal for current selection
  private readonly selectedSignal = signal<Series | null>(null);

  // Computed selected with fallback to first available series
  protected readonly selected = computed(() => {
    const current = this.selectedSignal();
    const available = this.allSeriesArray();
    
    // If current selection is still available, use it
    if (current && available.includes(current)) {
      return current;
    }
    
    // Otherwise, select first available series
    return available.length > 0 ? available[0] : null;
  });

  protected labelText = '';

  /** Specifies the label of the form field. */
  readonly label = input<string>();

  /** Event emitted when the selection has been changed. */
  readonly selectionChange = output<Series>();

  constructor() {
    // Handle label changes
    effect(() => {
      const text = this.label();
      if (text && text != null) {
        this.labelText = text;
      }
    });

    // Initialize with first available series
    effect(() => {
      const available = this.allSeriesArray();
      if (available.length > 0 && !this.selectedSignal()) {
        this.selectedSignal.set(available[0]);
      }
    });

    // Handle selection changes and validate current selection
    effect(() => {
      const available = this.allSeriesArray();
      const current = this.selectedSignal();
      
      // If current selection is no longer available, select first available
      if (current && !available.includes(current) && available.length > 0) {
        this.selectedSignal.set(available[0]);
      }
    });

    // Emit selection changes
    effect(() => {
      const selected = this.selected();
      if (selected) {
        this.selectionChange.emit(selected);
      }
    });
  }

  protected changed(selection: Series): void {
    this.selectedSignal.set(selection);
    this.selectionChange.emit(selection);
  }
}

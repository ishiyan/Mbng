import { computed, inject } from '@angular/core';

import { DynamicColorService, SparklineConfiguration } from 'mb';

import { Series } from '../series.interface';

export abstract class SeriesSelect {
  private dcs = inject(DynamicColorService);

  protected abstract changed(selection: Series): void;

  protected seriesArray!: Series[];
  protected selected!: Series;
  protected labelText = '';

  protected readonly configFill = computed((): SparklineConfiguration => ({
    fillColor: this.dcs.primaryColor(),
    strokeColor: undefined,
    strokeWidth: 1
  }));

  protected setLabel(text: string | undefined) {
    if (text && text != null) {
      this.labelText = text;
    }
  }
}

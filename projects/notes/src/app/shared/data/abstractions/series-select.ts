import { SparklineConfiguration } from 'mb';

import { DynamicColorService } from '../../../dynamic-color.service';
import { Series } from '../series.interface';
import { computed, inject } from '@angular/core';

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

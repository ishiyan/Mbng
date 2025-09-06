import { Signal } from '@angular/core';

import { Series } from '../series.interface';

export abstract class SeriesSelect {
  protected abstract changed(selection: Series): void;
  protected abstract readonly seriesArray: Signal<Series[]>;
  protected abstract readonly selected: Signal<Series | null>;

  protected labelText = '';
  
  protected setLabel(text: string | undefined) {
    if (text && text != null) {
      this.labelText = text;
    }
  }
}

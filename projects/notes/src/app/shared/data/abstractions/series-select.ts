import { SparklineConfiguration } from 'mb';

import { primaryColor } from '../../theme-colors';
import { Series } from '../series.interface';

export abstract class SeriesSelect {

  protected abstract changed(selection: Series): void;

  protected seriesArray!: Series[];
  protected selected!: Series;
  protected labelText = '';
  protected configFill: SparklineConfiguration = {
    fillColor: primaryColor, strokeColor: undefined, strokeWidth: 1
  };

  protected setColor(c: string | undefined) {
    if (c && c != null && c.length > 0) {
      this.configFill.fillColor = c;
      this.configFill = { ...this.configFill };
    }
  }

  protected setLabel(text: string | undefined) {
    if (text && text != null) {
      this.labelText = text;
    }
  }
}

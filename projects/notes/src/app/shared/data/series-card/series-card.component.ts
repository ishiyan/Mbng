import { ChangeDetectionStrategy, Component, EventEmitter, Input, Output } from '@angular/core';

import { SparklineConfiguration } from 'mb';
import { LineConfiguration } from 'mb';

import { Series } from '../series.interface';
import { primaryColor } from '../../theme-colors';

@Component({
  selector: 'app-series-card',
  templateUrl: './series-card.component.html',
  styleUrls: ['./series-card.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class SeriesCardComponent {
  /** Specifies the scalar series. */
  @Input() series!: Series;

  /** Specifies if the series can be removed. */
  @Input() removable!: boolean;

  /** Event emitted when the series has been removed by the user. */
  @Output() readonly removed: EventEmitter<Series> = new EventEmitter<Series>();

  protected readonly configSparkline: SparklineConfiguration = {
    fillColor: primaryColor, strokeColor: undefined, strokeWidth: 1
  };

  protected readonly configMultiline: LineConfiguration = {
    fillColor: undefined, strokeColor: primaryColor, strokeWidth: 1
  };

  protected remove(): void {
    this.removed.emit(this.series);
  }
}

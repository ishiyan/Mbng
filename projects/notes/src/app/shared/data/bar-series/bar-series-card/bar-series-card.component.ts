import { Component, EventEmitter, Input, Output } from '@angular/core';

import { SparklineConfiguration } from 'projects/mb/src/lib/charts/sparkline/sparkline-configuration.interface';

import { BarSeries } from '../bar-series.interface';

// Since we use hardcoded palette, here is the hadcoded primary color:
// https://material.io/resources/color/#!/?view.left=0&view.right=0&primary.color=009688
const primaryColor = '#009688';

@Component({
  selector: 'app-bar-series-card',
  templateUrl: './bar-series-card.component.html',
  styleUrls: ['./bar-series-card.component.scss']
})
export class BarSeriesCardComponent {
  /** Specifies the bar series. */
  @Input() series!: BarSeries;

  /** Specifies if the bar series can be removed. */
  @Input() removable!: boolean;

  /** Event emitted when the bar series has been removed by the user. */
  @Output() readonly removed: EventEmitter<BarSeries> = new EventEmitter<BarSeries>();

  readonly configSparkline: SparklineConfiguration = { fillColor: primaryColor, strokeColor: undefined, strokeWidth: 1 };
  readonly configMultiline: SparklineConfiguration = { fillColor: undefined, strokeColor: primaryColor, strokeWidth: 1 };

  removeSeries() {
    this.removed.emit(this.series);
  }
}

import { Component } from '@angular/core';

import { BarSeries } from '../../../shared/data/bar-series/bar-series.interface';
import {weightedMovingAverage, simpleMovingAverage} from '../../../notes';

@Component({
  selector: 'app-ind-wma',
  templateUrl: './wma.component.html',
  styleUrls: ['./wma.component.scss']
})
export class WmaComponent {
  protected dataSelection!: BarSeries;
  protected wma = weightedMovingAverage;
  protected sma = simpleMovingAverage;

  protected dataSelectionChanged(barSeries: BarSeries) {
    this.dataSelection = barSeries;
  }
}

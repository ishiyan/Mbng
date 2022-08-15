import { Component } from '@angular/core';

import { BarSeries } from '../../../shared/data/bar-series/bar-series.interface';
import { simpleMovingAverage } from '../../../notes'

@Component({
  selector: 'app-ind-sma',
  templateUrl: './sma.component.html',
  styleUrls: ['./sma.component.scss']
})
export class SmaComponent {
  protected sma = simpleMovingAverage;
  protected dataSelection!: BarSeries;

  protected dataSelectionChanged(barSeries: BarSeries) {
    this.dataSelection = barSeries;
  }
}

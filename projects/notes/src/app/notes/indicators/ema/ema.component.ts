import { Component } from '@angular/core';

import { BarSeries } from '../../../shared/data/bar-series/bar-series.interface';
import { exponentialMovingAverage } from '../../../notes'

@Component({
  selector: 'app-ind-ema',
  templateUrl: './ema.component.html',
  styleUrls: ['./ema.component.scss']
})
export class EmaComponent {
  protected ema = exponentialMovingAverage;
  protected dataSelection!: BarSeries;

  protected dataSelectionChanged(barSeries: BarSeries) {
    this.dataSelection = barSeries;
  }
}

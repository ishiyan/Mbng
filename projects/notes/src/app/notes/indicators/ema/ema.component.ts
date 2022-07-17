import { Component } from '@angular/core';

import { BarSeries } from '../../../shared/data/bar-series/bar-series.interface';

@Component({
  selector: 'app-ind-ema',
  templateUrl: './ema.component.html',
  styleUrls: ['./ema.component.scss']
})
export class EmaComponent {

  protected dataSelection!: BarSeries;

  protected dataSelectionChanged(barSeries: BarSeries) {
    this.dataSelection = barSeries;
  }
}

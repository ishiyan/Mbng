import { Component } from '@angular/core';

import { BarSeries } from '../../../shared/data/bar-series/bar-series.interface';

@Component({
  selector: 'app-ind-wma',
  templateUrl: './wma.component.html',
  styleUrls: ['./wma.component.scss']
})
export class WmaComponent {
  protected dataSelection!: BarSeries;

  protected dataSelectionChanged(barSeries: BarSeries) {
    this.dataSelection = barSeries;
  }
}

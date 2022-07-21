import { Component } from '@angular/core';

import { BarSeries } from '../../../shared/data/bar-series/bar-series.interface';
import { ScalarSeries } from '../../../shared/data/scalar-series/scalar-series.interface';
import { TradeSeries } from '../../../shared/data/trade-series/trade-series.interface';
import { QuoteSeries } from '../../../shared/data/quote-series/quote-series.interface';

@Component({
  selector: 'app-data-linear-charting',
  templateUrl: './linear-charting.component.html',
  styleUrls: ['./linear-charting.component.scss']
})
export class LinearChartingComponent {

  protected dataSelection!: BarSeries | ScalarSeries | TradeSeries | QuoteSeries;

  protected dataSelectionChanged(barSeries: BarSeries | ScalarSeries | TradeSeries | QuoteSeries) {
    this.dataSelection = barSeries;
  }
}

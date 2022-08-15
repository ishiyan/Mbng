import { Component } from '@angular/core';

import { BarSeries } from '../../../shared/data/bar-series/bar-series.interface';
import { ScalarSeries } from '../../../shared/data/scalar-series/scalar-series.interface';
import { TradeSeries } from '../../../shared/data/trade-series/trade-series.interface';
import { QuoteSeries } from '../../../shared/data/quote-series/quote-series.interface';
import { Series } from '../../../shared/data/series.interface';
import { visualisingFinancialDataWithLinearChart } from '../../../notes'

@Component({
  selector: 'app-data-linear-charting',
  templateUrl: './linear-charting.component.html',
  styleUrls: ['./linear-charting.component.scss']
})
export class LinearChartingComponent {
  protected lc = visualisingFinancialDataWithLinearChart; 

  protected seriesSelection!: Series;
  protected barSeriesSelection!: BarSeries;
  protected scalarSeriesSelection!: ScalarSeries;
  protected tradeSeriesSelection!: TradeSeries;
  protected quoteSeriesSelection!: QuoteSeries;

  protected seriesSelectionChanged(series: Series) {
    this.seriesSelection = series;
  }

  protected barSeriesSelectionChanged(barSeries: BarSeries) {
    this.barSeriesSelection = barSeries;
  }

  protected scalarSeriesSelectionChanged(scalarSeries: ScalarSeries) {
    this.scalarSeriesSelection = scalarSeries;
  }

  protected tradeSeriesSelectionChanged(tradeSeries: TradeSeries) {
    this.tradeSeriesSelection = tradeSeries;
  }

  protected quoteSeriesSelectionChanged(quoteSeries: QuoteSeries) {
    this.quoteSeriesSelection = quoteSeries;
  }
}

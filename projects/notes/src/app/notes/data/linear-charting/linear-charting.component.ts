import { Component, ChangeDetectionStrategy } from '@angular/core';
import { MatButton } from '@angular/material/button';

import { LinearChartModule } from 'mb';

import { BarSeries } from '../../../shared/data/bar-series/bar-series.interface';
import { ScalarSeries } from '../../../shared/data/scalar-series/scalar-series.interface';
import { TradeSeries } from '../../../shared/data/trade-series/trade-series.interface';
import { QuoteSeries } from '../../../shared/data/quote-series/quote-series.interface';
import { Series } from '../../../shared/data/series.interface';
import { visualisingFinancialDataWithLinearChartNote } from '../../../notes';
import { SeriesSelectComponent } from '../../../shared/data/series-select/series-select.component';
import { BarSeriesSelectComponent } from '../../../shared/data/bar-series/bar-series-select/bar-series-select.component';
import { ScalarSeriesSelectComponent } from '../../../shared/data/scalar-series/scalar-series-select/scalar-series-select.component';
import { TradeSeriesSelectComponent } from '../../../shared/data/trade-series/trade-series-select/trade-series-select.component';
import { QuoteSeriesSelectComponent } from '../../../shared/data/quote-series/quote-series-select/quote-series-select.component';

@Component({
    selector: 'app-data-linear-charting',
    templateUrl: './linear-charting.component.html',
    styleUrls: ['./linear-charting.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush,
    imports: [
      MatButton,
      LinearChartModule,
      SeriesSelectComponent,
      BarSeriesSelectComponent,
      ScalarSeriesSelectComponent,
      TradeSeriesSelectComponent,
      QuoteSeriesSelectComponent,
    ]
})
export class LinearChartingComponent {
  protected lcNote = visualisingFinancialDataWithLinearChartNote;

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

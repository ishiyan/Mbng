import { Component, ChangeDetectionStrategy, signal, inject, effect } from '@angular/core';

import { LinearChartComponent } from 'mb';

import { BarSeries } from '../../../shared/data/bar-series/bar-series.interface';
import { ScalarSeries } from '../../../shared/data/scalar-series/scalar-series.interface';
import { TradeSeries } from '../../../shared/data/trade-series/trade-series.interface';
import { QuoteSeries } from '../../../shared/data/quote-series/quote-series.interface';
import { Series } from '../../../shared/data/series.interface';
import { SeriesSelectComponent } from '../../../shared/data/series-select/series-select.component';
import { BarSeriesSelectComponent } from '../../../shared/data/bar-series/bar-series-select/bar-series-select.component';
import { ScalarSeriesSelectComponent } from '../../../shared/data/scalar-series/scalar-series-select/scalar-series-select.component';
import { TradeSeriesSelectComponent } from '../../../shared/data/trade-series/trade-series-select/trade-series-select.component';
import { QuoteSeriesSelectComponent } from '../../../shared/data/quote-series/quote-series-select/quote-series-select.component';
import { BarSeriesService } from '../../../shared/data/bar-series/bar-series.service';
import { ScalarSeriesService } from '../../../shared/data/scalar-series/scalar-series.service';
import { TradeSeriesService } from '../../../shared/data/trade-series/trade-series.service';
import { QuoteSeriesService } from '../../../shared/data/quote-series/quote-series.service';
import { visualisingFinancialDataWithLinearChartNote } from '../../../notes';

@Component({
    selector: 'app-data-linear-charting',
    templateUrl: './linear-charting.component.html',
    styleUrls: ['./linear-charting.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush,
    imports: [
      LinearChartComponent,
      SeriesSelectComponent,
      BarSeriesSelectComponent,
      ScalarSeriesSelectComponent,
      TradeSeriesSelectComponent,
      QuoteSeriesSelectComponent
    ]
})
export class LinearChartingComponent {
  private readonly barSeriesService = inject(BarSeriesService);
  private readonly scalarSeriesService = inject(ScalarSeriesService);
  private readonly tradeSeriesService = inject(TradeSeriesService);
  private readonly quoteSeriesService = inject(QuoteSeriesService);

  protected readonly seriesSelection = signal<Series>([
    ...this.barSeriesService.series(),
    ...this.scalarSeriesService.series(),
    ...this.tradeSeriesService.series(),
    ...this.quoteSeriesService.series()
  ][0]);
  protected readonly barSeriesSelection = signal<BarSeries>(this.barSeriesService.series()[0] as BarSeries);
  protected readonly scalarSeriesSelection = signal<ScalarSeries>(this.scalarSeriesService.series()[0] as ScalarSeries);
  protected readonly tradeSeriesSelection = signal<TradeSeries>(this.tradeSeriesService.series()[0] as TradeSeries);
  protected readonly quoteSeriesSelection = signal<QuoteSeries>(this.quoteSeriesService.series()[0] as QuoteSeries);

  protected readonly lcNote = visualisingFinancialDataWithLinearChartNote;

  protected seriesSelectionChanged(series: Series) {
    this.seriesSelection.set(series);
  }

  protected barSeriesSelectionChanged(barSeries: BarSeries) {
    this.barSeriesSelection.set(barSeries);
  }

  protected scalarSeriesSelectionChanged(scalarSeries: ScalarSeries) {
    this.scalarSeriesSelection.set(scalarSeries);
  }

  protected tradeSeriesSelectionChanged(tradeSeries: TradeSeries) {
    this.tradeSeriesSelection.set(tradeSeries);
  }

  protected quoteSeriesSelectionChanged(quoteSeries: QuoteSeries) {
    this.quoteSeriesSelection.set(quoteSeries);
  }
}

import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FlexLayoutModule } from '@angular/flex-layout';
import { MatButtonModule } from '@angular/material/button';

import { LinearChartModule } from 'mb';

import { BarSeriesSelectModule } from '../../../shared/data/bar-series/bar-series-select/bar-series-select.module';
import { ScalarSeriesSelectModule } from '../../../shared/data/scalar-series/scalar-series-select/scalar-series-select.module';
import { TradeSeriesSelectModule } from '../../../shared/data/trade-series/trade-series-select/trade-series-select.module';
import { QuoteSeriesSelectModule } from '../../../shared/data/quote-series/quote-series-select/quote-series-select.module';
import { SeriesSelectModule } from '../../../shared/data/series-select/series-select.module';
import { LinearChartingComponent } from './linear-charting.component';
import { LinearChartingRoutingModule } from './linear-charting-routing.module';

@NgModule({
  imports: [
    CommonModule,
    FlexLayoutModule,
    MatButtonModule,
    LinearChartModule,
    BarSeriesSelectModule,
    ScalarSeriesSelectModule,
    TradeSeriesSelectModule,
    QuoteSeriesSelectModule,
    SeriesSelectModule,
    LinearChartingRoutingModule
  ],
  declarations: [
    LinearChartingComponent
  ]
})
export class LinearChartingModule { }

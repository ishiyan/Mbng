import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatTabsModule } from '@angular/material/tabs';

import { BarSeriesListModule } from '../bar-series/bar-series-list/bar-series-list.module';
import { ScalarSeriesListModule } from '../scalar-series/scalar-series-list/scalar-series-list.module';
import { TradeSeriesListModule } from '../trade-series/trade-series-list/trade-series-list.module';
import { QuoteSeriesListModule } from '../quote-series/quote-series-list/quote-series-list.module';
import { SeriesListComponent } from './series-list.component';

@NgModule({
  imports: [
    CommonModule,
    MatTabsModule,
    BarSeriesListModule,
    ScalarSeriesListModule,
    TradeSeriesListModule,
    QuoteSeriesListModule
  ],
  exports: [SeriesListComponent],
  declarations: [SeriesListComponent]
})
export class SeriesListModule { }

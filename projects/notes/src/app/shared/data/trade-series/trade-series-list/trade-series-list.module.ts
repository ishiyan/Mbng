import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SeriesCardModule } from '../../series-card/series-card.module';
import { TradeSeriesLoadModule } from '../trade-series-load/trade-series-load.module';
import { TradeSeriesListComponent } from './trade-series-list.component';

@NgModule({
  imports: [
    CommonModule,
    SeriesCardModule,
    TradeSeriesLoadModule
  ],
  exports: [TradeSeriesListComponent],
  declarations: [TradeSeriesListComponent]
})
export class TradeSeriesListModule { }

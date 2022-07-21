import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SeriesCardModule } from '../../series-card/series-card.module';
import { QuoteSeriesLoadModule } from '../quote-series-load/quote-series-load.module';
import { QuoteSeriesListComponent } from './quote-series-list.component';

@NgModule({
  imports: [
    CommonModule,
    SeriesCardModule,
    QuoteSeriesLoadModule
  ],
  exports: [QuoteSeriesListComponent],
  declarations: [QuoteSeriesListComponent]
})
export class QuoteSeriesListModule { }

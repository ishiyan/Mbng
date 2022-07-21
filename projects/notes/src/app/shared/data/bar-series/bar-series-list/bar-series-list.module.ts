import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SeriesCardModule } from '../../series-card/series-card.module';
import { BarSeriesLoadModule } from '../bar-series-load/bar-series-load.module';
import { BarSeriesListComponent } from './bar-series-list.component';

@NgModule({
  imports: [
    CommonModule,
    SeriesCardModule,
    BarSeriesLoadModule
  ],
  exports: [BarSeriesListComponent],
  declarations: [BarSeriesListComponent]
})
export class BarSeriesListModule { }

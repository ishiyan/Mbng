import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SeriesCardModule } from '../../series-card/series-card.module';
import { ScalarSeriesLoadModule } from '../scalar-series-load/scalar-series-load.module';
import { ScalarSeriesListComponent } from './scalar-series-list.component';

@NgModule({
  imports: [
    CommonModule,
    SeriesCardModule,
    ScalarSeriesLoadModule
  ],
  exports: [ScalarSeriesListComponent],
  declarations: [ScalarSeriesListComponent]
})
export class ScalarSeriesListModule { }

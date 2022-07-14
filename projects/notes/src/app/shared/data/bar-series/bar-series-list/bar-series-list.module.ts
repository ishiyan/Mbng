import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MaterialModule } from 'projects/mb/src/lib/material/material.module';

import { BarSeriesCardModule } from '../bar-series-card/bar-series-card.module';
import { BarSeriesLoadModule } from '../bar-series-load/bar-series-load.module';
import { BarSeriesListComponent } from './bar-series-list.component';

@NgModule({
  imports: [
    CommonModule, MaterialModule, BarSeriesCardModule, BarSeriesLoadModule
  ],
  exports: [BarSeriesListComponent],
  declarations: [BarSeriesListComponent]
})
export class BarSeriesListModule { }

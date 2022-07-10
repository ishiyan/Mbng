import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FlexLayoutModule } from '@angular/flex-layout';

import { MaterialModule } from 'projects/mb/src/lib/material/material.module';
import { SparklineModule } from 'projects/mb/src/lib/charts/sparkline/sparkline.module';
import { MultilineModule } from 'projects/mb/src/lib/charts/multiline/multiline.module';


import { BarSeriesCardComponent } from './bar-series-card.component';

@NgModule({
  imports: [
    CommonModule,
    FlexLayoutModule,
    MaterialModule,
    SparklineModule,
    MultilineModule
  ],
  exports: [BarSeriesCardComponent],
  declarations: [BarSeriesCardComponent]
})
export class BarSeriesCardModule { }

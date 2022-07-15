import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { FlexLayoutModule } from '@angular/flex-layout';

import { MaterialModule } from 'projects/mb/src/lib/material/material.module';
import { KatexModule } from 'projects/mb/src/lib/katex/katex.module';
import { ChartsModule } from 'projects/mb/src/lib/charts/charts.module';
import { ColorsModule } from 'projects/mb/src/lib/colors/colors.module';

import { BarSeriesSelectModule } from '../../../shared/data/bar-series/bar-series-select/bar-series-select.module';
import { EmaComponent } from './ema.component';
import { EmaRoutingModule } from './ema-routing.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    FlexLayoutModule,
    MaterialModule,
    KatexModule,
    ChartsModule,
    ColorsModule,
    BarSeriesSelectModule,
    EmaRoutingModule
  ],
  declarations: [
    EmaComponent
  ]
})
export class EmaModule { }

import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FlexLayoutModule } from '@angular/flex-layout';
import { MatButtonModule } from '@angular/material/button';

import { KatexModule } from 'projects/mb/src/lib/katex/katex.module';
import { SvgViewerModule } from 'projects/mb/src/lib/svg-viewer/svg-viewer.module';
import { LinearChartModule } from 'projects/mb/src/lib/charts/linear-chart/linear-chart.module';

import { BarSeriesSelectModule } from '../../../shared/data/bar-series/bar-series-select/bar-series-select.module';
import { EmaComponent } from './ema.component';
import { EmaRoutingModule } from './ema-routing.module';

@NgModule({
  imports: [
    CommonModule,
    FlexLayoutModule,
    MatButtonModule,
    KatexModule,
    SvgViewerModule,
    LinearChartModule,
    BarSeriesSelectModule,
    EmaRoutingModule
  ],
  declarations: [EmaComponent]
})
export class EmaModule { }

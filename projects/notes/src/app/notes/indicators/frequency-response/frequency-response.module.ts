import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FlexLayoutModule } from '@angular/flex-layout';

import { KatexModule } from 'projects/mb/src/lib/katex/katex.module';
import { SvgViewerModule } from 'projects/mb/src/lib/svg-viewer/svg-viewer.module';
import { FrequencyResponseChartModule } from 'projects/mb/src/lib/charts/frequency-response-chart/frequency-response-chart.module';

import { ScrollerModule } from '../../../shared/scroller/scroller.module';
import { FrequencyResponseComponent } from './frequency-response.component';
import { FrequencyResponseRoutingModule } from './frequency-response-routing.module';

@NgModule({
  imports: [
    CommonModule,
    FlexLayoutModule,
    KatexModule,
    SvgViewerModule,
    FrequencyResponseChartModule,
    ScrollerModule,
    FrequencyResponseRoutingModule
  ],
  declarations: [FrequencyResponseComponent]
})
export class FrequencyResponseModule { }

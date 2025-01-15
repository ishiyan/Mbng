import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { FlexLayoutModule } from '@angular/flex-layout';


import { OhlcvChartSelectorModule } from 'projects/mb/src/lib/charts/ohlcv-chart/selector/ohlcv-chart-selector.module';

import { SampleOhlcvChartSelector1Component } from './sample-1/sample-ohlcv-chart-selector-1.component';
import { SampleOhlcvChartSelector2Component } from './sample-2/sample-ohlcv-chart-selector-2.component';
import { SampleOhlcvChartSelector3Component } from './sample-3/sample-ohlcv-chart-selector-3.component';
import { SampleOhlcvChartSelector4Component } from './sample-4/sample-ohlcv-chart-selector-4.component';
import { SampleOhlcvChartSelector5Component } from './sample-5/sample-ohlcv-chart-selector-5.component';
import { SampleOhlcvChartSelector6Component } from './sample-6/sample-ohlcv-chart-selector-6.component';

import { SampleOhlcvChartSelectorRoutingModule } from './sample-ohlcv-chart-selector-routing.module';

@NgModule({
    imports: [
    CommonModule,
    FormsModule,
    FlexLayoutModule,
    OhlcvChartSelectorModule,
    SampleOhlcvChartSelectorRoutingModule,
    SampleOhlcvChartSelector1Component,
    SampleOhlcvChartSelector2Component,
    SampleOhlcvChartSelector3Component,
    SampleOhlcvChartSelector4Component,
    SampleOhlcvChartSelector5Component,
    SampleOhlcvChartSelector6Component
]
})
export class SampleOhlcvChartSelectorModule { }

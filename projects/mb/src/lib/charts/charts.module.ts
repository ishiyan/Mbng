import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { HistoricalDataChartModule } from './historical-data-chart/historical-data-chart.module';

@NgModule({
    imports: [
    CommonModule,
    HistoricalDataChartModule
],
    exports: [
    HistoricalDataChartModule
],
    declarations: [
    ],
    providers: [
    ]
})
export class ChartsModule { }

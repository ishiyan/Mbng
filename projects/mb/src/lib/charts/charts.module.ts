import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

//import { FrequencyResponseChartModule } from './frequency-response-chart/frequency-response-chart.module';
import { HistoricalDataChartModule } from './historical-data-chart/historical-data-chart.module';
import { LinearChartModule } from './linear-chart/linear-chart.module';
import { OhlcvChartModule } from './ohlcv-chart/ohlcv-chart.module';










@NgModule({
    imports: [
    CommonModule,
    //FrequencyResponseChartModule,
    HistoricalDataChartModule,
    LinearChartModule,
    OhlcvChartModule
],
    exports: [
    //FrequencyResponseChartModule,
    HistoricalDataChartModule,
    LinearChartModule,
    OhlcvChartModule
],
    declarations: [
    ],
    providers: [
    ]
})
export class ChartsModule { }

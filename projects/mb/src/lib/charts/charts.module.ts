import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { FrequencyResponseChartModule } from './frequency-response-chart/frequency-response-chart.module';
import { HistoricalDataChartModule } from './historical-data-chart/historical-data-chart.module';
import { LinearChartModule } from './linear-chart/linear-chart.module';
import { OhlcvChartModule } from './ohlcv-chart/ohlcv-chart.module';
import { SparklineModule } from './sparkline/sparkline.module';
import { MultilineModule } from './multiline/multiline.module';
import { StacklineModule } from './stackline/stackline.module';

import { SunburstModule } from './hierarchy-tree/sunburst/sunburst.module';
import { CirclepackModule } from './hierarchy-tree/circlepack/circlepack.module';
import { IcicleModule } from './hierarchy-tree/icicle/icicle.module';
import { TreemapModule } from './hierarchy-tree/treemap/treemap.module';
import { VoronoiModule } from './hierarchy-tree/voronoi/voronoi.module';

@NgModule({
    imports: [
        CommonModule,
        FrequencyResponseChartModule,
        HistoricalDataChartModule,
        LinearChartModule,
        OhlcvChartModule,
        SparklineModule,
        MultilineModule,
        StacklineModule,
        SunburstModule,
        CirclepackModule,
        IcicleModule,
        TreemapModule,
        VoronoiModule
    ],
    exports: [
        FrequencyResponseChartModule,
        HistoricalDataChartModule,
        LinearChartModule,
        OhlcvChartModule,
        SparklineModule,
        MultilineModule,
        StacklineModule,
        SunburstModule,
        CirclepackModule,
        IcicleModule,
        TreemapModule,
        VoronoiModule
    ],
    declarations: [
    ],
    providers: [
    ]
})
export class ChartsModule { }

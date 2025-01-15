import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { FlexLayoutModule } from '@angular/flex-layout';




import { D3RoutingModule } from './d3-routing.module';
import { Sample1Component } from './d3-samples/sample-1/sample-1.component';
import { Sample2Component } from './d3-samples/sample-2/sample-2.component';
import { D3Component } from './d3.component';
import { BarchartComponent } from './d3-samples/sample-1/barchart/barchart.component';
import { BrushHandlesComponent } from './d3-samples/sample-2/brush-handles/brush-handles.component';
import { BrushHandles2Component } from './d3-samples/sample-2/brush-handles-2/brush-handles-2.component';
import { ClickToRecenterBrushComponent } from './d3-samples/sample-2/click-to-recenter-brush/click-to-recenter-brush.component';
import { ClickToRecenterBrush2Component } from './d3-samples/sample-2/click-to-recenter-brush-2/click-to-recenter-brush-2.component';
import { ClickToSelectAllComponent } from './d3-samples/sample-2/click-to-select-all/click-to-select-all.component';
import { Sample3Component } from './d3-samples/sample-3/sample-3.component';
import { BrushAndZoomAreaChartComponent } from './d3-samples/sample-3/brush-and-zoom-area-chart/brush-and-zoom-area-chart.component';
import { Sample4Component } from './d3-samples/sample-4/sample-4.component';
import { D3tcArrowComponent } from './d3-samples/sample-4/d3tc-arrow/d3tc-arrow.component';
import { D3tcFinanceTimeComponent } from './d3-samples/sample-4/d3tc-finance-time/d3tc-finance-time.component';
import { D3tcCandlesticksComponent } from './d3-samples/sample-4/d3tc-candlesticks/d3tc-candlesticks.component';
import { D3tcOhlcComponent } from './d3-samples/sample-4/d3tc-ohlc/d3tc-ohlc.component';
import { D3tcCloseComponent } from './d3-samples/sample-4/d3tc-close/d3tc-close.component';
import { D3tcVolumeComponent } from './d3-samples/sample-4/d3tc-volume/d3tc-volume.component';
import { D3tcBrushComponent } from './d3-samples/sample-4/d3tc-brush/d3tc-brush.component';
import { D3tcAxisAnnotationsComponent } from './d3-samples/sample-4/d3tc-axis-annotations/d3tc-axis-annotations.component';
import { D3tcCrosshairComponent } from './d3-samples/sample-4/d3tc-crosshair/d3tc-crosshair.component';
import { D3tcSupportResistanceComponent } from './d3-samples/sample-4/d3tc-support-resistance/d3tc-support-resistance.component';
import { D3tcTrendlinesComponent } from './d3-samples/sample-4/d3tc-trendlines/d3tc-trendlines.component';
import { D3tcZoomingComponent } from './d3-samples/sample-4/d3tc-zooming/d3tc-zooming.component';
import { D3tcFeedComponent } from './d3-samples/sample-4/d3tc-feed/d3tc-feed.component';
import { D3tcTradeArrowsComponent } from './d3-samples/sample-4/d3tc-trade-arrows/d3tc-trade-arrows.component';
import { D3tcMultipleSmallPlotsComponent } from './d3-samples/sample-4/d3tc-multiple-small-plots/d3tc-multiple-small-plots.component';
import { Sample5Component } from './d3-samples/sample-5/sample-5.component';
import { HilbertCurveComponent } from './d3-samples/sample-5/hilbert-curve/hilbert-curve.component';
import { HilbertPathsComponent } from './d3-samples/sample-5/hilbert-paths/hilbert-paths.component';
import { HilbertStocksComponent } from './d3-samples/sample-5/hilbert-stocks/hilbert-stocks.component';
import { Sample6Component } from './d3-samples/sample-6/sample-6.component';
import { Sample7Component } from './d3-samples/sample-7/sample-7.component';
import {
  D3tcHorizonChartInteractiveComponent
} from './d3-samples/sample-7/d3tc-horizon-chart-interactive/d3tc-horizon-chart-interactive.component';
import { D3tcHorizonChartBandsComponent } from './d3-samples/sample-7/d3tc-horizon-chart-bands/d3tc-horizon-chart-bands.component';
import { D3tcHorizonChartSingleComponent } from './d3-samples/sample-7/d3tc-horizon-chart-single/d3tc-horizon-chart-single.component';
import { Sample8Component } from './d3-samples/sample-8/sample-8.component';
import { RealTimeChartComponent } from './d3-samples/sample-8/real-time-chart/real-time-chart.component';

@NgModule({
    imports: [
    CommonModule, FormsModule, FlexLayoutModule,
    D3RoutingModule,
    D3Component, Sample1Component, Sample2Component, BarchartComponent, BrushHandlesComponent, BrushHandles2Component,
    ClickToRecenterBrushComponent, ClickToRecenterBrush2Component, ClickToSelectAllComponent, Sample3Component,
    BrushAndZoomAreaChartComponent,
    Sample4Component, D3tcArrowComponent, D3tcFinanceTimeComponent, D3tcCandlesticksComponent, D3tcOhlcComponent,
    D3tcCloseComponent, D3tcVolumeComponent, D3tcBrushComponent, D3tcAxisAnnotationsComponent, D3tcCrosshairComponent,
    D3tcSupportResistanceComponent, D3tcTrendlinesComponent, D3tcZoomingComponent, D3tcFeedComponent,
    D3tcTradeArrowsComponent, D3tcMultipleSmallPlotsComponent, Sample5Component, HilbertCurveComponent, HilbertPathsComponent,
    HilbertStocksComponent, Sample6Component,
    Sample7Component, D3tcHorizonChartInteractiveComponent, D3tcHorizonChartBandsComponent, D3tcHorizonChartSingleComponent,
    Sample8Component, RealTimeChartComponent
]
})
export class D3Module { }

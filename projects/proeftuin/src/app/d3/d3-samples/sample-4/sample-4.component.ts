import { Component } from '@angular/core';
import { D3tcFeedComponent } from './d3tc-feed/d3tc-feed.component';
import { D3tcCandlesticksComponent } from './d3tc-candlesticks/d3tc-candlesticks.component';
import { D3tcOhlcComponent } from './d3tc-ohlc/d3tc-ohlc.component';
import { D3tcCloseComponent } from './d3tc-close/d3tc-close.component';
import { D3tcVolumeComponent } from './d3tc-volume/d3tc-volume.component';
import { D3tcAxisAnnotationsComponent } from './d3tc-axis-annotations/d3tc-axis-annotations.component';
import { D3tcCrosshairComponent } from './d3tc-crosshair/d3tc-crosshair.component';
import { D3tcBrushComponent } from './d3tc-brush/d3tc-brush.component';
import { D3tcTrendlinesComponent } from './d3tc-trendlines/d3tc-trendlines.component';
import { D3tcSupportResistanceComponent } from './d3tc-support-resistance/d3tc-support-resistance.component';
import { D3tcZoomingComponent } from './d3tc-zooming/d3tc-zooming.component';
import { D3tcMultipleSmallPlotsComponent } from './d3tc-multiple-small-plots/d3tc-multiple-small-plots.component';
import { D3tcTradeArrowsComponent } from './d3tc-trade-arrows/d3tc-trade-arrows.component';
import { D3tcArrowComponent } from './d3tc-arrow/d3tc-arrow.component';
import { D3tcFinanceTimeComponent } from './d3tc-finance-time/d3tc-finance-time.component';

@Component({
    selector: 'app-d3-sample-4',
    templateUrl: './sample-4.component.html',
    styleUrls: ['./sample-4.component.scss'],
    imports: [D3tcFeedComponent, D3tcCandlesticksComponent, D3tcOhlcComponent, D3tcCloseComponent, D3tcVolumeComponent, D3tcAxisAnnotationsComponent, D3tcCrosshairComponent, D3tcBrushComponent, D3tcTrendlinesComponent, D3tcSupportResistanceComponent, D3tcZoomingComponent, D3tcMultipleSmallPlotsComponent, D3tcTradeArrowsComponent, D3tcArrowComponent, D3tcFinanceTimeComponent]
})
export class Sample4Component { }

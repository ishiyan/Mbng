import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { MatGridListModule } from '@angular/material/grid-list';

import { KatexModule } from 'projects/mb/src/lib/katex/katex.module';
import { SvgViewerModule } from 'projects/mb/src/lib/svg-viewer/svg-viewer.module';
import { LinearChartModule } from 'projects/mb/src/lib/charts/linear-chart/linear-chart.module';
import { OhlcvChartModule } from 'projects/mb/src/lib/charts/ohlcv-chart/ohlcv-chart.module';
import { ColorsModule } from 'projects/mb/src/lib/colors/colors.module';
import { SimpleMovingAverageModule } from 'projects/mb/src/lib/trading/indicators/simple-moving-average/simple-moving-average.module';
import { OhlcvChartSelectorModule } from 'projects/mb/src/lib/charts/ohlcv-chart/selector/ohlcv-chart-selector.module';
import { FrequencyResponseChartModule } from 'projects/mb/src/lib/charts/frequency-response-chart/frequency-response-chart.module';

import { BarSeriesSelectModule } from '../../../shared/data/bar-series/bar-series-select/bar-series-select.module';
import { SmaComponent } from './sma.component';
import { SmaParamsComponent } from './sma-params.component';
import { SmaListComponent } from './sma-list.component';
import { SmaRoutingModule } from './sma-routing.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatIconModule,
    MatExpansionModule,
    MatSlideToggleModule,
    MatGridListModule,
    KatexModule,
    SvgViewerModule,
    LinearChartModule,
    OhlcvChartModule,
    ColorsModule,
    SimpleMovingAverageModule,
    OhlcvChartSelectorModule,
    BarSeriesSelectModule,
    FrequencyResponseChartModule,
    SmaRoutingModule
  ],
  declarations: [SmaComponent, SmaParamsComponent, SmaListComponent]
})
export class SmaModule { }

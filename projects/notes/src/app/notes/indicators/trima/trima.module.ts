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

// eslint-disable-next-line max-len
import { TriangularMovingAverageModule } from 'projects/mb/src/lib/trading/indicators/triangular-moving-average/triangular-moving-average.module';
import { OhlcvChartSelectorModule } from 'projects/mb/src/lib/charts/ohlcv-chart/selector/ohlcv-chart-selector.module';
import { FrequencyResponseChartModule } from 'projects/mb/src/lib/charts/frequency-response-chart/frequency-response-chart.module';

import { BarSeriesSelectModule } from '../../../shared/data/bar-series/bar-series-select/bar-series-select.module';
import { TrimaComponent } from './trima.component';
import { TrimaParamsComponent } from './trima-params.component';
import { TrimaListComponent } from './trima-list.component';
import { TrimaRoutingModule } from './trima-routing.module';

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
    TriangularMovingAverageModule,
    OhlcvChartSelectorModule,
    BarSeriesSelectModule,
    FrequencyResponseChartModule,
    TrimaRoutingModule
  ],
  declarations: [TrimaComponent, TrimaParamsComponent, TrimaListComponent]
})
export class TrimaModule { }

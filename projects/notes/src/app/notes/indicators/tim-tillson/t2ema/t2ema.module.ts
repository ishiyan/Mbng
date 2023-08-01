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

import { KatexModule } from 'mb';
import { SvgViewerModule } from 'mb';
import { LinearChartModule } from 'mb';
import { OhlcvChartModule } from 'mb';
import { ColorsModule } from 'mb';
import { T2ExponentialMovingAverageModule } from 'mb';
import { OhlcvChartSelectorModule } from 'mb';
import { FrequencyResponseChartModule } from 'mb';

import { BarSeriesSelectModule } from '../../../../shared/data/bar-series/bar-series-select/bar-series-select.module';
import { T2emaComponent } from './t2ema.component';
import { T2emaParamsComponent } from './t2ema-params.component';
import { T2emaListComponent } from './t2ema-list.component';
import { T2emaRoutingModule } from './t2ema-routing.module';

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
    T2ExponentialMovingAverageModule,
    OhlcvChartSelectorModule,
    BarSeriesSelectModule,
    FrequencyResponseChartModule,
    T2emaRoutingModule
  ],
  declarations: [T2emaComponent, T2emaParamsComponent, T2emaListComponent]
})
export class T2emaModule { }

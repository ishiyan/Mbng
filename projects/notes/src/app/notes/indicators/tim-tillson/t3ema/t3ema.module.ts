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
import { T3ExponentialMovingAverageModule } from 'mb';
import { OhlcvChartSelectorModule } from 'mb';
import { FrequencyResponseChartModule } from 'mb';

import { BarSeriesSelectModule } from '../../../../shared/data/bar-series/bar-series-select/bar-series-select.module';
import { T3emaComponent } from './t3ema.component';
import { T3emaParamsComponent } from './t3ema-params.component';
import { T3emaListComponent } from './t3ema-list.component';
import { T3emaRoutingModule } from './t3ema-routing.module';

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
    T3ExponentialMovingAverageModule,
    OhlcvChartSelectorModule,
    BarSeriesSelectModule,
    FrequencyResponseChartModule,
    T3emaRoutingModule
  ],
  declarations: [T3emaComponent, T3emaParamsComponent, T3emaListComponent]
})
export class T3emaModule { }

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
import { SwatchesSelectComponent } from 'mb';
import { DoubleExponentialMovingAverageModule } from 'mb';
import { OhlcvChartSelectorModule } from 'mb';
import { FrequencyResponseChartModule } from 'mb';


import { DemaComponent } from './dema.component';
import { DemaParamsComponent } from './dema-params.component';
import { DemaListComponent } from './dema-list.component';
import { DemaRoutingModule } from './dema-routing.module';

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
    SwatchesSelectComponent,
    DoubleExponentialMovingAverageModule,
    OhlcvChartSelectorModule,
    FrequencyResponseChartModule,
    DemaRoutingModule,
    DemaComponent, DemaParamsComponent, DemaListComponent
]
})
export class DemaModule { }

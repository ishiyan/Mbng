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
import { SimpleMovingAverageModule } from 'mb';
import { OhlcvChartSelectorModule } from 'mb';
import { FrequencyResponseChartModule } from 'mb';


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
    SwatchesSelectComponent,
    SimpleMovingAverageModule,
    OhlcvChartSelectorModule,
    FrequencyResponseChartModule,
    SmaRoutingModule,
    SmaComponent, SmaParamsComponent, SmaListComponent
]
})
export class SmaModule { }

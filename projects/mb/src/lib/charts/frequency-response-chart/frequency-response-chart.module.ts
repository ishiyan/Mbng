import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatButtonToggleModule } from '@angular/material/button-toggle';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatIconModule } from '@angular/material/icon';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';

import { SvgViewerModule } from '../../svg-viewer/svg-viewer.module';

import { FrequencyResponseChartComponent } from './frequency-response-chart.component';

@NgModule({
    imports: [
        CommonModule,
        FormsModule,
        MatButtonModule,
        MatButtonToggleModule,
        MatExpansionModule,
        MatIconModule,
        MatSlideToggleModule,
        SvgViewerModule,
        FrequencyResponseChartComponent
    ],
    exports: [FrequencyResponseChartComponent],
    providers: []
})
export class FrequencyResponseChartModule { }

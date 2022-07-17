import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatButtonToggleModule } from '@angular/material/button-toggle';
import { MatRadioModule } from '@angular/material/radio';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatIconModule } from '@angular/material/icon';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';

import { SvgViewerModule } from '../../svg-viewer/svg-viewer.module';

import { LinearChartComponent } from './linear-chart.component';

@NgModule({
    imports: [
        CommonModule,
        FormsModule,
        MatButtonModule,
        MatButtonToggleModule,
        MatRadioModule,
        MatExpansionModule,
        MatIconModule,
        MatSlideToggleModule,
        SvgViewerModule
    ],
    exports: [LinearChartComponent],
    declarations: [LinearChartComponent],
    providers: []
})
export class LinearChartModule { }

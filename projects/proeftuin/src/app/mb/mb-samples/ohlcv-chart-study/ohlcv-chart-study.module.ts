import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';

import { OhlcvChartStudyComponent } from './ohlcv-chart-study.component';

@NgModule({
    imports: [
        CommonModule,
        FormsModule,
        MatButtonModule,
        OhlcvChartStudyComponent
    ]
})
export class OhlcvChartStudyModule { }

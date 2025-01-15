import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';

import { OhlcvChartModule} from 'projects/mb/src/lib/charts/ohlcv-chart/ohlcv-chart.module';

import { OhlcvChartStudyComponent } from './ohlcv-chart-study.component';

@NgModule({
    imports: [
        CommonModule,
        FormsModule,
        MatButtonModule,
        OhlcvChartModule,
        OhlcvChartStudyComponent
    ]
})
export class OhlcvChartStudyModule { }

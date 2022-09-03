import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSelectModule } from '@angular/material/select';

import { WidthSvgComponent } from './width-svg.component';
import { DashSvgComponent } from './dash-svg.component';
import { LineWidthComponent } from './line-width.component';
import { LineDashComponent } from './line-dash.component';
import { LineInterpolationComponent } from './line-interpolation.component';
import { LineComponent } from './line.component';

@NgModule({
    imports: [
        CommonModule,
        FormsModule,
        MatFormFieldModule,
        MatSelectModule
    ],
    exports: [
        WidthSvgComponent,
        DashSvgComponent,
        LineWidthComponent,
        LineDashComponent,
        LineInterpolationComponent,
        LineComponent
    ],
    declarations: [
        WidthSvgComponent,
        DashSvgComponent,
        LineWidthComponent,
        LineDashComponent,
        LineInterpolationComponent,
        LineComponent
    ],
    providers: [
    ]
})
export class OhlcvChartSelectorModule { }

import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSelectModule } from '@angular/material/select';
import { MatInputModule } from '@angular/material/input';

import { ColorPickerModule } from '../../../colors/picker/color-picker.module';

import { WidthSvgComponent } from './width-svg.component';
import { DashSvgComponent } from './dash-svg.component';
import { LineWidthComponent } from './line-width.component';
import { LineDashComponent } from './line-dash.component';
import { LineInterpolationComponent } from './line-interpolation.component';
import { ColorComponent } from './color.component';
import { LineComponent } from './line.component';

@NgModule({
    imports: [
        CommonModule,
        FormsModule,
        MatFormFieldModule,
        MatSelectModule,
        MatInputModule,
        ColorPickerModule
    ],
    exports: [
        WidthSvgComponent,
        DashSvgComponent,
        LineWidthComponent,
        LineDashComponent,
        LineInterpolationComponent,
        ColorComponent,
        LineComponent
    ],
    declarations: [
        WidthSvgComponent,
        DashSvgComponent,
        LineWidthComponent,
        LineDashComponent,
        LineInterpolationComponent,
        ColorComponent,
        LineComponent
    ],
    providers: [
    ]
})
export class OhlcvChartSelectorModule { }

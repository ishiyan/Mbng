import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSelectModule } from '@angular/material/select';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatDialogModule } from '@angular/material/dialog';
import { MatCardModule } from '@angular/material/card';

import { ColorPickerDirective } from '../../../colors/picker/color-picker.directive';

import { WidthSvgComponent } from './width-svg.component';
import { DashSvgComponent } from './dash-svg.component';
import { LineSvgComponent } from './line-svg.component';
import { LineWidthComponent } from './line-width.component';
import { LineDashComponent } from './line-dash.component';
import { LineInterpolationComponent } from './line-interpolation.component';
import { ColorComponent } from './color.component';
import { LineStyleSelectorComponent } from './line-style-selector.component';
import { LineStyleDialogComponent } from './line-style-dialog.component';
import { LineStyleComponent } from './line-style.component';

@NgModule({
    imports: [
        CommonModule,
        FormsModule,
        MatFormFieldModule,
        MatSelectModule,
        MatInputModule,
        MatButtonModule,
        MatIconModule,
        MatDialogModule,
        MatCardModule,
        ColorPickerDirective,
        WidthSvgComponent,
        DashSvgComponent,
        LineSvgComponent,
        LineWidthComponent,
        LineDashComponent,
        LineInterpolationComponent,
        ColorComponent,
        LineStyleSelectorComponent,
        LineStyleDialogComponent,
        LineStyleComponent
    ],
    exports: [
        WidthSvgComponent,
        DashSvgComponent,
        LineSvgComponent,
        LineWidthComponent,
        LineDashComponent,
        LineInterpolationComponent,
        ColorComponent,
        LineStyleSelectorComponent,
        LineStyleDialogComponent,
        LineStyleComponent
    ],
    providers: []
})
export class OhlcvChartSelectorModule { }

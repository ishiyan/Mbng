import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FlexLayoutModule } from '@angular/flex-layout';
import { MatButtonModule } from '@angular/material/button';

import { LinearChartModule } from 'mb';






import { LinearChartingComponent } from './linear-charting.component';
import { LinearChartingRoutingModule } from './linear-charting-routing.module';

@NgModule({
    imports: [
    CommonModule,
    FlexLayoutModule,
    MatButtonModule,
    LinearChartModule,
    LinearChartingRoutingModule,
    LinearChartingComponent
]
})
export class LinearChartingModule { }

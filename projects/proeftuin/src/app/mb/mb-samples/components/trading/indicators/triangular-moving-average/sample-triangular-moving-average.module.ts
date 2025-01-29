import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { FlexLayoutModule } from '@angular/flex-layout';


//import { TriangularMovingAverageModule } from 'projects/mb/src/lib/trading/indicators/triangular-moving-average/triangular-moving-average.module';

import { SampleTriangularMovingAverage1Component } from './sample-1/sample-triangular-moving-average-1.component';
import { SampleTriangularMovingAverage2Component } from './sample-2/sample-triangular-moving-average-2.component';

import { SampleTriangularMovingAverageRoutingModule } from './sample-triangular-moving-average-routing.module';

@NgModule({
    imports: [
    CommonModule,
    FormsModule,
    FlexLayoutModule,
    //TriangularMovingAverageModule,
    SampleTriangularMovingAverageRoutingModule,
    SampleTriangularMovingAverage1Component,
    SampleTriangularMovingAverage2Component
]
})
export class SampleTriangularMovingAverageModule { }

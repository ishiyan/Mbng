import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { FlexLayoutModule } from '@angular/flex-layout';


import { SimpleMovingAverageModule } from 'projects/mb/src/lib/trading/indicators/simple-moving-average/simple-moving-average.module';

import { SampleSimpleMovingAverage1Component } from './sample-1/sample-simple-moving-average-1.component';
import { SampleSimpleMovingAverage2Component } from './sample-2/sample-simple-moving-average-2.component';

import { SampleSimpleMovingAverageRoutingModule } from './sample-simple-moving-average-routing.module';

@NgModule({
    imports: [
    CommonModule,
    FormsModule,
    FlexLayoutModule,
    SimpleMovingAverageModule,
    SampleSimpleMovingAverageRoutingModule,
    SampleSimpleMovingAverage1Component,
    SampleSimpleMovingAverage2Component
]
})
export class SampleSimpleMovingAverageModule { }

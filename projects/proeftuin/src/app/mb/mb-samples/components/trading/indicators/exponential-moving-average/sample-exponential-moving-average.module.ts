import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { FlexLayoutModule } from '@angular/flex-layout';


//import { ExponentialMovingAverageModule }
//  from 'projects/mb/src/lib/trading/indicators/exponential-moving-average/exponential-moving-average.module';

import { SampleExponentialMovingAverage1Component } from './sample-1/sample-exponential-moving-average-1.component';
import { SampleExponentialMovingAverage2Component } from './sample-2/sample-exponential-moving-average-2.component';

import { SampleExponentialMovingAverageRoutingModule } from './sample-exponential-moving-average-routing.module';

@NgModule({
    imports: [
    CommonModule,
    FormsModule,
    FlexLayoutModule,
    //ExponentialMovingAverageModule,
    SampleExponentialMovingAverageRoutingModule,
    SampleExponentialMovingAverage1Component,
    SampleExponentialMovingAverage2Component
]
})
export class SampleExponentialMovingAverageModule { }

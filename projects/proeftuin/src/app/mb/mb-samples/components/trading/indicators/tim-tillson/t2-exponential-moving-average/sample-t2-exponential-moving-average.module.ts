import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { FlexLayoutModule } from '@angular/flex-layout';


//import { T2ExponentialMovingAverageModule }
//  from 'projects/mb/src/lib/trading/indicators/tim-tillson/t2-exponential-moving-average/t2-exponential-moving-average.module';

import { SampleT2ExponentialMovingAverage1Component }
  from './sample-1/sample-t2-exponential-moving-average-1.component';
import { SampleT2ExponentialMovingAverage2Component }
  from './sample-2/sample-t2-exponential-moving-average-2.component';

import { SampleT2ExponentialMovingAverageRoutingModule }
  from './sample-t2-exponential-moving-average-routing.module';

@NgModule({
    imports: [
    CommonModule,
    FormsModule,
    FlexLayoutModule,
    //T2ExponentialMovingAverageModule,
    SampleT2ExponentialMovingAverageRoutingModule,
    SampleT2ExponentialMovingAverage1Component,
    SampleT2ExponentialMovingAverage2Component
]
})
export class SampleT2ExponentialMovingAverageModule { }

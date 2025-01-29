import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { FlexLayoutModule } from '@angular/flex-layout';


//import { DoubleExponentialMovingAverageModule }
//  from 'projects/mb/src/lib/trading/indicators/patrick-mulloy/double-exponential-moving-average/double-exponential-moving-average.module';

import { SampleDoubleExponentialMovingAverage1Component }
  from './sample-1/sample-double-exponential-moving-average-1.component';
import { SampleDoubleExponentialMovingAverage2Component }
  from './sample-2/sample-double-exponential-moving-average-2.component';

import { SampleDoubleExponentialMovingAverageRoutingModule }
  from './sample-double-exponential-moving-average-routing.module';

@NgModule({
    imports: [
    CommonModule,
    FormsModule,
    FlexLayoutModule,
    //DoubleExponentialMovingAverageModule,
    SampleDoubleExponentialMovingAverageRoutingModule,
    SampleDoubleExponentialMovingAverage1Component,
    SampleDoubleExponentialMovingAverage2Component
]
})
export class SampleDoubleExponentialMovingAverageModule { }

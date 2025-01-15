import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { FlexLayoutModule } from '@angular/flex-layout';


import { TripleExponentialMovingAverageModule }
  from 'projects/mb/src/lib/trading/indicators/patrick-mulloy/triple-exponential-moving-average/triple-exponential-moving-average.module';

import { SampleTripleExponentialMovingAverage1Component }
  from './sample-1/sample-triple-exponential-moving-average-1.component';
import { SampleTripleExponentialMovingAverage2Component }
  from './sample-2/sample-triple-exponential-moving-average-2.component';

import { SampleTripleExponentialMovingAverageRoutingModule }
  from './sample-triple-exponential-moving-average-routing.module';

@NgModule({
    imports: [
    CommonModule,
    FormsModule,
    FlexLayoutModule,
    TripleExponentialMovingAverageModule,
    SampleTripleExponentialMovingAverageRoutingModule,
    SampleTripleExponentialMovingAverage1Component,
    SampleTripleExponentialMovingAverage2Component
]
})
export class SampleTripleExponentialMovingAverageModule { }

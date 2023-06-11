import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { FlexLayoutModule } from '@angular/flex-layout';

import { MaterialModule } from 'projects/mb/src/lib/material/material.module';
import { T3ExponentialMovingAverageModule }
  from 'projects/mb/src/lib/trading/indicators/tim-tillson/t3-exponential-moving-average/t3-exponential-moving-average.module';

import { SampleT3ExponentialMovingAverage1Component }
  from './sample-1/sample-t3-exponential-moving-average-1.component';
import { SampleT3ExponentialMovingAverage2Component }
  from './sample-2/sample-t3-exponential-moving-average-2.component';

import { SampleT3ExponentialMovingAverageRoutingModule }
  from './sample-t3-exponential-moving-average-routing.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    FlexLayoutModule,
    MaterialModule,
    T3ExponentialMovingAverageModule,
    SampleT3ExponentialMovingAverageRoutingModule
  ],
  declarations: [
    SampleT3ExponentialMovingAverage1Component,
    SampleT3ExponentialMovingAverage2Component
  ]
})
export class SampleT3ExponentialMovingAverageModule { }

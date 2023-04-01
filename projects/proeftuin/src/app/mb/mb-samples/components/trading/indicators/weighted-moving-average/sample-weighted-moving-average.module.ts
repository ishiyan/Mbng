import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { FlexLayoutModule } from '@angular/flex-layout';

import { MaterialModule } from 'projects/mb/src/lib/material/material.module';
import { WeightedMovingAverageModule } from 'projects/mb/src/lib/trading/indicators/weighted-moving-average/weighted-moving-average.module';

import { SampleWeightedMovingAverage1Component } from './sample-1/sample-weighted-moving-average-1.component';
import { SampleWeightedMovingAverage2Component } from './sample-2/sample-weighted-moving-average-2.component';

import { SampleWeightedMovingAverageRoutingModule } from './sample-weighted-moving-average-routing.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    FlexLayoutModule,
    MaterialModule,
    WeightedMovingAverageModule,
    SampleWeightedMovingAverageRoutingModule
  ],
  declarations: [
    SampleWeightedMovingAverage1Component,
    SampleWeightedMovingAverage2Component
  ]
})
export class SampleWeightedMovingAverageModule { }

import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { FlexLayoutModule } from '@angular/flex-layout';


import { StandardDeviationModule } from 'projects/mb/src/lib/trading/indicators/statistics/standard-deviation/standard-deviation.module';

import { SampleStandardDeviation1Component } from './sample-1/sample-standard-deviation-1.component';
import { SampleStandardDeviation2Component } from './sample-2/sample-standard-deviation-2.component';

import { SampleStandardDeviationRoutingModule } from './sample-standard-deviation-routing.module';

@NgModule({
    imports: [
    CommonModule,
    FormsModule,
    FlexLayoutModule,
    StandardDeviationModule,
    SampleStandardDeviationRoutingModule,
    SampleStandardDeviation1Component,
    SampleStandardDeviation2Component
]
})
export class SampleStandardDeviationModule { }

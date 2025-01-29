import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { FlexLayoutModule } from '@angular/flex-layout';


//import { VarianceModule } from 'projects/mb/src/lib/trading/indicators/statistics/variance/variance.module';

import { SampleVariance1Component } from './sample-1/sample-variance-1.component';
import { SampleVariance2Component } from './sample-2/sample-variance-2.component';

import { SampleVarianceRoutingModule } from './sample-variance-routing.module';

@NgModule({
    imports: [
    CommonModule,
    FormsModule,
    FlexLayoutModule,
    //VarianceModule,
    SampleVarianceRoutingModule,
    SampleVariance1Component,
    SampleVariance2Component
]
})
export class SampleVarianceModule { }

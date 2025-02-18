import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { FlexLayoutModule } from '@angular/flex-layout';

import { SampleHilbertCurve1Component } from './sample-1/sample-hilbert-curve-1.component';
//import { SampleHilbertCurve2Component } from './sample-2/sample-hilbert-curve-2.component';
//import { SampleHilbertCurve3Component } from './sample-3/sample-hilbert-curve-3.component';

import { SampleHilbertCurveRoutingModule } from './sample-hilbert-curve-routing.module';

@NgModule({
    imports: [
    CommonModule,
    FormsModule,
    FlexLayoutModule,
    SampleHilbertCurveRoutingModule,
    SampleHilbertCurve1Component//,
    //SampleHilbertCurve2Component,
    //SampleHilbertCurve3Component
]
})
export class SampleHilbertCurveModule { }

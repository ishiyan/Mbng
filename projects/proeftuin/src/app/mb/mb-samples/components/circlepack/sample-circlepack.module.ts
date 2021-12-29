import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { FlexLayoutModule } from '@angular/flex-layout';

import { MaterialModule } from 'projects/mb/src/lib/material/material.module';
import { ChartsModule } from 'projects/mb/src/lib/charts/charts.module';

import { SampleCirclepack1Component } from './sample-1/sample-circlepack-1.component';
import { SampleCirclepack2Component } from './sample-2/sample-circlepack-2.component';
import { SampleCirclepack3Component } from './sample-3/sample-circlepack-3.component';
import { SampleCirclepack4Component } from './sample-4/sample-circlepack-4.component';
import { SampleCirclepack5Component } from './sample-5/sample-circlepack-5.component';

import { SampleCirclepackRoutingModule } from './sample-circlepack-routing.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    FlexLayoutModule,
    MaterialModule,
    ChartsModule,
    SampleCirclepackRoutingModule
  ],
  declarations: [
    SampleCirclepack1Component,
    SampleCirclepack2Component,
    SampleCirclepack3Component,
    SampleCirclepack4Component,
    SampleCirclepack5Component
  ]
})
export class SampleCirclepackModule { }

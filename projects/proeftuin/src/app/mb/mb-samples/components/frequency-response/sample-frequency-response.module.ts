import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { FlexLayoutModule } from '@angular/flex-layout';

import { MaterialModule } from 'projects/mb/src/lib/material/material.module';
import { ChartsModule } from 'projects/mb/src/lib/charts/charts.module';

import { SampleFrequencyResponse1Component } from './sample-1/sample-frequency-response-1.component';

import { SampleFrequencyResponseRoutingModule } from './sample-frequency-response-routing.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    FlexLayoutModule,
    MaterialModule,
    ChartsModule,
    SampleFrequencyResponseRoutingModule
  ],
  declarations: [
    SampleFrequencyResponse1Component
  ]
})
export class SampleFrequencyResponseModule { }

import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { FlexLayoutModule } from '@angular/flex-layout';

import { MaterialModule } from 'projects/mb/src/lib/material/material.module';
import { ChartsModule } from 'projects/mb/src/lib/charts/charts.module';

import { SampleMultiline1Component } from './sample-1/sample-multiline-1.component';

import { SampleMultilineRoutingModule } from './sample-multiline-routing.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    FlexLayoutModule,
    MaterialModule,
    ChartsModule,
    SampleMultilineRoutingModule
  ],
  declarations: [
    SampleMultiline1Component
  ]
})
export class SampleMultilineModule { }

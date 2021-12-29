import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { FlexLayoutModule } from '@angular/flex-layout';

import { MaterialModule } from 'projects/mb/src/lib/material/material.module';
import { ChartsModule } from 'projects/mb/src/lib/charts/charts.module';

import { SampleSunburst1Component } from './sample-1/sample-sunburst-1.component';
import { SampleSunburst2Component } from './sample-2/sample-sunburst-2.component';
import { SampleSunburst3Component } from './sample-3/sample-sunburst-3.component';
import { SampleSunburst4Component } from './sample-4/sample-sunburst-4.component';
import { SampleSunburst5Component } from './sample-5/sample-sunburst-5.component';

import { SampleSunburstRoutingModule } from './sample-sunburst-routing.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    FlexLayoutModule,
    MaterialModule,
    ChartsModule,
    SampleSunburstRoutingModule
  ],
  declarations: [
    SampleSunburst1Component,
    SampleSunburst2Component,
    SampleSunburst3Component,
    SampleSunburst4Component,
    SampleSunburst5Component
  ]
})
export class SampleSunburstModule { }

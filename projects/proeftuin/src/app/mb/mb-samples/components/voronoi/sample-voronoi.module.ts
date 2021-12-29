import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { FlexLayoutModule } from '@angular/flex-layout';

import { MaterialModule } from 'projects/mb/src/lib/material/material.module';
import { ChartsModule } from 'projects/mb/src/lib/charts/charts.module';

import { SampleVoronoi1Component } from './sample-1/sample-voronoi-1.component';
import { SampleVoronoi2Component } from './sample-2/sample-voronoi-2.component';
import { SampleVoronoi3Component } from './sample-3/sample-voronoi-3.component';
import { SampleVoronoi4Component } from './sample-4/sample-voronoi-4.component';
import { SampleVoronoi5Component } from './sample-5/sample-voronoi-5.component';

import { SampleVoronoiRoutingModule } from './sample-voronoi-routing.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    FlexLayoutModule,
    MaterialModule,
    ChartsModule,
    SampleVoronoiRoutingModule
  ],
  declarations: [
    SampleVoronoi1Component,
    SampleVoronoi2Component,
    SampleVoronoi3Component,
    SampleVoronoi4Component,
    SampleVoronoi5Component
  ]
})
export class SampleVoronoiModule { }

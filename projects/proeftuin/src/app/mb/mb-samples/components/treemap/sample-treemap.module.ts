import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { FlexLayoutModule } from '@angular/flex-layout';


import { ChartsModule } from 'projects/mb/src/lib/charts/charts.module';

import { SampleTreemap1Component } from './sample-1/sample-treemap-1.component';
import { SampleTreemap2Component } from './sample-2/sample-treemap-2.component';
import { SampleTreemap3Component } from './sample-3/sample-treemap-3.component';
import { SampleTreemap4Component } from './sample-4/sample-treemap-4.component';
import { SampleTreemap5Component } from './sample-5/sample-treemap-5.component';

import { SampleTreemapRoutingModule } from './sample-treemap-routing.module';

@NgModule({
    imports: [
    CommonModule,
    FormsModule,
    FlexLayoutModule,
    ChartsModule,
    SampleTreemapRoutingModule,
    SampleTreemap1Component,
    SampleTreemap2Component,
    SampleTreemap3Component,
    SampleTreemap4Component,
    SampleTreemap5Component
]
})
export class SampleTreemapModule { }

import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { FlexLayoutModule } from '@angular/flex-layout';


import { ChartsModule } from 'projects/mb/src/lib/charts/charts.module';

import { SampleIcicle1Component } from './sample-1/sample-icicle-1.component';
import { SampleIcicle2Component } from './sample-2/sample-icicle-2.component';
import { SampleIcicle3Component } from './sample-3/sample-icicle-3.component';
import { SampleIcicle4Component } from './sample-4/sample-icicle-4.component';
import { SampleIcicle5Component } from './sample-5/sample-icicle-5.component';

import { SampleIcicleRoutingModule } from './sample-icicle-routing.module';

@NgModule({
    imports: [
    CommonModule,
    FormsModule,
    FlexLayoutModule,
    ChartsModule,
    SampleIcicleRoutingModule,
    SampleIcicle1Component,
    SampleIcicle2Component,
    SampleIcicle3Component,
    SampleIcicle4Component,
    SampleIcicle5Component
]
})
export class SampleIcicleModule { }

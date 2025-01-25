import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { FlexLayoutModule } from '@angular/flex-layout';


import { ChartsModule } from 'projects/mb/src/lib/charts/charts.module';


import { BucketsComponent } from './buckets/buckets.component';
import { BucketsInteractiveComponent } from './buckets-interactive/buckets-interactive.component';
import { SingleComponent } from './single/single.component';
import { SingleInteractiveComponent } from './single-interactive/single-interactive.component';

import { FixedMixRoutingModule } from './fixed-mix-routing.module';

@NgModule({
    imports: [
    CommonModule,
    FormsModule,
    FlexLayoutModule,
    ChartsModule,
    FixedMixRoutingModule,
    BucketsComponent,
    BucketsInteractiveComponent,
    SingleComponent,
    SingleInteractiveComponent
]
})
export class FixedMixModule { }

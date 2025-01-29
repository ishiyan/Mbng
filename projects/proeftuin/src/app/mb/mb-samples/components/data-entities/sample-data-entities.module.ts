import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { FlexLayoutModule } from '@angular/flex-layout';


//import { EntitiesModule } from 'projects/mb/src/lib/data/entities/entities.module';

import { SampleDataEntities1Component } from './sample-1/sample-data-entities-1.component';
import { SampleDataEntities2Component } from './sample-2/sample-data-entities-2.component';

import { SampleDataEntitiesRoutingModule } from './sample-data-entities-routing.module';

@NgModule({
    imports: [
    CommonModule,
    FormsModule,
    FlexLayoutModule,
    //EntitiesModule,
    SampleDataEntitiesRoutingModule,
    SampleDataEntities1Component,
    SampleDataEntities2Component
]
})
export class SampleDataEntitiesModule { }

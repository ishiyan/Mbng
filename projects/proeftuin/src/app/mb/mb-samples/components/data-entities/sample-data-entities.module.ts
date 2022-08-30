import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { FlexLayoutModule } from '@angular/flex-layout';

import { MaterialModule } from 'projects/mb/src/lib/material/material.module';
import { EntitiesModule } from 'projects/mb/src/lib/data/entities/entities.module';

import { SampleDataEntities1Component } from './sample-1/sample-data-entities-1.component';

import { SampleDataEntitiesRoutingModule } from './sample-data-entities-routing.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    FlexLayoutModule,
    MaterialModule,
    EntitiesModule,
    SampleDataEntitiesRoutingModule
  ],
  declarations: [
    SampleDataEntities1Component
  ]
})
export class SampleDataEntitiesModule { }

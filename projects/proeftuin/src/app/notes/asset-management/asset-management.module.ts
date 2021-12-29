import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { FlexLayoutModule } from '@angular/flex-layout';

import { MaterialModule } from 'projects/mb/src/lib/material/material.module';
import { ChartsModule } from 'projects/mb/src/lib/charts/charts.module';

import { AssetManagementRoutingModule } from './asset-management-routing.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    FlexLayoutModule,
    MaterialModule,
    ChartsModule,
    AssetManagementRoutingModule
  ],
  declarations: []
})
export class AssetManagementModule { }

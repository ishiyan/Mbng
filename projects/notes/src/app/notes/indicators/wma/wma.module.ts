import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { FlexLayoutModule } from '@angular/flex-layout';

import { MaterialModule } from 'projects/mb/src/lib/material/material.module';
import { KatexModule } from 'projects/mb/src/lib/katex/katex.module';
import { ChartsModule } from 'projects/mb/src/lib/charts/charts.module';
import { ColorsModule } from 'projects/mb/src/lib/colors/colors.module';

import { WmaComponent } from './wma.component';

import { WmaRoutingModule } from './wma-routing.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    FlexLayoutModule,
    MaterialModule,
    KatexModule,
    ChartsModule,
    ColorsModule,
    WmaRoutingModule
  ],
  declarations: [
    WmaComponent
  ]
})
export class WmaModule { }

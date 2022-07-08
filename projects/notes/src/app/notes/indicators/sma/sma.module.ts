import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { FlexLayoutModule } from '@angular/flex-layout';

import { MaterialModule } from 'projects/mb/src/lib/material/material.module';
import { KatexModule } from 'projects/mb/src/lib/katex/katex.module';
import { ChartsModule } from 'projects/mb/src/lib/charts/charts.module';
import { ColorsModule } from 'projects/mb/src/lib/colors/colors.module';

import { ScrollerModule } from '../../../shared/scroller/scroller.module';

import { SmaComponent } from './sma.component';

import { SmaRoutingModule } from './sma-routing.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    FlexLayoutModule,
    MaterialModule,
    KatexModule,
    ChartsModule,
    ColorsModule,
    ScrollerModule,
    SmaRoutingModule
  ],
  declarations: [
    SmaComponent
  ]
})
export class SmaModule { }

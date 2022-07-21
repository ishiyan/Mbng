import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FlexLayoutModule } from '@angular/flex-layout';
import { MatButtonModule } from '@angular/material/button';

import { KatexModule } from 'projects/mb/src/lib/katex/katex.module';

import { ScrollerModule } from '../../../shared/scroller/scroller.module';

import { SmaComponent } from './sma.component';

import { SmaRoutingModule } from './sma-routing.module';

@NgModule({
  imports: [
    CommonModule,
    FlexLayoutModule,
    MatButtonModule,
    KatexModule,
    ScrollerModule,
    SmaRoutingModule
  ],
  declarations: [
    SmaComponent
  ]
})
export class SmaModule { }

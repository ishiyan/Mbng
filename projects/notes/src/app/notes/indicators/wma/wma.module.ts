import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FlexLayoutModule } from '@angular/flex-layout';
import { MatButtonModule } from '@angular/material/button';

import { KatexModule } from 'projects/mb/src/lib/katex/katex.module';

import { WmaComponent } from './wma.component';

import { WmaRoutingModule } from './wma-routing.module';

@NgModule({
  imports: [
    CommonModule,
    FlexLayoutModule,
    MatButtonModule,
    KatexModule,
    WmaRoutingModule
  ],
  declarations: [
    WmaComponent
  ]
})
export class WmaModule { }

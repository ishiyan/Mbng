import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FlexLayoutModule } from '@angular/flex-layout';

import { MaterialModule } from 'projects/mb/src/lib/material/material.module';
import { ScrollToTopComponent } from './scroll-to-top.component';

@NgModule({
  imports: [
    CommonModule,
    MaterialModule,
    FlexLayoutModule
  ],
  exports: [
    ScrollToTopComponent
  ],
  declarations: [ScrollToTopComponent]
})
export class ScrollToTopModule { }

import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FlexLayoutModule } from '@angular/flex-layout';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';

import { ScrollToTopComponent } from './scroll-to-top.component';

@NgModule({
  imports: [
    CommonModule,
    FlexLayoutModule,
    MatButtonModule,
    MatIconModule
  ],
  exports: [
    ScrollToTopComponent
  ],
  declarations: [ScrollToTopComponent]
})
export class ScrollToTopModule { }

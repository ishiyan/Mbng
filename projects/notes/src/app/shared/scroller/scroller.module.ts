import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MaterialModule } from 'projects/mb/src/lib/material/material.module';
import { ScrollerComponent } from './scroller.component';

@NgModule({
  imports: [
    CommonModule,
    MaterialModule
  ],
  exports: [ScrollerComponent],
  declarations: [ScrollerComponent]
})
export class ScrollerModule { }

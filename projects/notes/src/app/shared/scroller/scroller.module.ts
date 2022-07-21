import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';

import { ScrollerComponent } from './scroller.component';

@NgModule({
  imports: [
    CommonModule,
    MatButtonModule,
    MatIconModule
  ],
  exports: [ScrollerComponent],
  declarations: [ScrollerComponent]
})
export class ScrollerModule { }

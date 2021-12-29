import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { KatexService } from './katex.service';
import { KatexDirective } from './katex.directive';
import { KatexComponent } from './katex.component';

@NgModule({
  imports: [CommonModule],
  providers: [KatexService],
  declarations: [KatexDirective, KatexComponent],
  exports: [KatexComponent],
})
export class KatexModule { }

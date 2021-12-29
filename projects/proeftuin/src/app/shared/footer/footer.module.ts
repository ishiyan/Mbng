import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MaterialModule } from 'projects/mb/src/lib/material/material.module';

import { FooterComponent } from './footer.component';

@NgModule({
  imports: [
    CommonModule, MaterialModule
  ],
  exports: [FooterComponent],
  declarations: [FooterComponent]
})
export class FooterModule { }

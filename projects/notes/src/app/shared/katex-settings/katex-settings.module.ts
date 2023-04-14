import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatIconModule } from '@angular/material/icon';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';

import { KatexModule } from 'mb';

import { KatexSettingsComponent } from './katex-settings.component';

@NgModule({
  imports: [
    CommonModule,
    MatIconModule,
    MatSlideToggleModule,
    KatexModule
  ],
  exports: [KatexSettingsComponent],
  declarations: [KatexSettingsComponent]
})
export class KatexSettingsModule { }

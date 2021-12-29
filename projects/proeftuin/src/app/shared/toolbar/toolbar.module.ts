import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FlexLayoutModule } from '@angular/flex-layout';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';

import { MaterialModule } from 'projects/mb/src/lib/material/material.module';

import { ThemePickerModule } from '../theme-picker/theme-picker.module';
import { ToolbarComponent } from './toolbar.component';

@NgModule({
  imports: [
    CommonModule,
    RouterModule,
    MaterialModule,
    FlexLayoutModule,
    FormsModule,
    ThemePickerModule
  ],
  exports: [
    ToolbarComponent
  ],
  declarations: [ToolbarComponent]
})
export class ToolbarModule { }

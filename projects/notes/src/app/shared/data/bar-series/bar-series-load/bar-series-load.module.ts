import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { MaterialModule } from 'projects/mb/src/lib/material/material.module';
import { MultilineModule } from 'projects/mb/src/lib/charts/multiline/multiline.module';

import { FilesizeModule } from '../../filesize/filesize.module';
import { BarSeriesLoadComponent } from './bar-series-load.component';

@NgModule({
  imports: [
    CommonModule, FormsModule, MaterialModule, MultilineModule, FilesizeModule
  ],
  exports: [BarSeriesLoadComponent],
  declarations: [BarSeriesLoadComponent]
})
export class BarSeriesLoadModule { }

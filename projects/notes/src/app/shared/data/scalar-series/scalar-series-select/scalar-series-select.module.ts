import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSelectModule } from '@angular/material/select';

import { SparklineModule } from 'projects/mb/src/lib/charts/sparkline/sparkline.module';

import { ScalarSeriesSelectComponent } from './scalar-series-select.component';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    MatFormFieldModule,
    MatSelectModule,
    SparklineModule
  ],
  exports: [ScalarSeriesSelectComponent],
  declarations: [ScalarSeriesSelectComponent]
})
export class ScalarSeriesSelectModule { }

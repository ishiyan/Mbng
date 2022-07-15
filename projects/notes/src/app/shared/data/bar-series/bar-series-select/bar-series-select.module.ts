import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { MaterialModule } from 'projects/mb/src/lib/material/material.module';
import { SparklineModule } from 'projects/mb/src/lib/charts/sparkline/sparkline.module';

import { BarSeriesSelectComponent } from './bar-series-select.component';

@NgModule({
  imports: [
    CommonModule, FormsModule, MaterialModule, SparklineModule
  ],
  exports: [BarSeriesSelectComponent],
  declarations: [BarSeriesSelectComponent]
})
export class BarSeriesSelectModule { }

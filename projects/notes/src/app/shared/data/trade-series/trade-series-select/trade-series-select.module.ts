import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSelectModule } from '@angular/material/select';

import { SparklineModule } from 'mb';

import { TradeSeriesSelectComponent } from './trade-series-select.component';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    MatFormFieldModule,
    MatSelectModule,
    SparklineModule
  ],
  exports: [TradeSeriesSelectComponent],
  declarations: [TradeSeriesSelectComponent]
})
export class TradeSeriesSelectModule { }

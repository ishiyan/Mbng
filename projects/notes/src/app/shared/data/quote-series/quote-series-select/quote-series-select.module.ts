import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSelectModule } from '@angular/material/select';

import { SparklineModule } from 'mb';

import { QuoteSeriesSelectComponent } from './quote-series-select.component';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    MatFormFieldModule,
    MatSelectModule,
    SparklineModule
  ],
  exports: [QuoteSeriesSelectComponent],
  declarations: [QuoteSeriesSelectComponent]
})
export class QuoteSeriesSelectModule { }

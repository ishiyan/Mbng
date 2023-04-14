import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatProgressBarModule } from '@angular/material/progress-bar';

import { MultilineModule } from 'mb';

import { FilesizeModule } from '../../filesize/filesize.module';
import { QuoteSeriesLoadComponent } from './quote-series-load.component';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    MatButtonModule,
    MatFormFieldModule,
    MatIconModule,
    MatInputModule,
    MatProgressBarModule,
    MultilineModule,
    FilesizeModule
  ],
  exports: [QuoteSeriesLoadComponent],
  declarations: [QuoteSeriesLoadComponent]
})
export class QuoteSeriesLoadModule { }

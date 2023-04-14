import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FlexLayoutModule } from '@angular/flex-layout';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatDividerModule } from '@angular/material/divider';

import { SparklineModule } from 'mb';
import { MultilineModule } from 'mb';

import { SeriesCardComponent } from './series-card.component';

@NgModule({
  imports: [
    CommonModule,
    FlexLayoutModule,
    MatExpansionModule,
    MatButtonModule,
    MatIconModule,
    MatDividerModule,
    SparklineModule,
    MultilineModule
  ],
  exports: [SeriesCardComponent],
  declarations: [SeriesCardComponent]
})
export class SeriesCardModule { }

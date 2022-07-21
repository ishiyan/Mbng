import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FlexLayoutModule } from '@angular/flex-layout';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatDividerModule } from '@angular/material/divider';

import { SparklineModule } from 'projects/mb/src/lib/charts/sparkline/sparkline.module';
import { MultilineModule } from 'projects/mb/src/lib/charts/multiline/multiline.module';


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

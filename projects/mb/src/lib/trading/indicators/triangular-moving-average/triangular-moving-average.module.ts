import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatDialogModule } from '@angular/material/dialog';

import { EntitiesModule } from '../../../data/entities/entities.module';
import { TriangularMovingAverageParamsComponent } from './triangular-moving-average-params.component';
import { TriangularMovingAverageParamsDialogComponent } from './triangular-moving-average-params-dialog.component';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatIconModule,
    MatExpansionModule,
    MatDialogModule,
    EntitiesModule
  ],
  exports: [
    TriangularMovingAverageParamsComponent,
    TriangularMovingAverageParamsDialogComponent
  ],
  declarations: [
    TriangularMovingAverageParamsComponent,
    TriangularMovingAverageParamsDialogComponent
  ]
})
export class TriangularMovingAverageModule {}

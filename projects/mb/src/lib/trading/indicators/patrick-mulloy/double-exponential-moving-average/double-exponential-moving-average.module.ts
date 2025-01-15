import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatDialogModule } from '@angular/material/dialog';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';

import { EntitiesModule } from '../../../../data/entities/entities.module';
import { DoubleExponentialMovingAverageParamsComponent } from './double-exponential-moving-average-params.component';
import { DoubleExponentialMovingAverageParamsDialogComponent } from './double-exponential-moving-average-params-dialog.component';

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
        MatSlideToggleModule,
        EntitiesModule,
        DoubleExponentialMovingAverageParamsComponent,
        DoubleExponentialMovingAverageParamsDialogComponent
    ],
    exports: [
        DoubleExponentialMovingAverageParamsComponent,
        DoubleExponentialMovingAverageParamsDialogComponent
    ]
})
export class DoubleExponentialMovingAverageModule {}

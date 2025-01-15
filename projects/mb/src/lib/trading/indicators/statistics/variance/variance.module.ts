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
import { VarianceParamsComponent } from './variance-params.component';
import { VarianceParamsDialogComponent } from './variance-params-dialog.component';

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
        VarianceParamsComponent,
        VarianceParamsDialogComponent
    ],
    exports: [
        VarianceParamsComponent,
        VarianceParamsDialogComponent
    ]
})
export class VarianceModule {}

import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { FlexLayoutModule } from '@angular/flex-layout';
import { MatButtonModule } from '@angular/material/button';
import { MatButtonToggleModule } from '@angular/material/button-toggle';
import { MatStepperModule } from '@angular/material/stepper';

import { SyntheticDataComponent } from './synthetic-data.component';

@NgModule({
    imports: [
        CommonModule,
        FormsModule,
        FlexLayoutModule,
        MatButtonModule,
        MatButtonToggleModule,
        MatStepperModule,
        SyntheticDataComponent
    ]
})
export class SyntheticDataModule { }

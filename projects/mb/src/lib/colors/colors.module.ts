import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MaterialModule } from '../material/material.module';

import { SwatchesComponent } from './swatches/swatches.component';
import { SwatchesSelectComponent } from './swatches/swatches-select.component';

@NgModule({
    imports: [
        CommonModule,
        MaterialModule
    ],
    exports: [
        SwatchesComponent, SwatchesSelectComponent
    ],
    declarations: [
        SwatchesComponent, SwatchesSelectComponent
    ],
    providers: [
    ]
})
export class ColorsModule { }

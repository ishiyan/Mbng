import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SparklineComponent } from './sparkline.component';

@NgModule({
    imports: [
        CommonModule,
    ],
    exports: [
        SparklineComponent
    ],
    declarations: [
        SparklineComponent
    ],
    providers: [
    ]
})
export class SparklineModule { }

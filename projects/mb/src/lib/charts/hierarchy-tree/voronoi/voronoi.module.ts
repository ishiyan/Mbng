import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { VoronoiComponent } from './voronoi.component';

@NgModule({
    imports: [
        CommonModule,
    ],
    exports: [
        VoronoiComponent
    ],
    declarations: [
        VoronoiComponent
    ],
    providers: [
    ]
})
export class VoronoiModule { }

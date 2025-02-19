import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { FlexLayoutModule } from '@angular/flex-layout';

import { DemoComponent } from './demo/demo.component';
import { IndustryClassificationsComponent } from './industry-classifications/industry-classifications.component';

import { HierarchiesRoutingModule } from './hierarchies-routing.module';

@NgModule({
    imports: [
    CommonModule,
    FormsModule,
    FlexLayoutModule,
    HierarchiesRoutingModule,
    DemoComponent, IndustryClassificationsComponent
]
})
export class HierarchiesModule { }

import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { FlexLayoutModule } from '@angular/flex-layout';


import { SampleMultiline1Component } from './sample-1/sample-multiline-1.component';

import { SampleMultilineRoutingModule } from './sample-multiline-routing.module';

@NgModule({
    imports: [
    CommonModule,
    FormsModule,
    FlexLayoutModule,
    SampleMultilineRoutingModule,
    SampleMultiline1Component
]
})
export class SampleMultilineModule { }

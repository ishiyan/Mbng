import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FlexLayoutModule } from '@angular/flex-layout';

import { KatexModule } from 'mb';
import { SvgViewerModule } from 'mb';
import { FrequencyResponseChartModule } from 'mb';

import { FrequencyResponseComponent } from './frequency-response.component';
import { FrequencyResponseRoutingModule } from './frequency-response-routing.module';

@NgModule({
    imports: [
        CommonModule,
        FlexLayoutModule,
        KatexModule,
        SvgViewerModule,
        FrequencyResponseChartModule,
        FrequencyResponseRoutingModule,
        FrequencyResponseComponent
    ]
})
export class FrequencyResponseModule { }

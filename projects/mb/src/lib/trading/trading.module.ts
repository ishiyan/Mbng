import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MaterialModule } from '../material/material.module';

import { BusinessDayCalendarDescriptionComponent } from './time/business-day-calendar-description.component';

@NgModule({
    imports: [
        CommonModule,
        MaterialModule
    ],
    exports: [
        BusinessDayCalendarDescriptionComponent
    ],
    declarations: [
        BusinessDayCalendarDescriptionComponent
    ],
    providers: [
    ]
})
export class TradingModule { }

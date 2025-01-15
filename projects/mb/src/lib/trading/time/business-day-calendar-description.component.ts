import { Component } from '@angular/core';
import { MatDialogTitle, MatDialogContent } from '@angular/material/dialog';
import { CdkScrollable } from '@angular/cdk/scrolling';

@Component({
    selector: 'mb-business-day-calendar-description',
    templateUrl: './business-day-calendar-description.component.html',
    styleUrls: ['./business-day-calendar-description.component.scss'],
    imports: [MatDialogTitle, CdkScrollable, MatDialogContent]
})
export class BusinessDayCalendarDescriptionComponent {
}

import { ChangeDetectionStrategy, Component } from '@angular/core';
import { CdkScrollable } from '@angular/cdk/scrolling';
import { MatDialogTitle, MatDialogContent } from '@angular/material/dialog';

@Component({
  selector: 'mb-business-day-calendar-description',
  templateUrl: './business-day-calendar-description.component.html',
  styleUrls: ['./business-day-calendar-description.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [CdkScrollable, MatDialogTitle, MatDialogContent]
})
export class BusinessDayCalendarDescriptionComponent {
}

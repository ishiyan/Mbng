import { Component, Input } from '@angular/core';
import { TimeGranularity } from './../../trading/time/time-granularity.enum';
import { BusinessDayCalendar } from './../../trading/time/business-day-calendar.enum';
import { BusinessDayCalendarDescriptionComponent } from '../../trading/time/business-day-calendar-description.component';
import { MatDialog } from '@angular/material/dialog';
import { TimeParameters } from './time-parameters';
import { Enums } from '../../utils/enums';
import { MatExpansionPanel, MatExpansionPanelHeader, MatExpansionPanelTitle } from '@angular/material/expansion';
import { MatFormField, MatSuffix, MatLabel } from '@angular/material/form-field';
import { MatInput } from '@angular/material/input';
import { FormsModule } from '@angular/forms';
import { MatDatepickerInput, MatDatepickerToggle, MatDatepicker } from '@angular/material/datepicker';
import { MatSelect } from '@angular/material/select';
import { NgFor } from '@angular/common';
import { MatOption } from '@angular/material/core';
import { MatIconButton } from '@angular/material/button';
import { MatIcon } from '@angular/material/icon';

@Component({
    selector: 'mb-data-generators-time-parameters',
    templateUrl: './time-parameters.component.html',
    styleUrls: ['./time-parameters.component.scss'],
    imports: [MatExpansionPanel, MatExpansionPanelHeader, MatExpansionPanelTitle, MatFormField, MatInput, FormsModule, MatDatepickerInput, MatDatepickerToggle, MatSuffix, MatDatepicker, MatLabel, MatSelect, NgFor, MatOption, MatIconButton, MatIcon]
})
export class TimeParametersComponent {
  @Input() timeParameters!: TimeParameters;

  timeGranularities = Object.keys(TimeGranularity);
  businessDayCalendars = Object.keys(BusinessDayCalendar);

  compare = Enums.compare;

  constructor(public dialog: MatDialog) {
  }

  openBusinessDayCalendarDescription() {
    this.dialog.open(BusinessDayCalendarDescriptionComponent, undefined);
  }
}

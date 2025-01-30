import { ChangeDetectionStrategy, Component, effect, inject, input } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatFormField, MatSuffix, MatLabel } from '@angular/material/form-field';
import { MatInput } from '@angular/material/input';
import { MatSelect } from '@angular/material/select';
import { MatOption } from '@angular/material/core';
import { MatIconButton } from '@angular/material/button';
import { MatIcon } from '@angular/material/icon';
import { MatDialog } from '@angular/material/dialog';
import { MatExpansionPanel, MatExpansionPanelHeader, MatExpansionPanelTitle } from '@angular/material/expansion';
import { MatDatepickerInput, MatDatepickerToggle, MatDatepicker } from '@angular/material/datepicker';

import { TimeGranularity } from './../../trading/time/time-granularity.enum';
import { BusinessDayCalendar } from './../../trading/time/business-day-calendar.enum';
import { BusinessDayCalendarDescriptionComponent } from '../../trading/time/business-day-calendar-description.component';
import { Enums } from '../../utils/enums';
import { TimeParameters } from './time-parameters';

@Component({
    selector: 'mb-data-generators-time-parameters',
    templateUrl: './time-parameters.component.html',
    styleUrls: ['./time-parameters.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush,
    imports: [
      FormsModule,
      MatFormField,
      MatSuffix,
      MatLabel,
      MatInput,
      MatSelect,
      MatOption,
      MatIconButton,
      MatIcon,
      MatExpansionPanel,
      MatExpansionPanelHeader,
      MatExpansionPanelTitle,
      MatDatepickerInput,
      MatDatepickerToggle,
      MatDatepicker
    ]
})
export class TimeParametersComponent {
  dialog = inject(MatDialog);

  // timeParameters = input.required<TimeParameters>();
  timeParameters = input<TimeParameters>();
  params: TimeParameters = new TimeParameters();

  constructor() {
    effect(() => {
      this.params = this.timeParameters() ?? new TimeParameters();
    });
  }

  timeGranularities = Object.keys(TimeGranularity);
  businessDayCalendars = Object.keys(BusinessDayCalendar);
  compare = Enums.compare;

  openBusinessDayCalendarDescription() {
    this.dialog.open(BusinessDayCalendarDescriptionComponent, undefined);
  }
}

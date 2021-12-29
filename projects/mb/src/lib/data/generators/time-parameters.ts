import { TimeGranularity } from '../../trading/time/time-granularity.enum';
import { BusinessDayCalendar } from '../../trading/time/business-day-calendar.enum';
import {
  objectName, sessionStartTimeName, sessionEndTimeName, startDateName, timeGranularityName,
  businessDayCalendarName
} from './constants';

/** The time-related input parameters for temporal data generators. */
export class TimeParameters {
  private static readonly defaultSessionStartTime: string = '09:00:00';
  private static readonly defaultSessionEndTime: string = '18:00:00';
  private static readonly dafaultStartDate: Date = new Date(2000, 0, 1);
  private static readonly dafaultTimeGranularity: TimeGranularity = TimeGranularity.Day1;
  private static readonly dafaultBusinessDayCalendar: BusinessDayCalendar = BusinessDayCalendar.WeekendsOnly;

  /** The start time of the trading session. */
  sessionStartTime: string = TimeParameters.defaultSessionStartTime;

  /** The end time of the trading session. */
  sessionEndTime: string = TimeParameters.defaultSessionEndTime;

  /** The date of the first data sample. */
  startDate: Date = TimeParameters.dafaultStartDate;

  /** The time granularity of data samples. */
  timeGranularity: TimeGranularity = TimeParameters.dafaultTimeGranularity;

  /** An exchange holiday schedule or a general country holiday schedule. */
  businessDayCalendar: BusinessDayCalendar = TimeParameters.dafaultBusinessDayCalendar;

  constructor(data?: TimeParameters) {
    if (data) {
      for (const property in data) {
        if (data.hasOwnProperty(property)) {
          (this as any)[property] = (data as any)[property];
        }
      }
    }
  }

  private static formatDate(d: Date): string {
    return d.getFullYear() + '-' +
      (d.getMonth() < 9 ? ('0' + (d.getMonth() + 1)) : (d.getMonth() + 1)) + '-' +
      (d.getDate() < 10 ? ('0' + d.getDate()) : d.getDate());
  }

  toJSON(data?: any) {
    data = typeof data === objectName ? data : {};
    data[sessionStartTimeName] = this.sessionStartTime;
    data[sessionEndTimeName] = this.sessionEndTime;
    data[startDateName] = this.startDate ? TimeParameters.formatDate(this.startDate) : TimeParameters.dafaultStartDate;
    data[timeGranularityName] = this.timeGranularity;
    data[businessDayCalendarName] = this.businessDayCalendar;
    return data;
  }
}

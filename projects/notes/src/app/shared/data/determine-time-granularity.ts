import { TimeGranularity } from 'projects/mb/src/lib/trading/time/time-granularity.enum';

const msecsInSec = 1000;
const secsInMin = 60;
const minsInHour = 60;
const hoursInDay = 24;
const daysInWeek = 7;
const weeksInMonth = 4;
const daysInMonth = 30;
const monthsInYear = 12;

export const determineTimeGranularity = (t1: Date, t2: Date): TimeGranularity => {
  const seconds = Math.round(Math.abs(t2.getTime() - t1.getTime()) / msecsInSec);
  if (seconds < secsInMin) {
    switch (seconds) {
      case 1: return TimeGranularity.Second1;
      case 2: return TimeGranularity.Second2;
      case 3: return TimeGranularity.Second3;
      case 4: return TimeGranularity.Second4;
      case 5: return TimeGranularity.Second5;
      case 6: return TimeGranularity.Second6;
      case 10: return TimeGranularity.Second10;
      case 12: return TimeGranularity.Second12;
      case 15: return TimeGranularity.Second15;
      case 20: return TimeGranularity.Second20;
      case 30: return TimeGranularity.Second30;
      default: return TimeGranularity.Aperiodic;
    }
  }

  const minutes = Math.round(seconds / secsInMin);
  if (minutes < minsInHour) {
    switch (minutes) {
      case 1: return TimeGranularity.Minute1;
      case 2: return TimeGranularity.Minute2;
      case 3: return TimeGranularity.Minute3;
      case 4: return TimeGranularity.Minute4;
      case 5: return TimeGranularity.Minute5;
      case 6: return TimeGranularity.Minute6;
      case 10: return TimeGranularity.Minute10;
      case 12: return TimeGranularity.Minute12;
      case 15: return TimeGranularity.Minute15;
      case 20: return TimeGranularity.Minute20;
      case 30: return TimeGranularity.Minute30;
      default: return TimeGranularity.Aperiodic;
    }
  }

  const hours = Math.round(minutes / minsInHour);
  if (hours < hoursInDay) {
    switch (hours) {
      case 1: return TimeGranularity.Hour1;
      case 2: return TimeGranularity.Hour2;
      case 3: return TimeGranularity.Hour3;
      case 4: return TimeGranularity.Hour4;
      case 6: return TimeGranularity.Hour6;
      case 8: return TimeGranularity.Hour8;
      case 12: return TimeGranularity.Hour12;
      default: return TimeGranularity.Aperiodic;
    }
  }

  const days = Math.round(hours / hoursInDay);
  if (days === 1) {
    return TimeGranularity.Day1;
  }

  const weeks = Math.round(days / daysInWeek);
  if (weeks < weeksInMonth) {
    switch (weeks) {
      case 1: return TimeGranularity.Week1;
      case 2: return TimeGranularity.Week2;
      default: return TimeGranularity.Week3;
    }
  }

  const months = Math.round(days / daysInMonth);
  if (months < monthsInYear) {
    switch (months) {
      case 1: return TimeGranularity.Month1;
      case 2: return TimeGranularity.Month2;
      case 3: return TimeGranularity.Month3;
      case 4: return TimeGranularity.Month4;
      case 6: return TimeGranularity.Month6;
      default: return TimeGranularity.Aperiodic;
    }
  }

  const years = Math.round(months / monthsInYear);
  if (years === 1) {
    return TimeGranularity.Year1;
  }

  return TimeGranularity.Aperiodic;
};

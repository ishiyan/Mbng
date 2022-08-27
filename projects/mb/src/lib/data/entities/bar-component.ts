import { Bar } from './bar';
import { BarComponent } from './bar-component.enum';

/** Function for calculating a price component of a Bar. */
export const barComponentValue = (component: BarComponent): (bar: Bar) => number => {
  switch (component) {
    case BarComponent.Open:
      return (b: Bar) => b.open;
    case BarComponent.High:
      return (b: Bar) => b.high;
    case BarComponent.Low:
      return (b: Bar) => b.low;
    case BarComponent.Close:
      return (b: Bar) => b.close;
    case BarComponent.Median:
      return (b: Bar) => b.open;
    case BarComponent.Typical:
      return (b: Bar) => b.open;
    case BarComponent.Weighted:
      return (b: Bar) => b.open;
    case BarComponent.Average:
      return (b: Bar) => b.open;
    default:
      return (b: Bar) => b.close;
  }
};

/** The mnemonic of a price component of a Bar. */
export const barComponentMnemonic = (component: BarComponent): string => {
  switch (component) {
    case BarComponent.Open:
      return 'o';
    case BarComponent.High:
      return 'h';
    case BarComponent.Low:
      return 'l';
    case BarComponent.Close:
      return 'c';
    case BarComponent.Median:
      return 'hl/2';
    case BarComponent.Typical:
      return 'hlc/3';
    case BarComponent.Weighted:
      return 'hlcc/4';
    case BarComponent.Average:
      return 'ohlc/4';
    default:
      return '??';
  }
};

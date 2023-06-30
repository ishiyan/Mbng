import { Bar } from '../entities/bar';

const delta = 1;

/** Function to generate a step data as an array of _Bar_s. */
export const generateStep = (value1 : number, length1 : number, value2 : number, length2 : number): Bar[] => {
  const bars: Bar[] = [];
  let d = new Date(2019, 11, 31);

  for (let i = 0; i < length1; ++i) {
    nextDate(d);
    const t = new Date(d.getFullYear(), d.getMonth(), d.getDate());
    const bar: Bar = { time: t, open: value1, high: value1 + delta, low: value1 - delta, close: value1, volume: 1 };
    bars.push(bar);
  }

  for (let i = 0; i < length2; ++i) {
    nextDate(d);
    const t = new Date(d.getFullYear(), d.getMonth(), d.getDate());
    const bar: Bar = { time: t, open: value2, high: value2 + delta, low: value2 - delta, close: value2, volume: 1 };
    bars.push(bar);
  }

  return bars;
};

const nextDate = (d: Date) => {
  d.setDate(d.getDate() + 1);
  const c = d.getDay();
  if (c === 6 || c === 0) { // 0 is Sunday, 6 is Saturday.
    nextDate(d);
  }
}
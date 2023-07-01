import { Bar } from '../entities/bar';

/** Function to generate a step data as an array of _Bar_s. */
export const generateStep = (value1 : number, length1 : number, value2 : number, length2 : number, spread : number): Bar[] => {
  const bars: Bar[] = [];
  let d = new Date(2019, 11, 31);

  for (let i = 0; i < length1; ++i) {
    bars.push(nextBar(d, value1, spread));
  }

  for (let i = 0; i < length2; ++i) {
    bars.push(nextBar(d, value2, spread));
  }

  return bars;
};

const nextBar = (d: Date, val: number, spread: number): Bar => {
  nextDate(d);
  const t = new Date(d.getFullYear(), d.getMonth(), d.getDate());
  const bar: Bar = { time: t, open: val, high: val + spread, low: val - spread, close: val, volume: 1 };
  return bar;
}

const nextDate = (d: Date) => {
  d.setDate(d.getDate() + 1);
  const c = d.getDay();
  if (c === 6 || c === 0) { // 0 is Sunday, 6 is Saturday.
    nextDate(d);
  }
}
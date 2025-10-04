import { Bar } from '../entities/bar';

/** Function to generate a chirp data as an array of _Bar_s. */
export const generateChirp = (value1: number, length1: number, value2: number, length2: number,
  spread: number): Bar[] => {
  const bars: Bar[] = [];
  const d = new Date(2019, 11, 31);

  for (let i = 0; i < length1; ++i) {
    bars.push(nextBar(d, value1, spread));
  }

  for (let i = 0; i < length2; ++i) {
    bars.push(nextBar(d, value2, spread));
  }

  return bars;
};

/** Function to generate a noisy chirp data as an array of _Bar_s. */
export const generateChirpWithNoise = (value1: number, noiseRatio1: number, length1: number,
  value2: number, noiseRatio2: number, length2: number, spread: number): Bar[] => {
  const bars: Bar[] = [];
  const d = new Date(2019, 11, 31);

  const delta1 = value1*noiseRatio1;
  const delta2 = value2*noiseRatio2;

  for (let i = 0; i < length1; ++i) {
    const val = delta1*(Math.random()*2 - 1);
    bars.push(nextBar(d, value1 + val, spread));
  }

  for (let i = 0; i < length2; ++i) {
    const val = delta2*(Math.random()*2 - 1);
    bars.push(nextBar(d, value2 + val, spread));
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
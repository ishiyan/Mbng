import { Bar } from '../entities/bar';
import { createChirpGenerator, ChirpGenerator } from './chirp/chirp-generator';
import { ChirpParameters } from './chirp/chirp-parameters';
import { ChirpSweep } from './chirp/chirp-sweep.enum';

const generateSample = (gen: ChirpGenerator, t: Date, spreadRatio: number, noiseRatio: number): Bar => {
  const oneDay = 1000*3600*24;
  const twoDays = 2 * oneDay;

  t = new Date(t.getTime() + oneDay); // increment by 1 day

  // Skip weekends: if Saturday (6) or Sunday (0), advance to Monday
  const dow = t.getDay();
  if (dow === 0) { // Sunday
    t = new Date(t.getTime() + oneDay); // advance 1 more day to Monday
  } else if (dow === 6) { // Saturday
    t = new Date(t.getTime() + twoDays); // advance 2 more days to Monday
  }

  let v = gen.nextSample();
  if (noiseRatio !==0) {
    v += v * noiseRatio * (Math.random()*2 - 1);
  }

  if (spreadRatio ===0) {
    return { time: t, open: v, high: v, low: v, close: v, volume: 1 };
    } else {
      const delta = v * spreadRatio;
      return { time: t, open: v, high: v+delta, low: v-delta, close: v, volume: 1 };
    }
};

/** Function to generate a chirp data as an array of _Bar_s. */
export const generateChirp = (initialPeriod: number, finalPeriod: number,
  sweepSamples: number = 128, sweepsCount: number = 2, isBiDirectional: boolean = true,
  sweep: ChirpSweep = ChirpSweep.LinearFrequency, spreadRatio: number = 0,
  noiseRatio: number = 0, warmUpPeriods: number = 0): [Bar[], string] => {
  const bars: Bar[] = [];
  const count = sweepSamples * sweepsCount;
  let t = new Date(2025, 0, 1);

  if (warmUpPeriods > 0) {
    const warmUpCount = initialPeriod * warmUpPeriods;
    const warmUpParams: ChirpParameters = {
      amplitude: 100,
      minimalValue: 10,
      initialPeriod,
      finalPeriod: initialPeriod,
      phaseInPi: 0,
      isBiDirectional: true,
      chirpSweep: sweep,
      chirpSweepSamples: sweepSamples,
      noiseRatio
    };
    const warmUpGen = createChirpGenerator(warmUpParams);
    for (let i = 0; i < warmUpCount; i++) {
      const bar = generateSample(warmUpGen, t, spreadRatio, noiseRatio);
      bars.push(bar);
      t = bar.time;
    }
  }

  const params: ChirpParameters = {
    amplitude: 100,
    minimalValue: 10,
    initialPeriod,
    finalPeriod,
    phaseInPi: 0,
    isBiDirectional,
    chirpSweep: sweep,
    chirpSweepSamples: sweepSamples,
    noiseRatio
  };
  const gen = createChirpGenerator(params);
  const moniker = gen.moniker;

  for (let i = 0; i < count; i++) {
    const bar = generateSample(gen, t, spreadRatio, noiseRatio);
    bars.push(bar);
    t = bar.time;
  }

  return [bars, moniker];
};


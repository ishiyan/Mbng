import { Note } from './shared/note.interface';

export const t3ExponentialMovingAverageNote: Note = {
  title: 'T3 Exponential moving average',
  summary: 'T3 Exploring exponential moving average',
  route: '9',
  created: '2021-07-27',
  tags: ['Trading', 'Indicators', 'Moving averages', 'Tillson']
};

export const t2ExponentialMovingAverageNote: Note = {
  title: 'T2 Exponential moving average',
  summary: 'T2 Exploring exponential moving average',
  route: '8',
  created: '2021-07-25',
  tags: ['Trading', 'Indicators', 'Moving averages', 'Tillson']
};

export const tripleExponentialMovingAverageNote: Note = {
  title: 'Triple exponential moving average',
  summary: 'Triple exploring exponential moving average',
  route: '7',
  created: '2021-07-17',
  tags: ['Trading', 'Indicators', 'Moving averages', 'Mulloy']
};

export const doubleExponentialMovingAverageNote: Note = {
  title: 'Double exponential moving average',
  summary: 'Double exploring exponential moving average',
  route: '6',
  created: '2021-07-15',
  tags: ['Trading', 'Indicators', 'Moving averages', 'Mulloy']
};

export const triangularMovingAverageNote: Note = {
  title: 'Triangular moving average',
  summary: 'Exploring triangular moving average',
  route: '5',
  created: '2021-07-08',
  tags: ['Trading', 'Indicators', 'Moving averages']
};

export const weightedMovingAverageNote: Note = {
  title: 'Weighted moving average',
  summary: 'Exploring weighted moving average',
  route: '4',
  created: '2021-07-08',
  tags: ['Trading', 'Indicators', 'Moving averages']
};

export const exponentialMovingAverageNote: Note = {
  title: 'Exponential moving average',
  summary: 'Exploring exponential moving average',
  route: '3',
  created: '2021-05-07',
  tags: ['Trading', 'Indicators', 'Moving averages']
};

export const simpleMovingAverageNote: Note = {
  title: 'Simple moving average',
  summary: 'Exploring simple moving average',
  route: '2',
  created: '2021-07-05',
  tags: ['Trading', 'Indicators', 'Moving averages']
};

export const frequencyResponseOfAnIndicatorNote: Note = {
  title: 'Frequency response of an indicator',
  summary: 'Indicators as Digital Signal Processing filters',
  route: '1',
  created: '2020-08-05',
  tags: ['Trading', 'Indicators', 'Moving averages']
};

export const visualisingFinancialDataWithLinearChartNote: Note = {
  title: 'Visualising financial data with linear chart',
  summary: 'Plot various data types in linar chart and export SVG',
  route: '0',
  created: '2019-03-01',
  tags: ['Data', 'Visualization']
};

export const notes: Note[] = [
  {
    title: 'Comparing triple exponential moving average with SMA',
    summary: 'Comparing triple exponential moving average with the simple moving average',
    route: '2',
    created: '2021-12-04',
    tags: ['Trading', 'Indicators', 'Moving averages', 'Comparisons']
  },
  t3ExponentialMovingAverageNote,
  t2ExponentialMovingAverageNote,
  tripleExponentialMovingAverageNote,
  doubleExponentialMovingAverageNote,
  triangularMovingAverageNote,
  weightedMovingAverageNote,
  exponentialMovingAverageNote,
  simpleMovingAverageNote,
  frequencyResponseOfAnIndicatorNote,
  visualisingFinancialDataWithLinearChartNote
];

import { Note } from './shared/note.interface';

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
  {
    title: 'Triple exponential moving average',
    summary: 'Exploring triple exponential moving average',
    route: '1',
    created: '2021-05-06',
    tags: ['Trading', 'Indicators', 'Moving averages']
  },
  triangularMovingAverageNote,
  weightedMovingAverageNote,
  exponentialMovingAverageNote,
  simpleMovingAverageNote,
  frequencyResponseOfAnIndicatorNote,
  visualisingFinancialDataWithLinearChartNote
];

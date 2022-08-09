import { Note } from './shared/note.interface';

export const notes: Note[] =
  [
    {
      title: 'Frequency response of an indicator',
      summary: 'Indicators as Digital Signal Processing filters',
      route: '4',
      created: '2022-08-05',
      tags: ['Trading', 'Indicators', 'Moving averages']
    },
    {
      title: 'Simple moving average',
      summary: 'Exploring simple moving average',
      route: '3',
      created: '2022-07-05',
      tags: ['Trading', 'Indicators', 'Moving averages']
    },
    {
      title: 'Comparing triple exponential moving average with SMA',
      summary: 'Comparing triple exponential moving average with the simple moving average',
      route: '2',
      created: '2021-12-04',
      tags: ['Trading', 'Indicators', 'Moving averages', 'Comparisons']
    },
    {
      title: 'Exponential moving average',
      summary: 'Exploring exponential moving average',
      route: '1',
      created: '2021-05-07',
      tags: ['Trading', 'Indicators', 'Moving averages']
    },
    {
      title: 'Triple exponential moving average',
      summary: 'Exploring triple exponential moving average',
      route: '1',
      created: '2021-05-06',
      tags: ['Trading', 'Indicators', 'Moving averages']
    },
    {
      title: 'Visualising financial data with linear chart',
      summary: 'Plot various data types in linar chart and export SVG',
      route: '0',
      created: '2019-03-01',
      tags: ['Data', 'Visualization']
    }
  ];

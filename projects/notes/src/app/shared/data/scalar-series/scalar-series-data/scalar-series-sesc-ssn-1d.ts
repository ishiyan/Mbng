import { TimeGranularity } from 'projects/mb/src/public-api';
import { Series } from '../../series.interface';

export const scalarSeriesSescSsn1d: Series = {
  mnemonic: 'sesc ssn 1d',
  description: 'The Space Environment Services Center (SESC) sunspot number, computed according to the Wolf Sunspot Number.',
  timeStart: new Date(1994, 0, 1),
  timeEnd: new Date(2022, 6, 7),
  timeGranularity: TimeGranularity.Day1,
  data: [
    { time: new Date(1999, 0, 4), value: 130 },

    { time: new Date(2000, 0, 4), value: 70 },
    { time: new Date(2001, 0, 4), value: 80 },
    { time: new Date(2002, 0, 4), value: 110 },
    { time: new Date(2003, 0, 4), value: 120 },
    { time: new Date(2004, 0, 4), value: 86 },
    { time: new Date(2005, 0, 4), value: 67 },
    { time: new Date(2006, 0, 4), value: 72 },
    { time: new Date(2007, 0, 4), value: 98 },
    { time: new Date(2008, 0, 4), value: 85 },
    { time: new Date(2009, 0, 4), value: 123 },
    { time: new Date(2010, 0, 4), value: 101 },
    { time: new Date(2011, 0, 4), value: 88 },
    { time: new Date(2012, 0, 4), value: 94 },
    { time: new Date(2013, 0, 4), value: 103 },
    { time: new Date(2014, 0, 4), value: 134 },
    { time: new Date(2015, 0, 4), value: 80 },
    { time: new Date(2016, 0, 4), value: 68 },
    { time: new Date(2017, 0, 4), value: 72 },
    { time: new Date(2018, 0, 4), value: 74 },
    { time: new Date(2019, 0, 4), value: 110 },
    { time: new Date(2020, 0, 4), value: 96 },
    { time: new Date(2022, 0, 4), value: 99 },

    { time: new Date(2022, 6, 7), value: 88 }
  ],
};

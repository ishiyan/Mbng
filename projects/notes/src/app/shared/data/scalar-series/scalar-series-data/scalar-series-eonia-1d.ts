import { TimeGranularity } from 'projects/mb/src/public-api';
import { Series } from '../../series.interface';

export const scalarSeriesEonia1d: Series = {
  mnemonic: 'eonia 1d',
  description: 'The Euro OverNight Index Average (EONIA) is the overnight reference rate in the Euro zone. ' +
    'On 3 January 2022, EONIA was discontinued and replaced by €STR.',
  timeStart: new Date(1999, 0, 4),
  timeEnd: new Date(2021, 11, 31),
  timeGranularity: TimeGranularity.Day1,
  data: [
    { time: new Date(1999, 0, 4), value: 3.2 },

    { time: new Date(2000, 0, 4), value: 2.2 },
    { time: new Date(2001, 0, 4), value: 1.2 },
    { time: new Date(2002, 0, 4), value: 0.2 },
    { time: new Date(2003, 0, 4), value: -0.2 },
    { time: new Date(2004, 0, 4), value: -1.2 },
    { time: new Date(2005, 0, 4), value: -0.2 },
    { time: new Date(2006, 0, 4), value: 0.2 },
    { time: new Date(2007, 0, 4), value: 1.2 },
    { time: new Date(2008, 0, 4), value: 2.2 },
    { time: new Date(2009, 0, 4), value: 3.2 },
    { time: new Date(2010, 0, 4), value: 2.2 },
    { time: new Date(2011, 0, 4), value: 1.2 },
    { time: new Date(2012, 0, 4), value: 0.2 },
    { time: new Date(2013, 0, 4), value: -0.2 },
    { time: new Date(2014, 0, 4), value: -1.2 },
    { time: new Date(2015, 0, 4), value: 0.2 },
    { time: new Date(2016, 0, 4), value: 1.2 },
    { time: new Date(2017, 0, 4), value: 2.2 },
    { time: new Date(2018, 0, 4), value: 3.2 },
    { time: new Date(2019, 0, 4), value: 2.2 },
    { time: new Date(2020, 0, 4), value: 1.2 },

    { time: new Date(2021, 11, 31), value: -0.505 }
  ],
};

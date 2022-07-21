import { TimeGranularity } from 'projects/mb/src/public-api';
import { Series } from '../../series.interface';

export const tradeSeriesRdsaXamsAperiodic: Series = {
  mnemonic: 'rdsa:xams',
  description: 'Royal Dutch Shell Plc, GB00BP6MXD84.',
  timeStart: new Date(1999, 0, 4),
  timeEnd: new Date(2021, 11, 31),
  timeGranularity: TimeGranularity.Aperiodic,
  data: [
    { time: new Date(1999, 0, 4), price: 3.2, volume: 1 },

    { time: new Date(2000, 0, 4), price: 4.2, volume: 1 },
    { time: new Date(2001, 0, 4), price: 5.2, volume: 1 },
    { time: new Date(2002, 0, 4), price: 6.2, volume: 1 },
    { time: new Date(2003, 0, 4), price: 7.2, volume: 1 },
    { time: new Date(2004, 0, 4), price: 6.2, volume: 1 },
    { time: new Date(2005, 0, 4), price: 5.2, volume: 1 },
    { time: new Date(2006, 0, 4), price: 4.2, volume: 1 },
    { time: new Date(2007, 0, 4), price: 3.2, volume: 1 },
    { time: new Date(2008, 0, 4), price: 2.2, volume: 1 },
    { time: new Date(2009, 0, 4), price: 1.2, volume: 1 },
    { time: new Date(2010, 0, 4), price: 0.2, volume: 1 },
    { time: new Date(2011, 0, 4), price: 1.2, volume: 1 },
    { time: new Date(2012, 0, 4), price: 2.2, volume: 1 },
    { time: new Date(2013, 0, 4), price: 3.2, volume: 1 },
    { time: new Date(2014, 0, 4), price: 4.2, volume: 1 },
    { time: new Date(2015, 0, 4), price: 5.2, volume: 1 },
    { time: new Date(2016, 0, 4), price: 6.2, volume: 1 },
    { time: new Date(2017, 0, 4), price: 7.2, volume: 1 },
    { time: new Date(2018, 0, 4), price: 6.2, volume: 1 },
    { time: new Date(2019, 0, 4), price: 5.2, volume: 1 },
    { time: new Date(2020, 0, 4), price: 4.2, volume: 1 },

    { time: new Date(2021, 11, 31), price: 5.5, volume: 1 }
  ],
};

import { TimeGranularity } from 'projects/mb/src/public-api';
import { Series } from '../../series.interface';

export const quoteSeriesSp500Aperiodic: Series = {
  mnemonic: 'sp500 quotes',
  description: 'S&P 500 quotes from rannforex.com',
  timeStart: new Date(1999, 0, 4),
  timeEnd: new Date(2021, 11, 31),
  timeGranularity: TimeGranularity.Aperiodic,
  data: [
    { time: new Date(1999, 0, 4), askPrice: 3.2, bidPrice: 3.7, askSize: 11, bidSize: 12 },

    { time: new Date(2000, 0, 4), askPrice: 3.2, bidPrice: 3.7, askSize: 11, bidSize: 12 },
    { time: new Date(2001, 0, 4), askPrice: 4.2, bidPrice: 4.7, askSize: 12, bidSize: 13 },
    { time: new Date(2002, 0, 4), askPrice: 5.2, bidPrice: 5.7, askSize: 13, bidSize: 14 },
    { time: new Date(2003, 0, 4), askPrice: 6.2, bidPrice: 6.7, askSize: 14, bidSize: 15 },
    { time: new Date(2004, 0, 4), askPrice: 7.2, bidPrice: 7.7, askSize: 15, bidSize: 16 },
    { time: new Date(2005, 0, 4), askPrice: 8.2, bidPrice: 8.7, askSize: 16, bidSize: 17 },
    { time: new Date(2006, 0, 4), askPrice: 9.2, bidPrice: 9.7, askSize: 17, bidSize: 18 },
    { time: new Date(2007, 0, 4), askPrice: 8.2, bidPrice: 8.7, askSize: 16, bidSize: 17 },
    { time: new Date(2008, 0, 4), askPrice: 7.2, bidPrice: 7.7, askSize: 15, bidSize: 16 },
    { time: new Date(2009, 0, 4), askPrice: 6.2, bidPrice: 6.7, askSize: 14, bidSize: 15 },
    { time: new Date(2010, 0, 4), askPrice: 5.2, bidPrice: 5.7, askSize: 13, bidSize: 14 },
    { time: new Date(2011, 0, 4), askPrice: 4.2, bidPrice: 4.7, askSize: 12, bidSize: 13 },
    { time: new Date(2012, 0, 4), askPrice: 3.2, bidPrice: 3.7, askSize: 11, bidSize: 12 },
    { time: new Date(2013, 0, 4), askPrice: 2.2, bidPrice: 2.7, askSize: 10, bidSize: 11 },
    { time: new Date(2014, 0, 4), askPrice: 1.2, bidPrice: 1.7, askSize: 9, bidSize: 10 },
    { time: new Date(2015, 0, 4), askPrice: 2.2, bidPrice: 2.7, askSize: 10, bidSize: 11 },
    { time: new Date(2016, 0, 4), askPrice: 3.2, bidPrice: 3.7, askSize: 11, bidSize: 12 },
    { time: new Date(2017, 0, 4), askPrice: 4.2, bidPrice: 4.7, askSize: 12, bidSize: 13 },
    { time: new Date(2018, 0, 4), askPrice: 5.2, bidPrice: 5.7, askSize: 13, bidSize: 14 },
    { time: new Date(2019, 0, 4), askPrice: 6.2, bidPrice: 6.7, askSize: 14, bidSize: 15 },
    { time: new Date(2020, 0, 4), askPrice: 7.2, bidPrice: 7.7, askSize: 15, bidSize: 16 },

    { time: new Date(2021, 11, 31), askPrice: 3.2, bidPrice: 3.7, askSize: 11, bidSize: 12 }
  ],
};

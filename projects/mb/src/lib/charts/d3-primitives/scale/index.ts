import * as d3 from 'd3';

import { financetime as financetime_ } from './financetime';
import { accessors as accessors_ } from '../accessors';

export const scale = () => {
  const accessors = accessors_();
  const fintime = financetime_(widen);

  const ohlcv = (data: any, accessor?: any, widening?: any) => {
    accessor = accessor || accessors.ohlcv();
    widening = widening === undefined ? 0.02 : widening;
    const low = accessor.low;
    const high = accessor.high;
    return d3.scaleLinear()
      .domain([d3.min(data.map(low)), d3.max(data.map(high))].map(widen(widening)));
  };

  const quote = (data: any, accessor?: any, widening?: any) => {
    accessor = accessor || accessors.quote();
    widening = widening === undefined ? 0.02 : widening;
    const bid = accessor.bid;
    const ask = accessor.ask;
    return d3.scaleLinear()
      .domain([d3.min(data.map(bid)), d3.max(data.map(ask))].map(widen(widening)));
  };

  const pathWithValueAccessor = (data: any, accessor?: any, widening?: any) => {
    accessor = accessor || accessors.value();
    widening = widening === undefined ? 0.02 : widening;
    return pathScale(data, accessor, widening);
  };

  return {
    financetime: fintime,

    plot: {
      candlestick: ohlcv,
      ohlc: ohlcv,
      tick: ohlcv,

      closeline: pathWithValueAccessor, // pathWithCloseAccessor ?
      tradeline: pathWithValueAccessor, // pathWithPriceAccessor ?
      valueline: pathWithValueAccessor,
      tradepoint: pathWithValueAccessor, // pathWithPriceAccessor ?
      valuepoint: pathWithValueAccessor,

      quotepoint: quote,
      quotebar: quote,

      percent: (scale_: any, reference?: any) => {
        const domain = scale_.domain();
        reference = reference || domain[0];
        return scale_
          .copy()
          .domain([domain[0], domain[domain.length - 1]]
            .map((d) => (d - reference) / reference));
      },

      supstance: (data: any, accessor?: any, widening?: any) => {
        accessor = accessor || accessors.supstance();
        widening = widening === undefined ? 0.02 : widening;
        return pathScale(data, accessor.value, widening);
      },

      time: (data: any, accessor?: any) => {
        accessor = accessor || accessors.value();
        return fintime().domain(data.map(accessor.time));
      },

      tradearrow: (data: any, accessor?: any, widening?: any) => {
        accessor = accessor || accessors.trade();
        widening = widening === undefined ? 0.02 : widening;
        return pathScale(data, accessor.price, widening);
      },

      trendline: (data: any, accessor?: any, widening?: any) => {
        accessor = accessor || accessors.trendline();
        widening = widening === undefined ? 0.04 : widening;
        const values = mapReduceFilter(data,
          (d: any) => [accessor.startValue(d), accessor.endValue(d)]);
        return d3.scaleLinear().domain(d3.extent(values).map(widen(widening)));
      },

      volume: (data: any, accessor?: any) => {
        accessor = accessor || accessors.ohlcv();
        return d3.scaleLinear()
          .domain([0, d3.max(data.map(accessor.volume)) as any * 1.15]);
      },
    }
  };
};

const pathDomain = (data: any, accessor: any, widening: any) =>
  data.length > 0 ? d3.extent(data, accessor).map(widen(widening)) : [];

const pathScale = (data: any, accessor: any, widening: any) =>
  d3.scaleLinear().domain(pathDomain(data, accessor, widening));

/** Only to be used on an array of 2 elements [min, max]. */
const widen = (widening: any, width?: any) => {
  widening = widening || 0;

  return (d: any, i: any, array: any) => {
    if (array.length > 2) {
      throw new Error('array.length > 2 unsupported. array.length = ' + array.length);
    }

    width = width || (array[array.length - 1] - array[0]);
    return d + (i * 2 - 1) * width * widening;
  };
};

const mapReduceFilter = (data: any, map: any) => data
  .map(map)
  // Flatten.
  .reduce((a: any, b: any) => a.concat(b))
  // Remove nulls.
  .filter((d: any) => d !== null);

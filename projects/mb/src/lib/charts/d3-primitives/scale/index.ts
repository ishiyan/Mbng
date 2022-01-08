import * as d3 from 'd3';

import { financetime as financetime_ } from "./financetime"
import { accessors as accessors_ } from "../accessors"

export const scale = function () {
  var accessors = accessors_(),
    financetime = financetime_(widen);

  function ohlcv(data: any, accessor?: any, widening?: any) {
    accessor = accessor || accessors.ohlcv();
    widening = widening === undefined ? 0.02 : widening;
    const low = accessor.low;
    const high = accessor.high;
    return d3.scaleLinear()
      .domain([d3.min(data.map(low)), d3.max(data.map(high))].map(widen(widening)));
  }

  function quote(data: any, accessor?: any, widening?: any) {
    accessor = accessor || accessors.quote();
    widening = widening === undefined ? 0.02 : widening;
    const bid = accessor.bid;
    const ask = accessor.ask;
    return d3.scaleLinear()
      .domain([d3.min(data.map(bid)), d3.max(data.map(ask))].map(widen(widening)));
  }

  function pathWithValueAccessor(data: any, accessor?: any, widening?: any) {
    accessor = accessor || accessors.value();
    widening = widening === undefined ? 0.02 : widening;
    return pathScale(d3, data, accessor, widening);
  }

  return {
    financetime: financetime,

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

      percent: function (scale: any, reference?: any) {
        var domain = scale.domain();
        reference = reference || domain[0];
        return scale
          .copy()
          .domain([domain[0], domain[domain.length - 1]]
            .map(function (d) { return (d - reference) / reference; }));
      },

      supstance: function (data: any, accessor?: any, widening?: any) {
        accessor = accessor || accessors.supstance();
        widening = widening === undefined ? 0.02 : widening;
        return pathScale(d3, data, accessor.value, widening);
      },


      time: function (data: any, accessor?: any) {
        accessor = accessor || accessors.value();
        return financetime().domain(data.map(accessor.time));
      },

      tradearrow: function (data: any, accessor?: any, widening?: any) {
        accessor = accessor || accessors.trade();
        widening = widening === undefined ? 0.02 : widening;
        return pathScale(d3, data, accessor.price, widening);
      },

      trendline: function (data: any, accessor?: any, widening?: any) {
        accessor = accessor || accessors.trendline();
        widening = widening === undefined ? 0.04 : widening;
        var values = mapReduceFilter(data,
          function (d: any) { return [accessor.startValue(d), accessor.endValue(d)]; });
        return d3.scaleLinear().domain(d3.extent(values).map(widen(widening)));
      },

      volume: function (data: any, accessor?: any) {
        accessor = accessor || accessors.ohlcv();
        return d3.scaleLinear()
          .domain([0, d3.max(data.map(accessor.volume)) as any * 1.15]);
      },
    }
  };
};

function pathDomain(d3: any, data: any, accessor: any, widening: any) {
  return data.length > 0 ? d3.extent(data, accessor).map(widen(widening)) : [];
}

function pathScale(d3: any, data: any, accessor: any, widening: any) {
  return d3.scaleLinear().domain(pathDomain(d3, data, accessor, widening));
}

/** Only to be used on an array of 2 elements [min, max]. */
function widen(widening: any, width?: any) {
  widening = widening || 0;

  return function (d: any, i: any, array: any) {
    if (array.length > 2) {
      throw "array.length > 2 unsupported. array.length = " + array.length;
    }

    width = width || (array[array.length - 1] - array[0]);
    return d + (i * 2 - 1) * width * widening;
  };
}

function mapReduceFilter(data: any, map: any) {
  return data
    .map(map)
    // Flatten.
    .reduce(function (a: any, b: any) { return a.concat(b); })
    // Remove nulls.
    .filter(function (d: any) { return d !== null; });
}

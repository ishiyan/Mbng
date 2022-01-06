import * as d3 from 'd3';

import { financetime as financetime_ } from "./financetime"
import { accessors as accessors_ } from "../accessors"

export const scale = function () {
  var accessors = accessors_(),
    financetime = financetime_(widen);

  function ohlc(data: any, accessor: any) {
    accessor = accessor || accessors.ohlc();
    return d3.scaleLinear()
      .domain([d3.min(data.map(accessor.low())), d3.max(data.map(accessor.high()))].map(widen(0.02)));
  }

  function pathWithValueAccessor(data: any, accessor?: any, widening?: any) {
    accessor = accessor || accessors.value();
    widening = widening === undefined ? 0.02 : widening;
    return pathScale(d3, data, accessor, widening);
  }

  return {
    financetime: financetime,

    plot: {
      candlestick: ohlc,
      ohlc: ohlc,

      closeline: pathWithValueAccessor,
      tradeline: pathWithValueAccessor,
      valueline: pathWithValueAccessor,

      tradepoint: pathWithValueAccessor,
      valuepoint: pathWithValueAccessor,

      quotepoint: function (data: any, accessor?: any) {
        accessor = accessor || accessors.quote();
        return d3.scaleLinear()
          .domain([d3.min(data.map(accessor.bid())), d3.max(data.map(accessor.ask()))].map(widen(0.02)));
        },

      quotebar: function (data: any, accessor?: any) {
        accessor = accessor || accessors.quote();
        return d3.scaleLinear()
          .domain([d3.min(data.map(accessor.bid())), d3.max(data.map(accessor.ask()))].map(widen(0.02)));
      },

      percent: function (scale: any, reference?: any) {
        var domain = scale.domain();
        reference = reference || domain[0];
        return scale.copy().domain([domain[0], domain[domain.length - 1]].map(function (d) { return (d - reference) / reference; }));
      },

      supstance: function (data: any, accessor?: any) {
        accessor = accessor || accessors.supstance();
        return pathScale(d3, data, accessor.v, 0.02);
      },

      tick: ohlc,

      time: function (data: any, accessor?: any) {
        accessor = accessor || accessors.value();
        return financetime().domain(data.map(accessor.t));
      },

      tradearrow: function (data: any, accessor?: any) {
        accessor = accessor || accessors.trade();
        return pathScale(d3, data, accessor.p, 0.02);
      },

      trendline: function (data: any, accessor?: any) {
        accessor = accessor || accessors.trendline();
        var values = mapReduceFilter(data, function (d: any) { return [accessor.sv(d), accessor.ev(d)]; });
        return d3.scaleLinear().domain(d3.extent(values).map(widen(0.04)));
      },

      volume: function (data: any, accessor?: any) {
        accessor = accessor || accessors.ohlc().v;
        return d3.scaleLinear()
          .domain([0, d3.max(data.map(accessor)) as any * 1.15]);
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

/**
 * Only to be used on an array of 2 elements [min, max]
 * @param widening
 * @param width
 * @returns {Function}
 */
function widen(widening: any, width?: any) {
  widening = widening || 0;

  return function (d: any, i: any, array: any) {
    if (array.length > 2) throw "array.length > 2 unsupported. array.length = " + array.length;
    width = width || (array[array.length - 1] - array[0]);
    return d + (i * 2 - 1) * width * widening;
  };
}

function mapReduceFilter(data: any, map: any) {
  return data.map(map)
    .reduce(function (a: any, b: any) { return a.concat(b); }) // Flatten
    .filter(function (d: any) { return d !== null; }); // Remove nulls
}

'use strict';

module.exports = function(d3) {
  var scale = require('../scale')(d3),
      accessor = require('../accessor')(),
      plot = require('./plot')(d3.line, d3.area, d3.curveMonotoneX, d3.select),
      d3_functor = require('../util')().functor,
      plotMixin = require('./plotmixin')(d3.scaleLinear, d3_functor, scale.financetime, plot.dataSelector, plot.barWidth),
      candlestick = require('./candlestick')(d3.scaleLinear, d3.extent, accessor.ohlc, plot, plotMixin),
      line = require('./line'),
      axisannotation = require('./axisannotation')(d3.axisTop, d3.scaleLinear, accessor.value, plot, plotMixin),
      svg = require('../svg')(d3);
      
  return {
    axisannotation: axisannotation,
    candlestick: candlestick,
    close: line(accessor.ohlc, plot, plotMixin),
    crosshair: require('./crosshair')(d3.select, d3.pointer, d3.dispatch, accessor.crosshair, plot, plotMixin),
    ohlc: require('./ohlc')(d3.scaleLinear, d3.extent, accessor.ohlc, plot, plotMixin),
    supstance: require('./supstance')(d3.drag, d3.select, d3.dispatch, accessor.supstance, plot, plotMixin),
    tick: require('./tick')(d3.scaleLinear, d3.extent, accessor.tick, plot, plotMixin),
    tradearrow: require('./tradearrow')(d3.select, d3_functor, d3.pointer, d3.dispatch, accessor.trade, plot, plotMixin, svg.arrow),
    trendline: require('./trendline')(d3.drag, d3.select, d3.dispatch, accessor.trendline, plot, plotMixin),
    volume: require('./volume')(accessor.volume, plot, plotMixin)
  };
};

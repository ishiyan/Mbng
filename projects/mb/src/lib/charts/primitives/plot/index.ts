import { accessors as accessors_ } from '../accessors';
import { plot as plot_ } from './plot';
import { plotMixin as plotMixin_ } from './plotmixin';
import { candlestick as candlestick_ } from './candlestick';
import { line as line_ } from './line';
import { area as area_ } from './area';
import { axisannotation as axisannotation_ } from './axisannotation';
import { quotepoint as quotepoint_ } from './quotepoint';
import { quotebar as quotebar_ } from './quotebar';
import { tradepoint as tradepoint_ } from './tradepoint';
import { valuepoint as valuepoint_ } from './valuepoint';
import { crosshair as crosshair_ } from './crosshair';
import { ohlc as ohlc_ } from './ohlc';
import { supstance as supstance_ } from './supstance';
import { tick as tick_ } from './tick';
import { tradearrow as tradearrow_ } from './tradearrow';
import { trendline as trendline_ } from './trendline';
import { volume as volume_ } from './volume';

export const plot = function () {
  var accessor = accessors_(),
    plot = plot_(),
    plotMixin = plotMixin_(plot),
    candlestick = candlestick_(accessor.ohlc, plot, plotMixin),
    axisannotation = axisannotation_(accessor.value, plotMixin);

  return {
    ohlcarea: area_(accessor.ohlc, plot, plotMixin),
    valuearea: area_(accessor.value, plot, plotMixin),
    tradearea: area_(accessor.trade, plot, plotMixin),
    quotearea: area_(accessor.quote, plot, plotMixin),
    axisannotation: axisannotation,
    quotepoint: quotepoint_(accessor.quote, plot, plotMixin),
    quotebar: quotebar_(accessor.quote, plot, plotMixin),
    candlestick: candlestick,
    tradepoint: tradepoint_(accessor.trade, plot, plotMixin),
    valuepoint: valuepoint_(accessor.value, plot, plotMixin),
    closeline: line_(accessor.ohlc, plot, plotMixin),
    tradeline: line_(accessor.trade, plot, plotMixin),
    valueline: line_(accessor.value, plot, plotMixin),
    crosshair: crosshair_(accessor.crosshair, plot, plotMixin),
    ohlc: ohlc_(accessor.ohlc, plot, plotMixin),
    supstance: supstance_(accessor.supstance, plot, plotMixin),
    tick: tick_(accessor.tick, plot, plotMixin),
    tradearrow: tradearrow_(accessor.trade, plot, plotMixin),
    trendline: trendline_(accessor.trendline, plot, plotMixin),
    volume: volume_(accessor.volume, plot, plotMixin)
  };
};

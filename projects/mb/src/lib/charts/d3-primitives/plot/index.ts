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

export const plot = () => {
  const plt = plot_();
  const plotMixin = plotMixin_(plt);
  const accessor = accessors_();
  const candlestick = candlestick_(accessor.ohlcv, plt, plotMixin);
  const axisannotation = axisannotation_(accessor.value, plotMixin);

  return {
    ohlcarea: area_(accessor.ohlcv, plt, plotMixin),
    valuearea: area_(accessor.value, plt, plotMixin),
    tradearea: area_(accessor.trade, plt, plotMixin),
    quotearea: area_(accessor.quote, plt, plotMixin),
    // eslint-disable-next-line object-shorthand
    axisannotation: axisannotation,
    quotepoint: quotepoint_(accessor.quote, plt, plotMixin),
    quotebar: quotebar_(accessor.quote, plt, plotMixin),
    // eslint-disable-next-line object-shorthand
    candlestick: candlestick,
    tradepoint: tradepoint_(accessor.trade, plt, plotMixin),
    valuepoint: valuepoint_(accessor.value, plt, plotMixin),
    closeline: line_(accessor.ohlcv, plt, plotMixin),
    tradeline: line_(accessor.trade, plt, plotMixin),
    valueline: line_(accessor.value, plt, plotMixin),
    crosshair: crosshair_(accessor.crosshair, plt, plotMixin),
    ohlc: ohlc_(accessor.ohlcv, plt, plotMixin),
    supstance: supstance_(accessor.supstance, plt, plotMixin),
    tick: tick_(accessor.tick, plt, plotMixin),
    tradearrow: tradearrow_(accessor.trade, plt, plotMixin),
    trendline: trendline_(accessor.trendline, plt, plotMixin),
    volume: volume_(accessor.volume, plt, plotMixin)
  };
};

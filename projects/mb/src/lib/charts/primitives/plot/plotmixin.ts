import * as d3 from 'd3';

import { functor } from '../functor';
import { scale } from '../scale';

/**
 * Module allows optionally mixing in helper methods to plots such as xScale, yScale, accessor setters
 * and helpers for defining dispatching methods.
 */
export const plotMixin = function (plot: any) {
  function plotmixin(source: any, priv: any) {
    var plotMixin = {} as any;

    /**
     * Where mapper is DataSelector.mapper.unity or DataSelector.mapper.array. For convenience DataSelector is available
     * at PlotMixin.mapper
     *
     * @param mapper
     * @param key
     * @returns {{}}
     */
    plotMixin.dataSelector = function (mapper: any, key: any) {
      priv.dataSelector = plot.dataSelector(mapper).key(key);
      return plotMixin;
    };

    plotMixin.xScale = function (binder: any) {
      priv.xScale = scale().financetime();

      source.xScale = function (_?: any) {
        if (!arguments.length) return priv.xScale;
        priv.xScale = _;
        if (binder) binder();
        return source;
      };

      return plotMixin;
    };

    plotMixin.yScale = function (binder: any) {
      priv.yScale = d3.scaleLinear();

      source.yScale = function (_?: any) {
        if (!arguments.length) return priv.yScale;
        priv.yScale = _;
        if (binder) binder();
        return source;
      };

      return plotMixin;
    };

    plotMixin.accessor = function (accessor: any, binder: any) {
      priv.accessor = accessor;

      source.accessor = function (_?: any) {
        if (!arguments.length) return priv.accessor;
        priv.accessor = _;
        if (binder) binder();
        return source;
      };

      return plotMixin;
    };

    plotMixin.width = function (binder: any) {
      priv.width = plot.barWidth;

      source.width = function (_?: any) {
        if (!arguments.length) return priv.width;
        priv.width = functor(_);
        if (binder) binder();
        return source;
      };

      return plotMixin;
    };

    plotMixin.on = function (dispatch: any, binder: any) {
      source.on = function (type: any, listener: any) {
        dispatch.on(type, listener);
        if (binder) binder();
        return source;
      };

      return plotMixin;
    };

    /**
    * Generic mixin used for most plots
    * @returns {plotMixin}
    */
    plotMixin.plot = function (accessor: any, binder: any) {
      return plotMixin.xScale(binder).yScale(binder).accessor(accessor, binder);
    };

    return plotMixin;
  };

  // Carry the mappers through for convenience
  plotmixin.dataMapper = plot.dataSelector.mapper;

  return plotmixin;
};
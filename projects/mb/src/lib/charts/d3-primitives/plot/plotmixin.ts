import * as d3 from 'd3';

import { functor } from '../functor';
import { scale } from '../scale';

/**
 * Module allows optionally mixing in helper methods to plots such as xScale, yScale,
 * accessor setters and helpers for defining dispatching methods.
 */
export const plotMixin = (plot: any) => {
  const plotmixin = (source: any, priv: any) => {
    // eslint-disable-next-line no-underscore-dangle
    const plotMixin_ = {} as any;

    /**
     * Where mapper is `DataSelector.mapper.unity` or `DataSelector.mapper.array`.
     * For convenience `DataSelector` is available at `PlotMixin.mapper`.
     */
    plotMixin_.dataSelector = (mapper: any, key: any) => {
      priv.dataSelector = plot.dataSelector(mapper).key(key);
      return plotMixin_;
    };

    plotMixin_.xScale = (binder: any) => {
      priv.xScale = scale().financetime();

      source.xScale = function(_?: any) {
        if (!arguments.length) {
          return priv.xScale;
        }

        priv.xScale = _;
        if (binder) {
          binder();
        }

        return source;
      };

      return plotMixin_;
    };

    plotMixin_.yScale = (binder: any) => {
      priv.yScale = d3.scaleLinear();

      source.yScale = function(_?: any) {
        if (!arguments.length) {
          return priv.yScale;
        }

        priv.yScale = _;
        if (binder) {
          binder();
        }

        return source;
      };

      return plotMixin_;
    };

    plotMixin_.accessor = (accessor: any, binder: any) => {
      priv.accessor = accessor;

      source.accessor = function(_?: any) {
        if (!arguments.length) {
          return priv.accessor;
        }

        priv.accessor = _;
        if (binder) {
          binder();
        }

        return source;
      };

      return plotMixin_;
    };

    plotMixin_.width = (binder: any) => {
      priv.width = plot.barWidth;

      source.width = function(_?: any) {
        if (!arguments.length) {
          return priv.width;
        }

        priv.width = functor(_);
        if (binder) {
          binder();
        }

        return source;
      };

      return plotMixin_;
    };

    plotMixin_.on = (dispatch: any, binder: any) => {
      source.on = (type: any, listener: any) => {
        dispatch.on(type, listener);
        if (binder) {
          binder();
        }

        return source;
      };

      return plotMixin_;
    };

    /** Generic mixin used for most plots. */
    plotMixin_.plot = (accessor: any, binder: any) =>
      plotMixin_.xScale(binder).yScale(binder).accessor(accessor, binder);

    return plotMixin_;
  };

  // Carry the mappers through for convenience.
  plotmixin.dataMapper = plot.dataSelector.mapper;

  return plotmixin;
};

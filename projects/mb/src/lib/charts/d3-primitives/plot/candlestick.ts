// Injected dependencies.
export const candlestick = function (ohlcvAccessor: any, plot: any, plotMixin: any) {
  // Closure constructor.
  return function () {
    // Container for private, direct access mixed in variables.
    const p = {} as any;
    var bodyPathGenerator: any;
    var wickGenerator: any;
    var wickWidthGenerator: any;

    function candlestick(g: any) {
      var group = p.dataSelector(g);

      // 3x2 path's as wick and body can be styled slightly differently (stroke and fills).
      plot.appendPathsUpDownEqual(group.selection, p.accessor, ['candle', 'body']);
      plot.appendPathsUpDownEqual(group.selection, p.accessor, ['candle', 'wick']);

      candlestick.refresh(g);
    }

    candlestick.refresh = function (g: any) {
      g.selectAll('path.candle.body').attr('d', bodyPathGenerator).style('stroke-width', wickWidthGenerator);
      g.selectAll('path.candle.wick').attr('d', wickGenerator).style('stroke-width', wickWidthGenerator);
    };

    function binder() {
      bodyPathGenerator = plot.joinPath(bodyPath);
      wickGenerator = plot.joinPath(wickPath);
      wickWidthGenerator = plot.scaledStrokeWidth(p.xScale, 1, 4);
    }

    function bodyPath() {
      const accessor = p.accessor;
      const x = p.xScale;
      const y = p.yScale;
      const w = p.width(x);
      const w2 = w / 2;

      return function (d: any) {
        const open = y(accessor.open(d));
        const close = y(accessor.close(d));
        const xValue = x(accessor.time(d)) - w2;

        var path = 'M ' + xValue + ' ' + open + ' l ' + w + ' ' + 0;

        // Draw body only if there is a body (there is no stroke, so will not appear anyway).
        if (open != close) {
          path += ' L ' + (xValue + w) + ' ' + close + ' l ' + -w + ' ' + 0 + ' L ' + xValue + ' ' + open;
        }

        return path;
      };
    }

    function wickPath() {
      const accessor = p.accessor;
      const x = p.xScale;
      const y = p.yScale;
      const w = p.width(x);
      const w2 = w / 2;

      return function (d: any) {
        const open = y(accessor.open(d));
        const close = y(accessor.close(d));
        const xPoint = x(accessor.time(d));
        const xValue = xPoint - w2;

        // Top.
        var path = 'M ' + xPoint + ' ' + y(accessor.high(d)) + ' L ' + xPoint + ' ' + Math.min(open, close);

        // Draw another cross wick if there is no body.
        if (open == close) {
          path += ' M ' + xValue + ' ' + open + ' l ' + w + ' ' + 0;
        }

        // Bottom.
        return path + ' M ' + xPoint + ' ' + Math.max(open, close) + ' L ' + xPoint + ' ' + y(accessor.low(d));
      };
    }

    // Mixin 'superclass' methods and variables.
    plotMixin(candlestick, p)
      .plot(ohlcvAccessor(), binder)
      .width(binder)
      .dataSelector(plotMixin.dataMapper.array);
    binder();

    return candlestick;
  };
};

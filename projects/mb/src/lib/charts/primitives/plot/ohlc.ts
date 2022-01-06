export const ohlc = function (accessor_ohlc: any, plot: any, plotMixin: any) { // Injected dependencies
  return function () { // Closure constructor
    var p = {} as any, // Container for private, direct access mixed in variables
      ohlcGenerator: any,
      lineWidthGenerator: any;

    function ohlc(g: any) {
      plot.appendPathsUpDownEqual(p.dataSelector(g).selection, p.accessor, 'ohlc');
      ohlc.refresh(g);
    }

    ohlc.refresh = function (g: any) {
      g.selectAll('path.ohlc').attr('d', ohlcGenerator).style('stroke-width', lineWidthGenerator);
    };

    function binder() {
      ohlcGenerator = plot.joinPath(ohlcPath);
      lineWidthGenerator = plot.scaledStrokeWidth(p.xScale, 1, 2);
    }

    function ohlcPath() {
      var accessor = p.accessor,
        x = p.xScale,
        y = p.yScale,
        width = p.width(x);

      return function (d: any) {
        var open = y(accessor.o(d)),
          close = y(accessor.c(d)),
          xPoint = x(accessor.t(d)),
          xValue = xPoint - width / 2;

        return 'M ' + xValue + ' ' +
          open + ' l ' + (width / 2) + ' 0 M ' + xPoint + ' ' + y(accessor.h(d)) + ' L ' +
          xPoint + ' ' + y(accessor.l(d)) + ' M ' + xPoint + ' ' + close + ' l ' + (width / 2) + ' 0';
      };
    }

    // Mixin 'superclass' methods and variables
    plotMixin(ohlc, p).plot(accessor_ohlc(), binder).width(binder).dataSelector(plotMixin.dataMapper.array);
    binder();

    return ohlc;
  };
};
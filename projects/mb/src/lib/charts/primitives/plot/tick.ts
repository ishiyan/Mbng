export const tick = function (accessor_tick: any, plot: any, plotMixin: any) { // Injected dependencies
  return function () { // Closure constructor
    var p = {} as any, // Container for private, direct access mixed in variables
      tickGenerator: any,
      lineWidthGenerator: any;

    function tick(g: any) {
      p.dataSelector(g).entry.append('path').attr('class', 'tick');
      tick.refresh(g);
    }

    tick.refresh = function (g: any) {
      p.dataSelector.select(g).select('path.tick').attr('d', tickGenerator).style('stroke-width', lineWidthGenerator);
    };

    function binder() {
      tickGenerator = plot.joinPath(tickPath);
      lineWidthGenerator = plot.scaledStrokeWidth(p.xScale, 1, 2);
    }

    function tickPath() {
      var accessor = p.accessor,
        x = p.xScale,
        y = p.yScale,
        width = p.width(x);

      return function (d: any) {
        var high = y(accessor.h(d)),
          low = y(accessor.l(d)),
          xPoint = x(accessor.t(d)),
          xValue = xPoint - width / 2;

        return 'M ' + xValue + ' ' + high + ' l ' + width + ' 0 M ' + xPoint + ' ' + high +
          ' L ' + xPoint + ' ' + low + ' M ' + xValue + ' ' + low + ' l ' + width + ' 0';
      };
    }

    // Mixin 'superclass' methods and variables
    plotMixin(tick, p).plot(accessor_tick(), binder).width(binder).dataSelector(plotMixin.dataMapper.array);
    binder();

    return tick;
  };
};
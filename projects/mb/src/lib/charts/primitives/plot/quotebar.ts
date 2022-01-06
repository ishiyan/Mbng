export const quotebar = function (accessor_quote: any, plot: any, plotMixin: any) { // Injected dependencies
  return function () { // Closure constructor
    var p = {} as any, // Container for private, direct access mixed in variables
      quotebarGenerator: any,
      lineWidthGenerator: any;

    function quotebar(g: any) {
      p.dataSelector(g).entry.append('path').attr('class', 'quotebar');
      quotebar.refresh(g);
    }

    quotebar.refresh = function (g: any) {
      p.dataSelector.select(g).select('path.quotebar').attr('d', quotebarGenerator).style('stroke-width', lineWidthGenerator);
    };

    function binder() {
      quotebarGenerator = plot.joinPath(quotebarPath);
      lineWidthGenerator = plot.scaledStrokeWidth(p.xScale, 1, 2);
    }

    function quotebarPath() {
      var accessor = p.accessor,
        x = p.xScale,
        y = p.yScale,
        width = p.width(x);

      return function (d: any) {
        const high = y(accessor.a(d)),
          low = y(accessor.b(d)),
          xPoint = x(accessor.t(d)),
          xValue = xPoint - width / 2;

        return 'M' + xValue + ',' + high + 'l' + width + ',0M' + xPoint + ',' + high +
          'L' + xPoint + ',' + low + 'M' + xValue + ',' + low + 'l' + width + ',0';
      };
    }

    // Mixin 'superclass' methods and variables
    plotMixin(quotebar, p).plot(accessor_quote(), binder).width(binder).dataSelector(plotMixin.dataMapper.array);
    binder();

    return quotebar;
  };
};
// Injected dependencies.
export const quotebar = function (quoteAccessor: any, plot: any, plotMixin: any) {
  // Closure constructor.
  return function () {
    // Container for private, direct access mixed in variables.
    const p = {} as any;
    var quotebarGenerator: any;
    var lineWidthGenerator: any;

    function quotebar(g: any) {
      p.dataSelector(g).entry.append('path').attr('class', 'quotebar');
      quotebar.refresh(g);
    }

    quotebar.refresh = function (g: any) {
      p.dataSelector.select(g).select('path.quotebar').attr('d', quotebarGenerator)
        .style('stroke-width', lineWidthGenerator);
    };

    function binder() {
      quotebarGenerator = plot.joinPath(quotebarPath);
      lineWidthGenerator = plot.scaledStrokeWidth(p.xScale, 1, 2);
    }

    function quotebarPath() {
      const accessor = p.accessor;
      const x = p.xScale;
      const y = p.yScale;
      const w = p.width(x);
      const w2 = w / 2;

      return function (d: any) {
        const high = y(accessor.ask(d));
        const low = y(accessor.bid(d));
        const xPoint = x(accessor.time(d));
        const xValue = xPoint - w2;

        return 'M' + xValue + ',' + high + 'l' + w + ',0M' + xPoint + ',' + high +
          'L' + xPoint + ',' + low + 'M' + xValue + ',' + low + 'l' + w + ',0';
      };
    }

    // Mixin 'superclass' methods and variables.
    plotMixin(quotebar, p)
      .plot(quoteAccessor(), binder)
      .width(binder)
      .dataSelector(plotMixin.dataMapper.array);
    binder();

    return quotebar;
  };
};
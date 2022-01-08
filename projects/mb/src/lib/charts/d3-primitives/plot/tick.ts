// Injected dependencies.
export const tick = function (tickAccessor: any, plot: any, plotMixin: any) {
  // Closure constructor.
  return function () {
    // Container for private, direct access mixed in variables.
    const p = {} as any;
    var tickGenerator: any;
    var lineWidthGenerator: any;

    function tick(g: any) {
      p.dataSelector(g).entry.append('path').attr('class', 'tick');
      tick.refresh(g);
    }

    tick.refresh = function (g: any) {
      p.dataSelector.select(g).select('path.tick').attr('d', tickGenerator)
        .style('stroke-width', lineWidthGenerator);
    };

    function binder() {
      tickGenerator = plot.joinPath(tickPath);
      lineWidthGenerator = plot.scaledStrokeWidth(p.xScale, 1, 2);
    }

    function tickPath() {
      const accessor = p.accessor;
      const x = p.xScale;
      const y = p.yScale;
      const w = p.width(x);
      const w2 = w / 2;

      return function (d: any) {
        const high = y(accessor.high(d));
        const low = y(accessor.low(d));
        const xPoint = x(accessor.time(d));
        const xValue = xPoint - w2;

        return 'M ' + xValue + ' ' + high + ' l ' + w + ' 0 M ' + xPoint + ' ' + high +
          ' L ' + xPoint + ' ' + low + ' M ' + xValue + ' ' + low + ' l ' + w + ' 0';
      };
    }

    // Mixin 'superclass' methods and variables.
    plotMixin(tick, p)
      .plot(tickAccessor(), binder)
      .width(binder)
      .dataSelector(plotMixin.dataMapper.array);
    binder();

    return tick;
  };
};
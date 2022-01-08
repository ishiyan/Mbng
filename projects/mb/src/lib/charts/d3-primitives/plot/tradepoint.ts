// Injected dependencies.
export const tradepoint = function (tradeAccessor: any, plot: any, plotMixin: any) {
  // Closure constructor,
  return function () {
    // Container for private, direct access mixed in variables.
    const p = {} as any;
    var pointGenerator: any;

    function tradepoint(g: any) {
      var group = p.dataSelector(g);
      group.entry.append('path').attr('class', 'point');
      tradepoint.refresh(g);
    }

    tradepoint.refresh = function (g: any) {
      // g.selectAll('path.point').attr('d', pointGenerator);
      p.dataSelector.select(g).select('path.point').attr('d', pointGenerator);
    };

    function binder() {
      pointGenerator = plot.joinPath(pointPath);
    }

    function pointPath() {
      const accessor = p.accessor;
      const x = p.xScale;
      const y = p.yScale;
      const w = p.width(x);
      const w2 = w / 2;

      return function (d: any) {
        const price = accessor.price(d);
        if (isNaN(price)) {
          return null;
        }

        const zero = 0; // y(0)
        const cy = y(price) - zero;
        const cx = x(accessor.time(d)) - w2;
        const r = 1.5;
        const r2 = r * 2;

        return 'M ' + (cx - r) + ',' + cy +
          ' a ' + r + ',' + r + ' 0 1,0 ' + r2 + ',0 a ' + r + ',' + r + ' 0 1,0 -' + r2 + ',0';
      };
    }

    // Mixin 'superclass' methods and variables.
    plotMixin(tradepoint, p)
      .plot(tradeAccessor(), binder)
      .width(binder)
      .dataSelector(plotMixin.dataMapper.array);
    binder();

    return tradepoint;
  };
};

// Injected dependencies.
export const quotepoint = function (quoteAccessor: any, plot: any, plotMixin: any) {
  // Closure constructor.
  return function () {
    // Container for private, direct access mixed in variables.
    const p = {} as any;
    var quotepointGenerator: any;

    function quotepoint(g: any) {
      var group = p.dataSelector(g);
      group.entry.append('path').attr('class', 'point');
      quotepoint.refresh(g);
    }

    quotepoint.refresh = function (g: any) {
      p.dataSelector.select(g).select('path.point').attr('d', quotepointGenerator);
    };

    function binder() {
      quotepointGenerator = plot.joinPath(quotepointPath);
    }

    function quotepointPath() {
      const accessor = p.accessor;
      const x = p.xScale;
      const y = p.yScale;
      const w = p.width(x);
      const w2 = w / w;

      return function (d: any) {
        const high = y(accessor.ask(d));
        const low = y(accessor.bid(d));
        const cyHigh = y(high); // - y(0)
        const cyLow = y(low); // - y(0)
        const cx = x(accessor.time(d)) - w2;
        const r = 1.5;
        const r2 = r * 2;

        return 'M' + (cx - r) + ',' + cyHigh +
          ' a' + r + ',' + r + ' 0 1,0 ' + r2 + ',0 a' + r + ',' + r + ' 0 1,0 -' + r2 + ',0' +
          'M' + (cx - r) + ',' + cyLow +
          ' a' + r + ',' + r + ' 0 1,0 ' + r2 + ',0 a' + r + ',' + r + ' 0 1,0 -' + r2 + ',0';
      };
    }

    // Mixin 'superclass' methods and variables.
    plotMixin(quotepoint, p)
      .plot(quoteAccessor(), binder)
      .width(binder)
      .dataSelector(plotMixin.dataMapper.array);
    binder();

    return quotepoint;
  };
};

// Injected dependencies.
export const quotepoint = (quoteAccessor: any, plot: any, plotMixin: any) =>
  // Closure constructor.
  () => {
    const p = {} as any;
    let quotepointGenerator: any;

    // eslint-disable-next-line no-underscore-dangle
    const quotepoint_ = (g: any) => {
      const group = p.dataSelector(g);
      group.entry.append('path').attr('class', 'point');
      quotepoint_.refresh(g);
    };

    quotepoint_.refresh = (g: any) => {
      p.dataSelector.select(g).select('path.point').attr('d', quotepointGenerator);
    };

    const binder = () => {
      quotepointGenerator = plot.joinPath(quotepointPath);
    };

    const quotepointPath = () => {
      const accessor = p.accessor;
      const x = p.xScale;
      const y = p.yScale;
      const w = p.width(x);
      const w2 = w / w;

      return (d: any) => {
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
    };

    // Mixin 'superclass' methods and variables.
    plotMixin(quotepoint_, p)
      .plot(quoteAccessor(), binder)
      .width(binder)
      .dataSelector(plotMixin.dataMapper.array);
    binder();

    return quotepoint_;
  };

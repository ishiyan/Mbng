// Injected dependencies.
export const tradepoint = (tradeAccessor: any, plot: any, plotMixin: any) =>
  // Closure constructor,
  () => {
    const p = {} as any;
    let pointGenerator: any;

    // eslint-disable-next-line no-underscore-dangle
    const tradepoint_ = (g: any) => {
      const group = p.dataSelector(g);
      group.entry.append('path').attr('class', 'point');
      tradepoint_.refresh(g);
    };

    tradepoint_.refresh = (g: any) => {
      // g.selectAll('path.point').attr('d', pointGenerator);
      p.dataSelector.select(g).select('path.point').attr('d', pointGenerator);
    };

    const binder = () => {
      pointGenerator = plot.joinPath(pointPath);
    };

    const pointPath = () => {
      const accessor = p.accessor;
      const x = p.xScale;
      const y = p.yScale;
      const w = p.width(x);
      const w2 = w / 2;

      return (d: any) => {
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
    };

    // Mixin 'superclass' methods and variables.
    plotMixin(tradepoint_, p)
      .plot(tradeAccessor(), binder)
      .width(binder)
      .dataSelector(plotMixin.dataMapper.array);
    binder();

    return tradepoint_;
  };

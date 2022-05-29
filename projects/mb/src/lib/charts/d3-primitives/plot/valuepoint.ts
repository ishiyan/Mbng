// Injected dependencies.
export const valuepoint = (valueAccessor: any, plot: any, plotMixin: any) =>
  // Closure constructor.
  () => {
    const p = {} as any;
    let pointGenerator: any;

    // eslint-disable-next-line no-underscore-dangle
    const valuepoint_ = (g: any) => {
      const group = p.dataSelector(g);
      group.entry.append('path').attr('class', 'point');
      valuepoint_.refresh(g);
    };

    valuepoint_.refresh = (g: any) => {
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
        const value = accessor.value(d);
        if (isNaN(value)) {
          return null;
        }

        const zero = 0; // y(0)
        const cy = y(value) - zero;
        const cx = x(accessor.time(d)) - w2;
        const r = 1.5;
        const r2 = r * 2;

        return 'M' + (cx - r) + ',' + cy +
          'a' + r + ',' + r + ' 0 1,0 ' + r2 + ',0a' + r + ',' + r + ' 0 1,0 -' + r2 + ',0';
      };
    };

    // Mixin 'superclass' methods and variables.
    plotMixin(valuepoint_, p)
      .plot(valueAccessor(), binder)
      .width(binder)
      .dataSelector(plotMixin.dataMapper.array);
    binder();

    return valuepoint_;
  };

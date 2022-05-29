// Injected dependencies.
export const tick = (tickAccessor: any, plot: any, plotMixin: any) =>
  // Closure constructor.
  () => {
    const p = {} as any;
    let tickGenerator: any;
    let lineWidthGenerator: any;

    // eslint-disable-next-line no-underscore-dangle
    const tick_ = (g: any) => {
      p.dataSelector(g).entry.append('path').attr('class', 'tick');
      tick_.refresh(g);
    };

    tick_.refresh = (g: any) => {
      p.dataSelector.select(g).select('path.tick').attr('d', tickGenerator)
        .style('stroke-width', lineWidthGenerator);
    };

    const binder = () => {
      tickGenerator = plot.joinPath(tickPath);
      lineWidthGenerator = plot.scaledStrokeWidth(p.xScale, 1, 2);
    };

    const tickPath = () => {
      const accessor = p.accessor;
      const x = p.xScale;
      const y = p.yScale;
      const w = p.width(x);
      const w2 = w / 2;

      return (d: any) => {
        const high = y(accessor.high(d));
        const low = y(accessor.low(d));
        const xPoint = x(accessor.time(d));
        const xValue = xPoint - w2;

        return 'M ' + xValue + ' ' + high + ' l ' + w + ' 0 M ' + xPoint + ' ' + high +
          ' L ' + xPoint + ' ' + low + ' M ' + xValue + ' ' + low + ' l ' + w + ' 0';
      };
    };

    // Mixin 'superclass' methods and variables.
    plotMixin(tick_, p)
      .plot(tickAccessor(), binder)
      .width(binder)
      .dataSelector(plotMixin.dataMapper.array);
    binder();

    return tick_;
  };

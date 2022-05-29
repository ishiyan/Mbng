// Injected dependencies.
export const quotebar = (quoteAccessor: any, plot: any, plotMixin: any) =>
  // Closure constructor.
  () => {
    const p = {} as any;
    let quotebarGenerator: any;
    let lineWidthGenerator: any;

    // eslint-disable-next-line no-underscore-dangle
    const quotebar_ = (g: any) => {
      p.dataSelector(g).entry.append('path').attr('class', 'quotebar');
      quotebar_.refresh(g);
    };

    quotebar_.refresh = (g: any) => {
      p.dataSelector.select(g).select('path.quotebar').attr('d', quotebarGenerator)
        .style('stroke-width', lineWidthGenerator);
    };

    const binder = () => {
      quotebarGenerator = plot.joinPath(quotebarPath);
      lineWidthGenerator = plot.scaledStrokeWidth(p.xScale, 1, 2);
    };

    const quotebarPath = () => {
      const accessor = p.accessor;
      const x = p.xScale;
      const y = p.yScale;
      const w = p.width(x);
      const w2 = w / 2;

      return (d: any) => {
        const high = y(accessor.ask(d));
        const low = y(accessor.bid(d));
        const xPoint = x(accessor.time(d));
        const xValue = xPoint - w2;

        return 'M' + xValue + ',' + high + 'l' + w + ',0M' + xPoint + ',' + high +
          'L' + xPoint + ',' + low + 'M' + xValue + ',' + low + 'l' + w + ',0';
      };
    };

    // Mixin 'superclass' methods and variables.
    plotMixin(quotebar_, p)
      .plot(quoteAccessor(), binder)
      .width(binder)
      .dataSelector(plotMixin.dataMapper.array);
    binder();

    return quotebar_;
  };

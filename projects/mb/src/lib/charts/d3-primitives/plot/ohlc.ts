// Injected dependencies.
export const ohlc = (ohlcvAccessor: any, plot: any, plotMixin: any) =>
  // Closure constructor.
  () => {
    const p = {} as any;
    let ohlcGenerator: any;
    let lineWidthGenerator: any;

    // eslint-disable-next-line no-underscore-dangle
    const ohlc_ = (g: any) => {
      plot.appendPathsUpDownEqual(p.dataSelector(g).selection, p.accessor, 'ohlc');
      ohlc_.refresh(g);
    };

    ohlc_.refresh = (g: any) => {
      g.selectAll('path.ohlc').attr('d', ohlcGenerator).style('stroke-width', lineWidthGenerator);
    };

    const binder = () => {
      ohlcGenerator = plot.joinPath(ohlcPath);
      lineWidthGenerator = plot.scaledStrokeWidth(p.xScale, 1, 2);
    };

    const ohlcPath = () => {
      const accessor = p.accessor;
      const x = p.xScale;
      const y = p.yScale;
      const w = p.width(x);
      const w2 = w / 2;

      return (d: any) => {
        const open = y(accessor.open(d));
        const close = y(accessor.close(d));
        const xPoint = x(accessor.time(d));
        const xValue = xPoint - w2;

        return 'M ' + xValue + ' ' +
          open + ' l ' + w2 + ' 0 M ' + xPoint + ' ' + y(accessor.high(d)) + ' L ' +
          xPoint + ' ' + y(accessor.low(d)) + ' M ' + xPoint + ' ' + close + ' l ' + w2 + ' 0';
      };
    };

    // Mixin 'superclass' methods and variables.
    plotMixin(ohlc_, p)
      .plot(ohlcvAccessor(), binder)
      .width(binder)
      .dataSelector(plotMixin.dataMapper.array);
    binder();

    return ohlc_;
  };

// Injected dependencies.
export const candlestick = (ohlcvAccessor: any, plot: any, plotMixin: any) =>
  // Closure constructor.
  () => {
    const p = {} as any;
    let bodyPathGenerator: any;
    let wickGenerator: any;
    let wickWidthGenerator: any;

    // eslint-disable-next-line no-underscore-dangle
    const candlestick_ = (g: any) => {
      const group = p.dataSelector(g);

      // 3x2 path's as wick and body can be styled slightly differently (stroke and fills).
      plot.appendPathsUpDownEqual(group.selection, p.accessor, ['candle', 'body']);
      plot.appendPathsUpDownEqual(group.selection, p.accessor, ['candle', 'wick']);

      candlestick_.refresh(g);
    };

    candlestick_.refresh = (g: any) => {
      g.selectAll('path.candle.body').attr('d', bodyPathGenerator).style('stroke-width', wickWidthGenerator);
      g.selectAll('path.candle.wick').attr('d', wickGenerator).style('stroke-width', wickWidthGenerator);
    };

    const binder = () => {
      bodyPathGenerator = plot.joinPath(bodyPath);
      wickGenerator = plot.joinPath(wickPath);
      wickWidthGenerator = plot.scaledStrokeWidth(p.xScale, 1, 4);
    };

    const bodyPath = () => {
      const accessor = p.accessor;
      const x = p.xScale;
      const y = p.yScale;
      const w = p.width(x);
      const w2 = w / 2;

      return (d: any) => {
        const open = y(accessor.open(d));
        const close = y(accessor.close(d));
        const xValue = x(accessor.time(d)) - w2;

        let path = 'M ' + xValue + ' ' + open + ' l ' + w + ' ' + 0;

        // Draw body only if there is a body (there is no stroke, so will not appear anyway).
        if (open !== close) {
          path += ' L ' + (xValue + w) + ' ' + close + ' l ' + -w + ' ' + 0 + ' L ' + xValue + ' ' + open;
        }

        return path;
      };
    };

    const wickPath = () => {
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

        // Top.
        let path = 'M ' + xPoint + ' ' + y(accessor.high(d)) + ' L ' + xPoint + ' ' + Math.min(open, close);

        // Draw another cross wick if there is no body.
        if (open === close) {
          path += ' M ' + xValue + ' ' + open + ' l ' + w + ' ' + 0;
        }

        // Bottom.
        return path + ' M ' + xPoint + ' ' + Math.max(open, close) + ' L ' + xPoint + ' ' + y(accessor.low(d));
      };
    };

    // Mixin 'superclass' methods and variables.
    plotMixin(candlestick_, p)
      .plot(ohlcvAccessor(), binder)
      .width(binder)
      .dataSelector(plotMixin.dataMapper.array);
    binder();

    return candlestick_;
  };

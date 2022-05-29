// Injected dependencies.
export const volume = (volumeAccessor: any, plot: any, plotMixin: any) =>
  // Closure function.
  () => {
    const p = {} as any;
    let volumeGenerator: any;

    // eslint-disable-next-line no-underscore-dangle
    const volume_ = (g: any) => {
      const group = p.dataSelector(g);

      if (isOhlcvAccessor()) {
        plot.appendPathsUpDownEqual(group.selection, p.accessor, 'volume');
      }
      else {
        group.entry.append('path').attr('class', 'volume');
      }

      volume_.refresh(g);
    };

    volume_.refresh = (g: any) => {
      if (isOhlcvAccessor()) {
        g.selectAll('path.volume').attr('d', volumeGenerator);
      }
      else {
        p.dataSelector.select(g).select('path.volume').attr('d', volumeGenerator);
      }
    };

    const binder = () => {
      volumeGenerator = plot.joinPath(volumePath);
    };

    const isOhlcvAccessor = () => p.accessor.open && p.accessor.close;

    const volumePath = () => {
      const accessor = p.accessor;
      const x = p.xScale;
      const y = p.yScale;
      const w = p.width(x);
      const w2 = w / 2;

      return (d: any) => {
        const vol = accessor.volume(d);
        if (isNaN(vol)) {
          return null;
        }

        const zero = y(0);
        const h = y(vol) - zero;
        const xValue = x(accessor.time(d)) - w2;

        return 'M ' + xValue + ' ' + zero + ' l 0 ' + h + ' l ' + w + ' 0 l 0 ' + (-h);
      };
    };

    // Mixin 'superclass' methods and variables.
    plotMixin(volume_, p)
      .plot(volumeAccessor(), binder)
      .width(binder)
      .dataSelector(plotMixin.dataMapper.array);
    binder();

    return volume_;
  };

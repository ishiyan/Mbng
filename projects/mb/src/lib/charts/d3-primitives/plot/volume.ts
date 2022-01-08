// Injected dependencies.
export const volume = function (volumeAccessor: any, plot: any, plotMixin: any) {
  // Closure function.
  return function () {
    // Container for private, direct access mixed in variables.
    const p = {} as any;
    var volumeGenerator: any;

    function volume(g: any) {
      var group = p.dataSelector(g);
      if (isOhlcvAccessor()) {
        plot.appendPathsUpDownEqual(group.selection, p.accessor, 'volume');
      }
      else {
        group.entry.append('path').attr('class', 'volume');
      }

      volume.refresh(g);
    }

    volume.refresh = function (g: any) {
      if (isOhlcvAccessor()) {
        g.selectAll('path.volume').attr('d', volumeGenerator);
      }
      else {
        p.dataSelector.select(g).select('path.volume').attr('d', volumeGenerator);
      }
    };

    function binder() {
      volumeGenerator = plot.joinPath(volumePath);
    }

    function isOhlcvAccessor() {
      return p.accessor.open && p.accessor.close;
    }

    function volumePath() {
      const accessor = p.accessor;
      const x = p.xScale;
      const y = p.yScale;
      const w = p.width(x);
      const w2 = w / 2;

      return function (d: any) {
        const vol = accessor.volume(d);
        if (isNaN(vol)) {
          return null;
        }

        const zero = y(0);
        const h = y(vol) - zero;
        const xValue = x(accessor.time(d)) - w2;

        return 'M ' + xValue + ' ' + zero + ' l 0 ' + h + ' l ' + w + ' 0 l 0 ' + (-h);
      };
    }

    // Mixin 'superclass' methods and variables.
    plotMixin(volume, p)
      .plot(volumeAccessor(), binder)
      .width(binder)
      .dataSelector(plotMixin.dataMapper.array);
    binder();

    return volume;
  };
};
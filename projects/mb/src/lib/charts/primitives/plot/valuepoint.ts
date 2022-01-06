export const valuepoint = function (accessor_value: any, plot: any, plotMixin: any) { // Injected dependencies
  return function () { // Closure constructor
    var p = {} as any, // Container for private, direct access mixed in variables
      pointGenerator: any;

    function valuepoint(g: any) {
      var group = p.dataSelector(g);
      group.entry.append('path').attr('class', 'point');
      valuepoint.refresh(g);
    }

    valuepoint.refresh = function (g: any) {
      // g.selectAll('path.point').attr('d', pointGenerator);
      p.dataSelector.select(g).select('path.point').attr('d', pointGenerator);
    };

    function binder() {
      pointGenerator = plot.joinPath(pointPath);
    }

    function pointPath() {
      var accessor = p.accessor,
        x = p.xScale,
        y = p.yScale,
        width = p.width(x);

      return function (d: any) {
        var value = accessor.v(d);
        if (isNaN(value)) return null;
        var zero = 0, // y(0),
          cy = y(value) - zero,
          cx = x(accessor.t(d)) - width / 2,
          r = 1.5;

        return 'M' + (cx - r) + ',' + cy +
          'a' + r + ',' + r + ' 0 1,0 ' + r * 2 + ',0a' + r + ',' + r + ' 0 1,0 -' + r * 2 + ',0';
      };
    }

    // Mixin 'superclass' methods and variables
    plotMixin(valuepoint, p).plot(accessor_value(), binder).width(binder).dataSelector(plotMixin.dataMapper.array);
    binder();

    return valuepoint;
  };
};

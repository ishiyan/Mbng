'use strict';

module.exports = function(d3_scale_linear, d3_extent, accessor_quote, plot, plotMixin) {  // Injected dependencies
  return function() { // Closure constructor
    var p = {},  // Container for private, direct access mixed in variables
        quotepointGenerator;

    function quotepoint(g) {
      var group = p.dataSelector(g);
      group.entry.append('path').attr('class', 'point');
      quotepoint.refresh(g);
    }

    quotepoint.refresh = function(g) {
      // g.selectAll('path.point').attr('d', pointGenerator);
      p.dataSelector.select(g).select('path.point').attr('d', quotepointGenerator);
    };

    function binder() {
      quotepointGenerator = plot.joinPath(quotepointPath);
    }

    function quotepointPath() {
      var accessor = p.accessor,
          x = p.xScale,
          y = p.yScale,
          width = p.width(x);

      return function(d) {
        const high = y(accessor.a(d)),
          low = y(accessor.b(d));

        const cyHigh = y(high), // - y(0),
          cyLow = y(low), // - y(0),
          cx = x(accessor.t(d)) - width/2,
          r = 1.5;

        return 'M' + (cx - r) + ',' + cyHigh +
          ' a' + r + ','  + r + ' 0 1,0 ' + r * 2 + ',0 a' + r + ','  + r + ' 0 1,0 -' + r * 2 + ',0' +
          'M' + (cx - r) + ',' + cyLow +
          ' a' + r + ','  + r + ' 0 1,0 ' + r * 2 + ',0 a' + r + ','  + r + ' 0 1,0 -' + r * 2 + ',0';
      };
    }

    // Mixin 'superclass' methods and variables
    plotMixin(quotepoint, p).plot(accessor_quote(), binder).width(binder).dataSelector(plotMixin.dataMapper.array);
    binder();

    return quotepoint;
  };
};

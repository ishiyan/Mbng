'use strict';

module.exports = function(d3_scale_linear, d3_extent, accessor_trade, plot, plotMixin) {  // Injected dependencies
  return function() { // Closure constructor
    var p = {},  // Container for private, direct access mixed in variables
        pointGenerator;

    function tradepoint(g) {
      var group = p.dataSelector(g);
      group.entry.append('path').attr('class', 'point');
      tradepoint.refresh(g);
    }

    tradepoint.refresh = function(g) {
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

      return function(d) {
        var price = accessor.p(d);
        if (isNaN(price)) return null;
        var zero = 0, // y(0),
          cy = y(price) - zero,
          cx = x(accessor.t(d)) - width/2,
          r = 1.5;

        return 'M ' + (cx - r) + ',' + cy +
          ' a ' + r + ','  + r + ' 0 1,0 ' + r * 2 + ',0 a ' + r + ','  + r + ' 0 1,0 -' + r * 2 + ',0';
      };
    }

    // Mixin 'superclass' methods and variables
    plotMixin(tradepoint, p).plot(accessor_trade(), binder).width(binder).dataSelector(plotMixin.dataMapper.array);
    binder();

    return tradepoint;
  };
};

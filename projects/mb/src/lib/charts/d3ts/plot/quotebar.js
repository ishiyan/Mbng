'use strict';

module.exports = function(d3_scale_linear, d3_extent, accessor_quote, plot, plotMixin) {  // Injected dependencies
  return function() { // Closure constructor
    var p = {},  // Container for private, direct access mixed in variables
        quotebarGenerator,
        lineWidthGenerator;

    function quotebar(g) {
      p.dataSelector(g).entry.append('path').attr('class', 'quotebar');

      quotebar.refresh(g);
    }

    quotebar.refresh = function(g) {
      p.dataSelector.select(g).select('path.quotebar').attr('d', quotebarGenerator).style('stroke-width', lineWidthGenerator);
    };

    function binder() {
      quotebarGenerator = plot.joinPath(quotebarPath);
      lineWidthGenerator = plot.scaledStrokeWidth(p.xScale, 1, 2);
    }

    function quotebarPath() {
      var accessor = p.accessor,
          x = p.xScale,
          y = p.yScale,
          width = p.width(x);

      return function(d) {
        const high = y(accessor.a(d)),
          low = y(accessor.b(d)),
          xPoint = x(accessor.t(d)),
          xValue = xPoint - width/2;

        return 'M' + xValue + ',' + high + 'l' + width + ',0M' + xPoint + ',' + high +
          'L' + xPoint + ',' + low + 'M' + xValue + ',' + low + 'l' + width + ',0';
      };
    }

    // Mixin 'superclass' methods and variables
    plotMixin(quotebar, p).plot(accessor_quote(), binder).width(binder).dataSelector(plotMixin.dataMapper.array);
    binder();

    return quotebar;
  };
};
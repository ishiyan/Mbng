'use strict';

module.exports = function(accessor_area, plot, plotMixin) {  // Injected dependencies
  return function() { // Closure function
    var p = {},  // Container for private, direct access mixed in variables
        svgArea = plot.pathArea();

    function area(g) {
      var group = p.dataSelector(g);
      group.entry.append('path').attr('class', 'area');
      area.refresh(g);
    }

    area.refresh = function(g) {
      p.dataSelector.select(g).select('path.area').attr('d', svgArea);
      // refresh(p.dataSelector.select(g), p.accessor, p.xScale, p.yScale, plot, svgArea);
    };

    function binder() {
      svgArea.init(p.accessor.t, p.xScale, p.accessor, p.yScale, 0);
    }

    // Mixin 'superclass' methods and variables
    plotMixin(area, p).plot(accessor_area(), binder).dataSelector(plotMixin.dataMapper.array);
    binder();

    return area;
  };
};

function refresh(selection, accessor, x, y, plot, svgArea) {
  selection.select('path.area').attr('d', svgArea);
}

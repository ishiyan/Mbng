export const area = function (accessor_area: any, plot: any, plotMixin: any) { // Injected dependencies
  return function () { // Closure function
    var p = {} as any, // Container for private, direct access mixed in variables
      svgArea = plot.pathArea();

    function area(g: any) {
      var group = p.dataSelector(g);
      group.entry.append('path').attr('class', 'area');
      area.refresh(g);
    }

    area.refresh = function (g: any) {
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

function refresh(selection: any, accessor: any, x: any, y: any, plot: any, svgArea: any) {
  selection.select('path.area').attr('d', svgArea);
}

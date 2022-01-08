// Injected dependencies.
export const area = function (areaAccessor: any, plot: any, plotMixin: any) {
  // Closure function.
  return function () {
    // Container for private, direct access mixed in variables.
    const p = {} as any;
    const svgArea = plot.pathArea();

    function area(g: any) {
      var group = p.dataSelector(g);
      group.entry.append('path').attr('class', 'area');
      area.refresh(g);
    }

    area.refresh = function (g: any) {
      p.dataSelector.select(g).select('path.area').attr('d', svgArea);
    };

    function binder() {
      svgArea.init(p.accessor.time, p.xScale, p.accessor, p.yScale, 0);
    }

    // Mixin 'superclass' methods and variables.
    plotMixin(area, p)
      .plot(areaAccessor(), binder)
      .dataSelector(plotMixin.dataMapper.array);
    binder();

    return area;
  };
};

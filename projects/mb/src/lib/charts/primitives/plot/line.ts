export const line = function (accessor_value: any, plot: any, plotMixin: any, showZero?: any) {  // Injected dependencies
  showZero = showZero || false;

  return function () { // Closure function
    var p = {} as any, // Container for private, direct access mixed in variables
      svgLine = plot.pathLine();

    function line(g: any) {
      var group = p.dataSelector(g);

      group.entry.append('path').attr('class', 'line');
      if (showZero) group.selection.append('path').attr('class', 'zero');

      line.refresh(g);
    }

    line.refresh = function (g: any) {
      refresh(p.dataSelector.select(g), p.accessor, p.xScale, p.yScale, plot, svgLine, showZero);
    };

    function binder() {
      svgLine.init(p.accessor.t, p.xScale, p.accessor, p.yScale);
    }

    // Mixin 'superclass' methods and variables
    plotMixin(line, p).plot(accessor_value(), binder).dataSelector(plotMixin.dataMapper.array);
    binder();

    return line;
  };
};

function refresh(selection: any, accessor: any, x: any, y: any, plot: any, svgLine: any, showZero: any) {
  selection.select('path.line').attr('d', svgLine);
  if (showZero) selection.select('path.zero').attr('d', plot.horizontalPathLine(accessor.t, x, accessor.z, y));
}
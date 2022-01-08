// Injected dependencies.
export const line = function (valueAccessor: any, plot: any, plotMixin: any, showZero?: any) {
  showZero = showZero || false;

  // Closure function.
  return function () {
    // Container for private, direct access mixed in variables.
    const p = {} as any;
    const svgLine = plot.pathLine();

    function line(g: any) {
      const group = p.dataSelector(g);
      group.entry.append('path').attr('class', 'line');

      if (showZero) {
        group.selection.append('path').attr('class', 'zero');
      }

      line.refresh(g);
    }

    line.refresh = function (g: any) {
      const selection = p.dataSelector.select(g);
      selection.select('path.line').attr('d', svgLine);

      if (showZero) {
        const accessor = p.accessor;
        selection.select('path.zero')
          .attr('d', plot.horizontalPathLine(accessor.time, p.xScale, accessor.zero, p.yScale));
      }
    };

    function binder() {
      svgLine.init(p.accessor.time, p.xScale, p.accessor, p.yScale);
    }

    // Mixin 'superclass' methods and variables.
    plotMixin(line, p)
      .plot(valueAccessor(), binder)
      .dataSelector(plotMixin.dataMapper.array);
    binder();

    return line;
  };
};

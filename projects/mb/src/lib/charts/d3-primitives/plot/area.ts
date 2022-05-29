// Injected dependencies.
export const area = (areaAccessor: any, plot: any, plotMixin: any) =>
  // Closure function.
  () => {
    const p = {} as any;
    const svgArea = plot.pathArea();

    // eslint-disable-next-line no-underscore-dangle
    const area_ = (g: any) => {
      const group = p.dataSelector(g);

      group.entry.append('path').attr('class', 'area');
      area_.refresh(g);
    };

    area_.refresh = (g: any) => {
      p.dataSelector.select(g).select('path.area').attr('d', svgArea);
    };

    const binder = () => {
      svgArea.init(p.accessor.time, p.xScale, p.accessor, p.yScale, 0);
    };

    // Mixin 'superclass' methods and variables.
    plotMixin(area_, p)
      .plot(areaAccessor(), binder)
      .dataSelector(plotMixin.dataMapper.array);
    binder();

    return area_;
  };

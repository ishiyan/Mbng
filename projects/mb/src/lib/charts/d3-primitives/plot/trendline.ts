import * as d3 from 'd3';

// Injected dependencies.
export const trendline = (trendlineAccessor: any, plot: any, plotMixin: any) => {
  // Closure function.
  // eslint-disable-next-line no-underscore-dangle
  const trendline_ = () => {
    // Container for private, direct access mixed in variables.
    const p = {} as any;
    const dispatch = d3.dispatch('mouseenter', 'mouseout', 'mousemove', 'drag', 'dragstart', 'dragend');

    // eslint-disable-next-line no-underscore-dangle
    const trendline__ = (g: any) => {
      const group = p.dataSelector(g);
      const trendlineGroup = group.entry.append('g').attr('class', 'trendline');

      trendlineGroup.append('path').attr('class', 'body');
      trendlineGroup.append('circle').attr('class', 'start').attr('r', 1);
      trendlineGroup.append('circle').attr('class', 'end').attr('r', 1);

      const interaction = group.entry.append('g')
        .attr('class', 'interaction')
        .style('opacity', 0)
        .style('fill', 'none')
        .call(plot.interaction.mousedispatch(dispatch));

      interaction.append('path').attr('class', 'body').style('stroke-width', '16px');
      interaction.append('circle').attr('class', 'start').attr('r', 8);
      interaction.append('circle').attr('class', 'end').attr('r', 8);

      trendline__.refresh(g);
    };

    trendline__.refresh = (g: any) => {
      refresh(p.dataSelector.select(g), p.accessor, p.xScale, p.yScale);
    };

    trendline__.drag = (g: any) => {
      g.selectAll('.interaction circle.start')
        .call(dragEnd(dispatch, p.accessor, p.accessor.startTime, p.xScale, p.accessor.startValue, p.yScale));
      g.selectAll('.interaction circle.end')
        .call(dragEnd(dispatch, p.accessor, p.accessor.endTime, p.xScale, p.accessor.endValue, p.yScale));
      g.selectAll('.interaction path.body')
        .call(dragBody(dispatch, p.accessor, p.xScale, p.yScale));
    };

    // Mixin 'superclass' methods and variables.
    plotMixin(trendline__, p)
      .dataSelector(plotMixin.dataMapper.unity)
      .plot(trendlineAccessor())
      .on(dispatch);

    return trendline__;
  };

  const dragEnd = (dispatch: any, accessor: any, xAccessor: any, x: any, yAccessor: any, y: any) => {
    const drag = d3.drag();
    drag
      .subject((_event: any, d: any) => ({ x: x(xAccessor(d)), y: y(yAccessor(d)) }))
      .on('drag', function(event: any, d: any) {
        updateEnd(xAccessor, x, event.x, yAccessor, y, event.y, d);
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        // @ts-ignore
        refresh(d3.select(this.parentNode.parentNode.parentNode), accessor, x, y);
        dispatch.call('drag', this, d);
      });

    return plot.interaction.dragStartEndDispatch(drag, dispatch);
  };

  const dragBody = (dispatch: any, accessor: any, x: any, y: any) => {
    // State information, grabs the start coords of the line.
    const dragStart = {} as any;
    const drag = d3.drag();

    drag
      .subject((_event: any, d: any) => {
          dragStart.start = { date: x(accessor.startTime(d)), value: y(accessor.startValue(d)) };
          dragStart.end = { date: x(accessor.endTime(d)), value: y(accessor.endValue(d)) };
          return { x: 0, y: 0 };
        })
      .on('drag', function(event: any, d: any) {
        updateEnd(accessor.startTime, x, event.x + dragStart.start.date,
          accessor.startValue, y, event.y + dragStart.start.value,
          d);
        updateEnd(accessor.endTime, x, event.x + dragStart.end.date,
          accessor.endValue, y, event.y + dragStart.end.value,
          d);
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        // @ts-ignore
        refresh(d3.select(this.parentNode.parentNode.parentNode), accessor, x, y);
        dispatch.call('drag', this, d);
      });

    return plot.interaction.dragStartEndDispatch(drag, dispatch);
  };

  const updateEnd = (xAccessor: any, x: any, xValue: any, yAccessor: any, y: any, yValue: any, d: any) => {
    const time = x.invert(xValue);
    if (time !== null && time !== undefined) {
      xAccessor(d, time);
    }

    yAccessor(d, y.invert(yValue));
  };

  return trendline_;
};

const refresh = (selection: any, accessor: any, x: any, y: any) => {
  selection.selectAll('path.body')
    .attr('d', trendlinePath(accessor, x, y));
  selection.selectAll('circle.start')
    .attr('cx', trendlineEndCX(accessor.startTime, x))
    .attr('cy', trendlineEndCY(accessor.startValue, y));
  selection.selectAll('circle.end')
    .attr('cx', trendlineEndCX(accessor.endTime, x))
    .attr('cy', trendlineEndCY(accessor.endValue, y));
};

const trendlinePath = (accessor: any, x: any, y: any) => (d: any) =>
  'M ' + x(accessor.startTime(d)) + ' ' + y(accessor.startValue(d)) +
  ' L ' + x(accessor.endTime(d)) + ' ' + y(accessor.endValue(d));

const trendlineEndCX = (xAccessor: any, x: any) => (d: any) => x(xAccessor(d));

const trendlineEndCY = (yAccessor: any, y: any) => (d: any) => y(yAccessor(d));

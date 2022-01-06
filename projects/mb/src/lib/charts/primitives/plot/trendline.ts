import * as d3 from 'd3';

export const trendline = function (accessor_trendline: any, plot: any, plotMixin: any) { // Injected dependencies
  function Trendline() { // Closure function
    var p = {} as any, // Container for private, direct access mixed in variables
      dispatch = d3.dispatch('mouseenter', 'mouseout', 'mousemove', 'drag', 'dragstart', 'dragend');

    function trendline(g: any) {
      var group = p.dataSelector(g),
        trendlineGroup = group.entry.append('g').attr('class', 'trendline');

      trendlineGroup.append('path').attr('class', 'body');
      trendlineGroup.append('circle').attr('class', 'start').attr('r', 1);
      trendlineGroup.append('circle').attr('class', 'end').attr('r', 1);

      var interaction = group.entry.append('g').attr('class', 'interaction').style('opacity', 0)
        .style('fill', 'none').call(plot.interaction.mousedispatch(dispatch));

      interaction.append('path').attr('class', 'body').style('stroke-width', '16px');
      interaction.append('circle').attr('class', 'start').attr('r', 8);
      interaction.append('circle').attr('class', 'end').attr('r', 8);

      trendline.refresh(g);
    }

    trendline.refresh = function (g: any) {
      refresh(p.dataSelector.select(g), p.accessor, p.xScale, p.yScale);
    };

    trendline.drag = function (g: any) {
      g.selectAll('.interaction circle.start')
        .call(dragEnd(dispatch, p.accessor, p.accessor.st, p.xScale, p.accessor.sv, p.yScale));
      g.selectAll('.interaction circle.end')
        .call(dragEnd(dispatch, p.accessor, p.accessor.et, p.xScale, p.accessor.ev, p.yScale));
      g.selectAll('.interaction path.body')
        .call(dragBody(dispatch, p.accessor, p.xScale, p.yScale));
    };

    // Mixin 'superclass' methods and variables
    plotMixin(trendline, p)
      .dataSelector(plotMixin.dataMapper.unity)
      .plot(accessor_trendline())
      .on(dispatch);

    return trendline;
  }

  function dragEnd(dispatch: any, accessor: any, accessor_x: any, x: any, accessor_y: any, y: any) {
    var drag = d3.drag();

    drag.subject(function (event: any, d: any) {
      return { x: x(accessor_x(d)), y: y(accessor_y(d)) };
    })
      .on('drag', function (event: any, d: any) {
        updateEnd(accessor_x, x, event.x, accessor_y, y, event.y, d);
        // @ts-ignore
        refresh(d3.select(this.parentNode.parentNode.parentNode), accessor, x, y);
        dispatch.call('drag', this, d);
      });

    return plot.interaction.dragStartEndDispatch(drag, dispatch);
  }

  const dragBody = function (dispatch: any, accessor: any, x: any, y: any) {
    var dragStart = {} as any, // State information, grabs the start coords of the line
      drag = d3.drag();

    drag.subject(function (event: any, d: any) {
      dragStart.start = { date: x(accessor.st(d)), value: y(accessor.sv(d)) };
      dragStart.end = { date: x(accessor.et(d)), value: y(accessor.ev(d)) };
      return { x: 0, y: 0 };
    })
      .on('drag', function (event: any, d: any) {
        updateEnd(accessor.st, x, event.x + dragStart.start.date,
          accessor.sv, y, event.y + dragStart.start.value,
          d);
        updateEnd(accessor.et, x, event.x + dragStart.end.date,
          accessor.ev, y, event.y + dragStart.end.value,
          d);
        // @ts-ignore
        refresh(d3.select(this.parentNode.parentNode.parentNode), accessor, x, y);
        dispatch.call('drag', this, d);
      });

    return plot.interaction.dragStartEndDispatch(drag, dispatch);
  }

  function updateEnd(accessor_x: any, x: any, xValue: any, accessor_y: any, y: any, yValue: any, d: any) {
    var date = x.invert(xValue);
    if (date !== null && date !== undefined) accessor_x(d, date);
    accessor_y(d, y.invert(yValue));
  }

  return Trendline;
};

function refresh(selection: any, accessor: any, x: any, y: any) {
  selection.selectAll('path.body').attr('d', trendlinePath(accessor, x, y));
  selection.selectAll('circle.start').attr('cx', trendlineEndCX(accessor.st, x)).attr('cy', trendlineEndCY(accessor.sv, y));
  selection.selectAll('circle.end').attr('cx', trendlineEndCX(accessor.et, x)).attr('cy', trendlineEndCY(accessor.ev, y));
}

function trendlinePath(accessor: any, x: any, y: any) {
  return function (d: any) {
    return 'M ' + x(accessor.st(d)) + ' ' + y(accessor.sv(d)) +
      ' L ' + x(accessor.et(d)) + ' ' + y(accessor.ev(d));
  };
}

function trendlineEndCX(accessor_x: any, x: any) {
  return function (d: any) { return x(accessor_x(d)); };
}

function trendlineEndCY(accessor_y: any, y: any) {
  return function (d: any) { return y(accessor_y(d)); };
}
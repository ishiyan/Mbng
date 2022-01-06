import * as d3 from 'd3';

export const supstance = function (accessor_supstance: any, plot: any, plotMixin: any) {
  function Supstance() { // Closure function
    var p = {} as any, // Container for private, direct access mixed in variables
      dispatch = d3.dispatch('mouseenter', 'mouseout', 'mousemove', 'drag', 'dragstart', 'dragend'),
      annotationComposer = plot.plotComposer().scope('composed-annotation')
        .plotScale(function (plot: any) { return plot.axis().scale(); });

    function supstance(g: any) {
      var group = p.dataSelector(g);

      group.entry.append('g').attr('class', 'supstance').append('path');

      group.entry.append('g').attr('class', 'axisannotation y').call(annotationComposer);

      var interaction = group.entry.append('g').attr('class', 'interaction').style('opacity', 0).style('fill', 'none')
        .call(plot.interaction.mousedispatch(dispatch));

      interaction.append('path').style('stroke-width', '16px');

      supstance.refresh(g);
    }

    supstance.refresh = function (g: any) {
      refresh(p.dataSelector.select(g), p.accessor, p.xScale, p.yScale, annotationComposer);
    };

    supstance.drag = function (g: any) {
      g.selectAll('.interaction path').call(dragBody(dispatch, p.accessor, p.xScale, p.yScale, annotationComposer));
    };

    supstance.annotation = function (_?: any) {
      if (!arguments.length) return annotationComposer.plots();
      annotationComposer.plots(_ instanceof Array ? _ : [_]);
      return supstance;
    };

    function binder() {
      annotationComposer.accessor(p.accessor.v).scale(p.yScale);
      return supstance;
    }

    // Mixin 'superclass' methods and variables
    plotMixin(supstance, p)
      .dataSelector(plotMixin.dataMapper.unity)
      .plot(accessor_supstance(), binder)
      .on(dispatch);

    // Further group configuration now that it's mixed in
    // Supstance is composed of annotations, we need to scope the group selection
    p.dataSelector.scope('supstance');

    return binder();
  }

  function dragBody(dispatch: any, accessor: any, x: any, y: any, annotationComposer: any) {
    var drag = d3.drag().subject(function (d: any) {
      return { x: 0, y: y(accessor(d)) };
    })
      .on('drag', function (event: any, d: any) {
        var value = y.invert(event.y),
          // Go up to the selected items parent only (not the list of items)
          // @ts-ignore
          g = d3.select(this.parentNode.parentNode);

        accessor.v(d, value);
        refresh(g, accessor, x, y, annotationComposer);
        dispatch.call('drag', this, d);
      });

    return plot.interaction.dragStartEndDispatch(drag, dispatch);
  }

  return Supstance;
};

function refresh(selection: any, accessor: any, x: any, y: any, annotationComposer: any) {
  selection.select('.supstance path').attr('d', supstancePath(accessor, x, y));
  selection.select('.interaction path').attr('d', supstancePath(accessor, x, y));
  selection.select('.axisannotation.y').call(annotationComposer.refresh);
}

function supstancePath(accessor: any, x: any, y: any) {
  return function (d: any) {
    var range;

    if (isSupstanceAccessor(accessor)) {
      range = [accessor.s(d), accessor.e(d)];
      range[0] = range[0] !== undefined ? x(range[0]) : x.range()[0];
      range[1] = range[1] !== undefined ? x(range[1]) : x.range()[1];
    }
    else range = x.range();

    return 'M ' + range[0] + ' ' + y(accessor(d)) +
      ' L ' + range[range.length - 1] + ' ' + y(accessor(d));
  };
}

function isSupstanceAccessor(accessor: any) {
  return accessor.s !== undefined && accessor.e !== undefined;
}
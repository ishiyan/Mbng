import * as d3 from 'd3';

export const crosshair = function (accessor_crosshair: any, plot: any, plotMixin: any) { // Injected dependencies
  return function () { // Closure function
    var p = {} as any, // Container for private, direct access mixed in variables
      dispatcher = d3.dispatch('enter', 'out', 'move'),
      verticalPathGenerator: any,
      horizontalPathGenerator: any,
      xAnnotationComposer = plot.plotComposer().scope('composed-annotation')
        .plotScale(function (plot: any) { return plot.axis().scale(); }),
      yAnnotationComposer = plot.plotComposer().scope('composed-annotation')
        .plotScale(function (plot: any) { return plot.axis().scale(); }),
      verticalWireRange: any,
      horizontalWireRange: any;

    function crosshair(g: any) {
      var group = p.dataSelector(g);

      group.entry.append('path').attr('class', 'horizontal wire');
      group.entry.append('path').attr('class', 'vertical wire');

      group.entry.append('g').attr('class', 'axisannotation x').call(xAnnotationComposer);
      group.entry.append('g').attr('class', 'axisannotation y').call(yAnnotationComposer);

      g.selectAll('rect').data([undefined]).enter().append('rect').style('fill', 'none').style('pointer-events', 'all');

      crosshair.refresh(g);
    }

    crosshair.refresh = function (g: any) {
      var xRange = p.xScale.range(),
        yRange = p.yScale.range(),
        group = p.dataSelector.select(g),
        pathVerticalSelection = group.select('path.vertical'),
        pathHorizontalSelection = group.select('path.horizontal'),
        xAnnotationSelection = group.select('g.axisannotation.x'),
        yAnnotationSelection = group.select('g.axisannotation.y');

      verticalPathGenerator = verticalPathLine();
      horizontalPathGenerator = horizontalPathLine();

      g.selectAll('rect')
        .attr('x', Math.min.apply(null, xRange))
        .attr('y', Math.min.apply(null, yRange))
        .attr('height', Math.abs(yRange[yRange.length - 1] - yRange[0]))
        .attr('width', Math.abs(xRange[xRange.length - 1] - xRange[0]))
        .on('mouseenter', function (event: any) {
          // @ts-ignore
          dispatcher.call('enter', this);
        })
        .on('mouseout', function (event: any) {
          // @ts-ignore
          dispatcher.call('out', this);
          // Redraw with null values to ensure when we enter again, there is nothing cached when redisplayed
          delete group.node().__coord__;
          initialiseWire(group.datum()); // Mutating data, don't need to manually pass down
          refresh(group, pathVerticalSelection, pathHorizontalSelection, xAnnotationSelection, yAnnotationSelection);
        })
        .on('mousemove', mousemoveRefresh(group, pathVerticalSelection, pathHorizontalSelection,
          xAnnotationSelection, yAnnotationSelection)
        );

      refresh(group, pathVerticalSelection, pathHorizontalSelection, xAnnotationSelection, yAnnotationSelection);
    };

    function mousemoveRefresh(selection: any, pathVerticalSelection: any, pathHorizontalSelection: any,
      xAnnotationSelection: any, yAnnotationSelection: any) {
      return function (event: any) {
        // Cache coordinates past this mouse move
        selection.node().__coord__ = d3.pointer(event);
        refresh(selection, pathVerticalSelection, pathHorizontalSelection, xAnnotationSelection, yAnnotationSelection);
      };
    }

    function refresh(selection: any, xPath: any, yPath: any, xAnnotationSelection: any, yAnnotationSelection: any) {
      var coords = selection.node().__coord__;

      if (coords !== undefined) {
        var d = selection.datum(),
          xNew = p.xScale.invert(coords[0]),
          yNew = p.yScale.invert(coords[1]),
          dispatch = xNew !== null && yNew !== null && (p.accessor.xv(d) !== xNew || p.accessor.yv(d) !== yNew);

        p.accessor.xv(d, xNew);
        p.accessor.yv(d, yNew);
        if (dispatch) dispatcher.call('move', selection.node(), d);
      }

      // Just before draw, convert the coords to
      xPath.attr('d', verticalPathGenerator);
      yPath.attr('d', horizontalPathGenerator);
      xAnnotationSelection.call(xAnnotationComposer.refresh);
      yAnnotationSelection.call(yAnnotationComposer.refresh);
      selection.attr('display', displayAttr);
    }

    crosshair.xAnnotation = function (_?: any) {
      if (!arguments.length) return xAnnotationComposer.plots();
      xAnnotationComposer.plots(_ instanceof Array ? _ : [_]);
      return binder();
    };

    crosshair.yAnnotation = function (_?: any) {
      if (!arguments.length) return yAnnotationComposer.plots();
      yAnnotationComposer.plots(_ instanceof Array ? _ : [_]);
      return binder();
    };

    crosshair.verticalWireRange = function (_?: any) {
      if (!arguments.length) return verticalWireRange;
      verticalWireRange = _;
      return binder();
    };

    crosshair.horizontalWireRange = function (_?: any) {
      if (!arguments.length) return horizontalWireRange;
      horizontalWireRange = _;
      return binder();
    };

    function binder() {
      xAnnotationComposer.accessor(p.accessor.xv).scale(p.xScale);
      yAnnotationComposer.accessor(p.accessor.yv).scale(p.yScale);
      return crosshair;
    }

    function horizontalPathLine() {
      var range = horizontalWireRange || p.xScale.range();

      return function (d: any) {
        if (p.accessor.yv(d) === null) return null;
        var value = p.yScale(p.accessor.yv(d));
        if (isNaN(value)) return null;
        return 'M ' + range[0] + ' ' + value + ' L ' + range[range.length - 1] + ' ' + value;
      };
    }

    function verticalPathLine() {
      var range = verticalWireRange || p.yScale.range();

      return function (d: any) {
        if (p.accessor.xv(d) === null) return null;
        var value = p.xScale(p.accessor.xv(d)),
          sr = p.xScale.range();
        if (value < Math.min(sr[0], sr[sr.length - 1]) || value > Math.max(sr[0], sr[sr.length - 1])) return null;
        return 'M ' + value + ' ' + range[0] + ' L ' + value + ' ' + range[range.length - 1];
      };
    }

    function initialiseWire(d?: any) {
      d = d || {};
      p.accessor.xv(d, null);
      p.accessor.yv(d, null);
      return d;
    }

    function isEmpty(d?: any) {
      return d === undefined || p.accessor.xv(d) === null || p.accessor.yv(d) === null;
    }

    function displayAttr(d?: any) {
      return isEmpty(d) ? 'none' : null;
    }

    // Mixin scale management and event listening
    plotMixin(crosshair, p).plot(accessor_crosshair(), binder)
      .dataSelector(function (d: any) {
        // Has the user set data? If not, put empty data ready for mouse over
        if (isEmpty(d)) return [initialiseWire()];
        else return [d];
      })
      .on(dispatcher);

    p.dataSelector.scope('crosshair');

    return binder();
  };
};
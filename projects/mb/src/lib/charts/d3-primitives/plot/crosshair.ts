import * as d3 from 'd3';

// Injected dependencies.
export const crosshair = (crosshairAccessor: any, plot: any, plotMixin: any) =>
  // Closure function.
  () => {
    const p = {} as any;
    const dispatcher = d3.dispatch('enter', 'out', 'move');
    const xAnnotationComposer = plot.plotComposer().scope('composed-annotation')
      .plotScale((plt: any) => plt.axis().scale());
    const yAnnotationComposer = plot.plotComposer().scope('composed-annotation')
      .plotScale((plt: any) => plt.axis().scale());
    let verticalPathGenerator: any;
    let horizontalPathGenerator: any;
    let verticalWireRange: any;
    let horizontalWireRange: any;

    // eslint-disable-next-line no-underscore-dangle
    const crosshair_ = (g: any) => {
      const group = p.dataSelector(g);

      group.entry.append('path').attr('class', 'horizontal wire');
      group.entry.append('path').attr('class', 'vertical wire');

      group.entry.append('g').attr('class', 'axisannotation x').call(xAnnotationComposer);
      group.entry.append('g').attr('class', 'axisannotation y').call(yAnnotationComposer);

      g.selectAll('rect').data([undefined]).enter().append('rect')
        .style('fill', 'none')
        .style('pointer-events', 'all');

      crosshair_.refresh(g);
    };

    crosshair_.refresh = (g: any) => {
      const xRange = p.xScale.range();
      const yRange = p.yScale.range();
      const group = p.dataSelector.select(g);
      const pathVerticalSelection = group.select('path.vertical');
      const pathHorizontalSelection = group.select('path.horizontal');
      const xAnnotationSelection = group.select('g.axisannotation.x');
      const yAnnotationSelection = group.select('g.axisannotation.y');

      verticalPathGenerator = verticalPathLine();
      horizontalPathGenerator = horizontalPathLine();

      g.selectAll('rect')
        .attr('x', Math.min.apply(null, xRange))
        .attr('y', Math.min.apply(null, yRange))
        .attr('height', Math.abs(yRange[yRange.length - 1] - yRange[0]))
        .attr('width', Math.abs(xRange[xRange.length - 1] - xRange[0]))
        .on('mouseenter', function() {
          // eslint-disable-next-line @typescript-eslint/ban-ts-comment
          // @ts-ignore
          dispatcher.call('enter', this);
        })
        .on('mouseout', function() {
          // eslint-disable-next-line @typescript-eslint/ban-ts-comment
          // @ts-ignore
          dispatcher.call('out', this);

          // Redraw with null values to ensure when we enter again, there is nothing cached when redisplayed.
          // eslint-disable-next-line no-underscore-dangle
          delete group.node().__coord__;

          // Mutating data, don't need to manually pass down.
          initialiseWire(group.datum());
          refresh(group, pathVerticalSelection, pathHorizontalSelection, xAnnotationSelection, yAnnotationSelection);
        })
        .on('mousemove', mousemoveRefresh(group, pathVerticalSelection, pathHorizontalSelection,
          xAnnotationSelection, yAnnotationSelection)
        );

      refresh(group, pathVerticalSelection, pathHorizontalSelection, xAnnotationSelection, yAnnotationSelection);
    };

    const mousemoveRefresh =
      (selection: any, pathVerticalSelection: any, pathHorizontalSelection: any, xAnnotationSelection: any, yAnnotationSelection: any) =>
        (event: any) => {
          // Cache coordinates past this mouse move.
          // eslint-disable-next-line no-underscore-dangle
          selection.node().__coord__ = d3.pointer(event);
          refresh(selection, pathVerticalSelection, pathHorizontalSelection, xAnnotationSelection, yAnnotationSelection);
        };

    const refresh = (selection: any, xPath: any, yPath: any, xAnnotationSelection: any, yAnnotationSelection: any) => {
      // eslint-disable-next-line no-underscore-dangle
      const coords = selection.node().__coord__;
      if (coords !== undefined) {
        const d = selection.datum();
        const xNew = p.xScale.invert(coords[0]);
        const yNew = p.yScale.invert(coords[1]);
        const dispatch = xNew !== null && yNew !== null
          && (p.accessor.x(d) !== xNew || p.accessor.y(d) !== yNew);

        p.accessor.x(d, xNew);
        p.accessor.y(d, yNew);
        if (dispatch) {
          dispatcher.call('move', selection.node(), d);
        }
      }

      // Just before draw, convert the coordinates to.
      xPath.attr('d', verticalPathGenerator);
      yPath.attr('d', horizontalPathGenerator);
      xAnnotationSelection.call(xAnnotationComposer.refresh);
      yAnnotationSelection.call(yAnnotationComposer.refresh);
      selection.attr('display', displayAttr);
    };

    /** Supports getter and setter. */
    // eslint-disable-next-line prefer-arrow/prefer-arrow-functions
    crosshair_.xAnnotation = function(_?: any) {
      if (!arguments.length) {
        return xAnnotationComposer.plots();
      }

      xAnnotationComposer.plots(_ instanceof Array ? _ : [_]);
      return binder();
    };

    /** Supports getter and setter. */
    // eslint-disable-next-line prefer-arrow/prefer-arrow-functions
    crosshair_.yAnnotation = function(_?: any) {
      if (!arguments.length) {
        return yAnnotationComposer.plots();
      }

      yAnnotationComposer.plots(_ instanceof Array ? _ : [_]);
      return binder();
    };

    /** Supports getter and setter. */
    // eslint-disable-next-line prefer-arrow/prefer-arrow-functions
    crosshair_.verticalWireRange = function(_?: any) {
      if (!arguments.length) {
        return verticalWireRange;
      }

      verticalWireRange = _;
      return binder();
    };

    /** Supports getter and setter. */
    // eslint-disable-next-line prefer-arrow/prefer-arrow-functions
    crosshair_.horizontalWireRange = function(_?: any) {
      if (!arguments.length) {
        return horizontalWireRange;
      }

      horizontalWireRange = _;
      return binder();
    };

    const binder = () => {
      xAnnotationComposer.accessor(p.accessor.x).scale(p.xScale);
      yAnnotationComposer.accessor(p.accessor.y).scale(p.yScale);
      return crosshair_;
    };

    const horizontalPathLine = () => {
      const range = horizontalWireRange || p.xScale.range();

      return (d: any) => {
        if (p.accessor.y(d) === null) {
          return null;
        }

        const value = p.yScale(p.accessor.y(d));
        if (isNaN(value)) {
          return null;
        }

        return 'M ' + range[0] + ' ' + value + ' L ' + range[range.length - 1] + ' ' + value;
      };
    };

    const verticalPathLine = () => {
      const range = verticalWireRange || p.yScale.range();

      return (d: any) => {
        if (p.accessor.x(d) === null) {
          return null;
        }

        const value = p.xScale(p.accessor.x(d));
        const sr = p.xScale.range();
        if (value < Math.min(sr[0], sr[sr.length - 1]) || value > Math.max(sr[0], sr[sr.length - 1])) {
          return null;
        }

        return 'M ' + value + ' ' + range[0] + ' L ' + value + ' ' + range[range.length - 1];
      };
    };

    const initialiseWire = (d?: any) => {
      d = d || {};
      p.accessor.x(d, null);
      p.accessor.y(d, null);
      return d;
    };

    const isEmpty = (d?: any) => d === undefined || p.accessor.x(d) === null || p.accessor.y(d) === null;

    const displayAttr = (d?: any) => isEmpty(d) ? 'none' : null;

    // Mixin scale management and event listening.
    plotMixin(crosshair_, p)
      .plot(crosshairAccessor(), binder)
      .dataSelector((d: any) =>
          // Has the user set data? If not, put empty data ready for mouse over.
          isEmpty(d) ? [initialiseWire()] : [d])
      .on(dispatcher);

    p.dataSelector.scope('crosshair');

    return binder();
  };

import * as d3 from 'd3';

export const plot = () => {
  const DataSelector = (mapper?: any) => {
    let key: any;
    let scope: any;
    let classes = ['data'];

    const dataSelect = (g: any) => {
      const selection = dataSelect.select(g).data(mapper, key);
      const ent = selection.enter().append('g').attr('class', arrayJoin(classes, ' '));
      selection.exit().remove();

      return {
        entry: ent,
        selection: ent.merge(selection)
      };
    };

    dataSelect.select = (g: any) => g.selectAll('g.' + arrayJoin(classes, '.'));

    /**
     * `DataSelector.mapper.unity`, `DataSelector.mapper.array`, or custom data mapper.
     */
    // eslint-disable-next-line prefer-arrow/prefer-arrow-functions
    dataSelect.mapper = function(_?: any) {
      if (!arguments.length) {
        return mapper;
      }

      mapper = _;
      return dataSelect;
    };

    // eslint-disable-next-line prefer-arrow/prefer-arrow-functions
    dataSelect.scope = function(_?: any) {
      if (!arguments.length) {
        return scope;
      }

      scope = _;
      classes = ['data', 'scope-' + scope];
      return dataSelect;
    };

    // eslint-disable-next-line prefer-arrow/prefer-arrow-functions
    dataSelect.key = function(_?: any) {
      if (!arguments.length) {
        return key;
      }

      key = _;
      return dataSelect;
    };

    return dataSelect;
  };

  DataSelector.mapper = {
    unity: (d: any) => d,
    array: (d: any) => [d]
  };

  const PathLine = () => {
    const d3Line = d3.line().curve(d3.curveMonotoneX);
    const line = (data: any) => d3Line(data);

    line.init = (timeAccessor: any, x: any, valueAccessor: any, y: any, offset: any) => d3Line
      .defined((d: any) => valueAccessor(d) !== null)
      .x((d: any) => x(timeAccessor(d), offset === undefined ? offset : offset(d)))
      .y((d: any) => y(valueAccessor(d)));

    line.d3 = () => d3Line;

    return line;
  };

  const PathArea = () => {
    const d3Area = d3.area().curve(d3.curveMonotoneX);
    const area = (data: any) => d3Area(data);

    area.init = (timeAccessor: any, x: any, valueAccessor: any, y: any, yBase: any) => d3Area
      .defined((d: any) => valueAccessor(d) !== null)
      .x((d: any) => x(timeAccessor(d)))
      .y0(() => y(yBase))
      .y1((d: any) => y(valueAccessor(d)));

    area.d3 = () => d3Area;

    return area;
  };

  const upDownEqual = (ohlcvAcessor: any) => ({
    up: (d: any) => ohlcvAcessor.open(d) < ohlcvAcessor.close(d),
    down: (d: any) => ohlcvAcessor.open(d) > ohlcvAcessor.close(d),
    equal: (d: any) => ohlcvAcessor.open(d) === ohlcvAcessor.close(d)
  });

  const appendPathsGroupBy = (g: any, ohlcvAcessor: any, plotName: any, classes: any) => {
    const plotNames = plotName instanceof Array ? plotName : [plotName];
    classes = classes || upDownEqual(ohlcvAcessor);

    Object.keys(classes).forEach((key) => {
        appendPlotTypePath(g, classes[key], plotNames, key);
      });
  };

  const appendPathsUpDownEqual = (g: any, ohlcvAcessor: any, plotName: any) => {
    appendPathsGroupBy(g, ohlcvAcessor, plotName, upDownEqual(ohlcvAcessor));
  };

  const appendPlotTypePath = (g: any, data: any, plotNames: any, direction: any) => {
    g.selectAll('path.' + arrayJoin(plotNames, '.') + '.' + direction)
      .data((d: any) => [d.filter(data)])
      .enter()
      .append('path')
      .attr('class', arrayJoin(plotNames, ' ') + ' ' + direction);
  };

  const barWidth = (x: any) => {
    if (x.band !== undefined) {
      return Math.max(x.band(), 1);
    }
    else {
      // If it's not a finance time, the user should specify the band calculation (or constant) on the plot.
      return 3;
    }
  };

  const arrayJoin = (array: any, delimiter: any) => {
    if (!array.length) {
      return;
    }

    let result = array[0];
    for (let i = 1; i < array.length; i++) {
      result += delimiter + array[i];
    }

    return result;
  };

  /**
   * Helper class assists the composition of multiple plots. Handles:
   * - Automatic transfer of data down to descendants.
   * - Automatic scaling of a value to the child ( value (parent) -> percent conversion for example).
   * - Plots must be of the same type, ie. Axis Annotation, Supstance).
   */
  const PlotComposer = () => {
    const dataSelector = DataSelector();
    let plotScale = (plt: any) => plt.scale();
    let plots = [] as any;
    let scale: any;
    let accessor: any;

    const plotComposer = (g: any) => {
      const group = dataSelector.mapper(() => plots.map(() => []))(g);

      group.selection.each(function(d: any, i: any) {
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        // @ts-ignore
        plots[i](d3.select(this));
      });

      plotComposer.refresh(g);
    };

    plotComposer.refresh = (g: any) => {
      dataSelector.select(g).data((d: any) => {
        const value = accessor(d);
        if (value === null || value === undefined) {
          return plots.map(() => []);
        }

        const y = scale(value);
        return plots.map((plt: any) => {
          const annotationValue = plotScale(plt) === scale ? value : plotScale(plt).invert(y);
          return [{ value: annotationValue }];
        });
      }).each(function(d: any, i: any) {
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        // @ts-ignore
        plots[i](d3.select(this));
      });
    };

    // eslint-disable-next-line prefer-arrow/prefer-arrow-functions
    plotComposer.plots = function(_?: any) {
      if (!arguments.length) {
        return plots;
      }

      plots = _;
      return plotComposer;
    };

    /** The scale of the parent. */
    // eslint-disable-next-line prefer-arrow/prefer-arrow-functions
    plotComposer.scale = function(_?: any) {
      if (!arguments.length) {
        return scale;
      }

      scale = _;
      return plotComposer;
    };

    /**
     * How do get a value from the root datum.
     *
     * @param _ A function taking d and returning a value.
     */
    // eslint-disable-next-line prefer-arrow/prefer-arrow-functions
    plotComposer.accessor = function(_?: any) {
      if (!arguments.length) {
        return accessor;
      }

      accessor = _;
      return plotComposer;
    };

    /** A string id that distinguishes this composed plot from another. */
    // eslint-disable-next-line prefer-arrow/prefer-arrow-functions
    plotComposer.scope = function(_?: any) {
      if (!arguments.length) {
        return dataSelector.scope();
      }

      dataSelector.scope(_);
      return plotComposer;
    };

    /** A function to obtain the scale of the child plots. */
    // eslint-disable-next-line prefer-arrow/prefer-arrow-functions
    plotComposer.plotScale = function(_?: any) {
      if (!arguments.length) {
        return plotScale;
      }

      plotScale = _;
      return plotComposer;
    };

    return plotComposer;
  };

  return {
    dataSelector: DataSelector,

    // eslint-disable-next-line object-shorthand
    appendPathsGroupBy: appendPathsGroupBy,

    // eslint-disable-next-line object-shorthand
    appendPathsUpDownEqual: appendPathsUpDownEqual,

    horizontalPathLine: (timeAccessor: any, x: any, valueAccessor: any, y: any) => (d: any) => {
      if (!d.length) {
        return null;
      }

      const firstDatum = d[0];
      const lastDatum = d[d.length - 1];

      return 'M ' + x(timeAccessor(firstDatum)) + ' ' + y(valueAccessor(firstDatum)) +
        ' L ' + x(timeAccessor(lastDatum)) + ' ' + y(valueAccessor(lastDatum));
    },

    pathLine: PathLine,

    pathArea: PathArea,

    // eslint-disable-next-line object-shorthand
    barWidth: barWidth,

    scaledStrokeWidth: (x: any, max: any, div: any) => {
      max = max || 1;
      div = div || 1;
      return () => Math.min(max, barWidth(x) / div) + 'px';
    },

    /**
     * @param path A path generator constructor function that will construct a function
     *             that takes data point and returns a path.
     */
    joinPath: (path: any) => (data: any) => arrayJoin(data.map(path()), ' '),

    interaction: {
      mousedispatch: (dispatch: any) => (selection: any) => selection
        .on('mouseenter', function(_event: any, d: any) {
          // eslint-disable-next-line @typescript-eslint/ban-ts-comment
          // @ts-ignore
          d3.select(this.parentNode).classed('mouseover', true);
          // eslint-disable-next-line @typescript-eslint/ban-ts-comment
          // @ts-ignore
          dispatch.call('mouseenter', this, d);
        })
        .on('mouseleave', function(_event: any, d: any) {
          // eslint-disable-next-line @typescript-eslint/ban-ts-comment
          // @ts-ignore
          const parentElement = d3.select(this.parentNode);
          if (!parentElement.classed('dragging')) {
            parentElement.classed('mouseover', false);
            // eslint-disable-next-line @typescript-eslint/ban-ts-comment
            // @ts-ignore
            dispatch.call('mouseout', this, d);
          }
        })
        .on('mousemove', function(_event: any, d: any) {
          // eslint-disable-next-line @typescript-eslint/ban-ts-comment
          // @ts-ignore
          dispatch.call('mousemove', this, d);
        }),

      dragStartEndDispatch: (drag: any, dispatch: any) => drag
        .on('start', function(_event: any, d: any) {
          // eslint-disable-next-line @typescript-eslint/ban-ts-comment
          // @ts-ignore
          d3.select(this.parentNode.parentNode).classed('dragging', true);
          // eslint-disable-next-line @typescript-eslint/ban-ts-comment
          // @ts-ignore
          dispatch.call('dragstart', this, d);
        })
        .on('end', function(_event: any, d: any) {
          // eslint-disable-next-line @typescript-eslint/ban-ts-comment
          // @ts-ignore
          d3.select(this.parentNode.parentNode).classed('dragging', false);
          // eslint-disable-next-line @typescript-eslint/ban-ts-comment
          // @ts-ignore
          dispatch.call('dragend', this, d);
        })
    },

    plotComposer: PlotComposer
  };
};

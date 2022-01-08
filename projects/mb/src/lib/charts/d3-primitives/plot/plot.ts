import * as d3 from 'd3';

export const plot = function () {
  function DataSelector(mapper?: any) {
    var key: any;
    var scope: any;
    var classes = ['data'];

    function dataSelect(g: any) {
      const selection = dataSelect.select(g).data(mapper, key);
      const entry = selection.enter().append('g').attr('class', arrayJoin(classes, ' '));
      selection.exit().remove();

      return {
        entry: entry,
        selection: entry.merge(selection)
      };
    }

    dataSelect.select = function (g: any) {
      return g.selectAll('g.' + arrayJoin(classes, '.'));
    };

    /**
     * `DataSelector.mapper.unity`, `DataSelector.mapper.array`, or custom data mapper.
     */
    dataSelect.mapper = function (_?: any) {
      if (!arguments.length) return mapper;
      mapper = _;
      return dataSelect;
    };

    dataSelect.scope = function (_?: any) {
      if (!arguments.length) return scope;
      scope = _;
      classes = ['data', 'scope-' + scope];
      return dataSelect;
    };

    dataSelect.key = function (_?: any) {
      if (!arguments.length) return key;
      key = _;
      return dataSelect;
    };

    return dataSelect;
  };

  DataSelector.mapper = {
    unity: function (d: any) { return d; },
    array: function (d: any) { return [d]; }
  };

  function PathLine() {
    const d3Line = d3.line().curve(d3.curveMonotoneX);

    function line(data: any) {
      return d3Line(data);
    }

    line.init = function (timeAccessor: any, x: any, valueAccessor: any, y: any, offset: any) {
      return d3Line
        .defined(function (d: any) { return valueAccessor(d) !== null; })
        .x(function (d: any) { return x(timeAccessor(d), offset === undefined ? offset : offset(d)); })
        .y(function (d: any) { return y(valueAccessor(d)); });
    };

    line.d3 = function () {
      return d3Line;
    };

    return line;
  }

  function PathArea() {
    const d3Area = d3.area().curve(d3.curveMonotoneX);

    function area(data: any) {
      return d3Area(data);
    }

    area.init = function (timeAccessor: any, x: any, valueAccessor: any, y: any, yBase: any) {
      return d3Area
        .defined(function (d: any) { return valueAccessor(d) !== null; })
        .x(function (d: any) { return x(timeAccessor(d)); })
        .y0(function (d: any) { return y(yBase); })
        .y1(function (d: any) { return y(valueAccessor(d)); });
    };

    area.d3 = function () {
      return d3Area;
    };

    return area;
  }

  function upDownEqual(ohlcvAcessor: any) {
    return {
      up: function (d: any) { return ohlcvAcessor.open(d) < ohlcvAcessor.close(d); },
      down: function (d: any) { return ohlcvAcessor.open(d) > ohlcvAcessor.close(d); },
      equal: function (d: any) { return ohlcvAcessor.open(d) === ohlcvAcessor.close(d); }
    };
  }

  function appendPathsGroupBy(g: any, ohlcvAcessor: any, plotName: any, classes: any) {
    const plotNames = plotName instanceof Array ? plotName : [plotName];

    classes = classes || upDownEqual(ohlcvAcessor);

    Object.keys(classes).forEach(function (key) {
      appendPlotTypePath(g, classes[key], plotNames, key);
    });
  }

  function appendPathsUpDownEqual(g: any, ohlcvAcessor: any, plotName: any) {
    appendPathsGroupBy(g, ohlcvAcessor, plotName, upDownEqual(ohlcvAcessor));
  }

  function appendPlotTypePath(g: any, data: any, plotNames: any, direction: any) {
    g.selectAll('path.' + arrayJoin(plotNames, '.') + '.' + direction)
      .data(function (d: any) { return [d.filter(data)]; })
      .enter()
      .append('path')
      .attr('class', arrayJoin(plotNames, ' ') + ' ' + direction);
  }

  function barWidth(x: any) {
    if (x.band !== undefined) {
      return Math.max(x.band(), 1);
    }
    else {
      // If it's not a finance time, the user should specify the band calculation (or constant) on the plot.
      return 3;
    }
  }

  function arrayJoin(array: any, delimiter: any) {
    if (!array.length) {
      return;
    }

    var result = array[0];
    for (var i = 1; i < array.length; i++) {
      result += delimiter + array[i];
    }

    return result;
  }

  /**
   * Helper class assists the composition of multiple plots. Handles:
   * - Automatic transfer of data down to descendants.
   * - Automatic scaling of a value to the child ( value (parent) -> percent conversion for example).
   * - Plots must be of the same type, ie. Axis Annotation, Supstance).
   */
  function PlotComposer() {
    const dataSelector = DataSelector();
    var plotScale = function (plot: any) { return plot.scale(); };
    var plots = [] as any;
    var scale: any;
    var accessor: any;

    function plotComposer(g: any) {
      const group = dataSelector.mapper(function () {
        return plots.map(function () { return []; });
      })(g);

      group.selection.each(function (d: any, i: any) {
        // @ts-ignore
        plots[i](d3.select(this));
      });

      plotComposer.refresh(g);
    }

    plotComposer.refresh = function (g: any) {
      dataSelector.select(g).data(function (d: any) {
        const value = accessor(d);
        if (value === null || value === undefined) {
          return plots.map(function () { return []; });
        }

        var y = scale(value);
        return plots.map(function (plot: any) {
          const annotationValue = plotScale(plot) === scale ? value : plotScale(plot).invert(y);
          return [{ value: annotationValue }];
        });
      }).each(function (d: any, i: any) {
        // @ts-ignore
        plots[i](d3.select(this));
      });
    };

    plotComposer.plots = function (_?: any) {
      if (!arguments.length) return plots;
      plots = _;
      return plotComposer;
    };

    /** The scale of the parent. */
    plotComposer.scale = function (_?: any) {
      if (!arguments.length) return scale;
      scale = _;
      return plotComposer;
    };

    /**
     * How do get a value from the root datum.
     * @param _ A function taking d and returning a value.
     */
    plotComposer.accessor = function (_?: any) {
      if (!arguments.length) return accessor;
      accessor = _;
      return plotComposer;
    };

    /** A string id that distinguishes this composed plot from another. */
    plotComposer.scope = function (_?: any) {
      if (!arguments.length) return dataSelector.scope();
      dataSelector.scope(_);
      return plotComposer;
    };

    /** A function to obtain the scale of the child plots. */
    plotComposer.plotScale = function (_?: any) {
      if (!arguments.length) return plotScale;
      plotScale = _;
      return plotComposer;
    };

    return plotComposer;
  }

  return {
    dataSelector: DataSelector,

    appendPathsGroupBy: appendPathsGroupBy,

    appendPathsUpDownEqual: appendPathsUpDownEqual,

    horizontalPathLine: function (timeAccessor: any, x: any, valueAccessor: any, y: any) {
      return function (d: any) {
        if (!d.length) {
          return null;
        }

        const firstDatum = d[0];
        const lastDatum = d[d.length - 1];

        return 'M ' + x(timeAccessor(firstDatum)) + ' ' + y(valueAccessor(firstDatum)) +
          ' L ' + x(timeAccessor(lastDatum)) + ' ' + y(valueAccessor(lastDatum));
      };
    },

    pathLine: PathLine,

    pathArea: PathArea,

    barWidth: barWidth,

    scaledStrokeWidth: function (x: any, max: any, div: any) {
      max = max || 1;
      div = div || 1;

      return function () {
        return Math.min(max, barWidth(x) / div) + 'px';
      };
    },

    /**
     * @param path A path generator constructor function that will construct a function
     *             that takes data point and returns a path.
     */
    joinPath: function (path: any) {
      return function (data: any) {
        return arrayJoin(data.map(path()), ' ');
      };
    },

    interaction: {
      mousedispatch: function (dispatch: any) {
        return function (selection: any) {
          return selection
            .on('mouseenter', function (event: any, d: any) {
              // @ts-ignore
              d3.select(this.parentNode).classed('mouseover', true);
              // @ts-ignore
              dispatch.call('mouseenter', this, d);
            })
            .on('mouseleave', function (event: any, d: any) {
              // @ts-ignore
              const parentElement = d3.select(this.parentNode);
              if (!parentElement.classed('dragging')) {
                parentElement.classed('mouseover', false);
                // @ts-ignore
                dispatch.call('mouseout', this, d);
              }
            })
            .on('mousemove', function (event: any, d: any) {
              // @ts-ignore
              dispatch.call('mousemove', this, d);
            });
        };
      },

      dragStartEndDispatch: function (drag: any, dispatch: any) {
        return drag
          .on('start', function (event: any, d: any) {
            // @ts-ignore
            d3.select(this.parentNode.parentNode).classed('dragging', true);
            // @ts-ignore
            dispatch.call('dragstart', this, d);
          })
          .on('end', function (event: any, d: any) {
            // @ts-ignore
            d3.select(this.parentNode.parentNode).classed('dragging', false);
            // @ts-ignore
            dispatch.call('dragend', this, d);
          });
      }
    },

    plotComposer: PlotComposer
  };
};
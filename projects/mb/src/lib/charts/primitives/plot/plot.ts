import * as d3 from 'd3';

export const plot = function () {
  function DataSelector(mapper?: any) {
    var key: any,
      scope: any,
      classes = ['data'];

    function dataSelect(g: any) {
      var selection = dataSelect.select(g).data(mapper, key),
        entry = selection.enter().append('g').attr('class', arrayJoin(classes, ' '));
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
     * DataSelector.mapper.unity, DataSelector.mapper.array, or custom data mapper
     * @param _
     * @returns {*}
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
    var d3Line = d3.line().curve(d3.curveMonotoneX);

    function line(data: any) {
      return d3Line(data);
    }

    line.init = function (accessor_time: any, x: any, accessor_value: any, y: any, offset: any) {
      return d3Line.defined(function (d: any) { return accessor_value(d) !== null; })
        .x(function (d: any) { return x(accessor_time(d), offset === undefined ? offset : offset(d)); })
        .y(function (d: any) { return y(accessor_value(d)); });
    };

    line.d3 = function () {
      return d3Line;
    };

    return line;
  }

  function PathArea() {
    var d3Area = d3.area().curve(d3.curveMonotoneX);

    function area(data: any) {
      return d3Area(data);
    }

    area.init = function (accessor_time: any, x: any, accessor_value: any, y: any, yBase: any) {
      return d3Area.defined(function (d: any) { return accessor_value(d) !== null; })
        .x(function (d: any) { return x(accessor_time(d)); })
        .y0(function (d: any) { return y(yBase); })
        .y1(function (d: any) { return y(accessor_value(d)); });
    };

    area.d3 = function () {
      return d3Area;
    };

    return area;
  }

  function upDownEqual(accessor: any) {
    return {
      up: function (d: any) { return accessor.o(d) < accessor.c(d); },
      down: function (d: any) { return accessor.o(d) > accessor.c(d); },
      equal: function (d: any) { return accessor.o(d) === accessor.c(d); }
    };
  }

  function appendPathsGroupBy(g: any, accessor: any, plotName: any, classes: any) {
    var plotNames = plotName instanceof Array ? plotName : [plotName];

    classes = classes || upDownEqual(accessor);

    Object.keys(classes).forEach(function (key) {
      appendPlotTypePath(g, classes[key], plotNames, key);
    });
  }

  function appendPathsUpDownEqual(g: any, accessor: any, plotName: any) {
    appendPathsGroupBy(g, accessor, plotName, upDownEqual(accessor));
  }

  function appendPlotTypePath(g: any, data: any, plotNames: any, direction: any) {
    g.selectAll('path.' + arrayJoin(plotNames, '.') + '.' + direction)
      .data(function (d: any) { return [d.filter(data)]; })
      .enter().append('path').attr('class', arrayJoin(plotNames, ' ') + ' ' + direction);
  }

  function barWidth(x: any) {
    if (x.band !== undefined) return Math.max(x.band(), 1);
    else return 3; // If it's not a finance time, the user should specify the band calculation (or constant) on the plot
  }

  function arrayJoin(array: any, delimiter: any) {
    if (!array.length) return;
    var result = array[0];
    for (var i = 1; i < array.length; i++) {
      result += delimiter + array[i];
    }
    return result;
  }

  /**
   * Helper class assists the composition of multiple plots. Handles:
   * - Automatic transfer of data down to descendants
   * - Automatic scaling of a value to the child ( value (parent) -> percent conversion for example)
   * - Plots must be of the same type, ie. Axis Annotation, Supstance)
   *
   * @returns {plotComposer} An instance
   * @constructor
   */
  function PlotComposer() {
    var dataSelector = DataSelector(),
      plots = [] as any,
      plotScale = function (plot: any) { return plot.scale(); },
      scale: any,
      accessor: any;

    function plotComposer(g: any) {
      var group = dataSelector.mapper(function () {
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
        var value = accessor(d);
        if (value === null || value === undefined) return plots.map(function () { return []; });
        var y = scale(value);
        return plots.map(function (plot: any) {
          var annotationValue = plotScale(plot) === scale ? value : plotScale(plot).invert(y);
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

    /**
     * The scale of the parent
     * @param _
     * @returns {*}
     */
    plotComposer.scale = function (_?: any) {
      if (!arguments.length) return scale;
      scale = _;
      return plotComposer;
    };

    /**
     * How do get a value from the root datum
     * @param _ A function taking d and returning a value
     * @returns {*}
     */
    plotComposer.accessor = function (_?: any) {
      if (!arguments.length) return accessor;
      accessor = _;
      return plotComposer;
    };

    /**
     * A string id that distinguishes this composed plot from another.
     * @param _
     * @returns {*}
     */
    plotComposer.scope = function (_?: any) {
      if (!arguments.length) return dataSelector.scope();
      dataSelector.scope(_);
      return plotComposer;
    };

    /**
     * A function to obtain the scale of the child plots
     * @param _
     * @returns {*}
     */
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

    horizontalPathLine: function (accessor_time: any, x: any, accessor_value: any, y: any) {
      return function (d: any) {
        if (!d.length) return null;

        var firstDatum = d[0],
          lastDatum = d[d.length - 1];

        return 'M ' + x(accessor_time(firstDatum)) + ' ' + y(accessor_value(firstDatum)) +
          ' L ' + x(accessor_time(lastDatum)) + ' ' + y(accessor_value(lastDatum));
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
     * @param path A path generator constructor function that will construct a function that takes data point and returns a path
     */
    joinPath: function (path: any) {
      return function (data: any) {
        return arrayJoin(data.map(path()), ' ');
      };
    },

    interaction: {
      mousedispatch: function (dispatch: any) {
        return function (selection: any) {
          return selection.on('mouseenter', function (event: any, d: any) {
            // @ts-ignore
            d3.select(this.parentNode).classed('mouseover', true);
            // @ts-ignore
            dispatch.call('mouseenter', this, d);
          })
            .on('mouseleave', function (event: any, d: any) {
              // @ts-ignore
              var parentElement = d3.select(this.parentNode);
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
        return drag.on('start', function (event: any, d: any) {
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
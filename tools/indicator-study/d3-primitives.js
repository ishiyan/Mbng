'use strict';

(function() {

  // ---------------------------------------------------------------------------
  // functor
  // ---------------------------------------------------------------------------
  var functor = function(v) { return typeof v === 'function' ? v : function() { return v; }; };

  // ---------------------------------------------------------------------------
  // rebind
  // ---------------------------------------------------------------------------
  var doRebind = function(target, source, method, postSetCallback) {
    return function() {
      var value = method.apply(source, arguments);
      if (postSetCallback && value === source) {
        postSetCallback();
      }
      return value === source ? target : value;
    };
  };

  var rebindCallback = function(target, source, postSetCallback) {
    var methods = Array.prototype.slice.call(arguments, 3);
    for (var i = 0; i < methods.length; i++) {
      var method = methods[i];
      target[method] = doRebind(target, source, source[method], postSetCallback);
    }
    return target;
  };

  // ---------------------------------------------------------------------------
  // accessors
  // ---------------------------------------------------------------------------
  var accessors_ohlcv = function() {
    var accessor = function(d) { return accessor.value(d); };
    accessor.time = function(d) { return d.time; };
    accessor.open = function(d) { return d.open; };
    accessor.high = function(d) { return d.high; };
    accessor.low = function(d) { return d.low; };
    accessor.close = function(d) { return d.close; };
    accessor.volume = function(d) { return d.volume; };
    accessor.value = accessor.close;

    accessor.withValue = function(fun) {
      accessor.value = fun;
      return accessor;
    };

    return accessor;
  };

  var accessors_volume = function() {
    var accessor = function(d) { return accessor.value(d); };
    accessor.time = function(d) { return d.time; };
    accessor.volume = function(d) { return d.volume; };
    accessor.value = accessor.volume;

    accessor.withValue = function(fun) {
      accessor.value = fun;
      return accessor;
    };

    return accessor;
  };

  var accessors_value = function() {
    var accessor = function(d) { return accessor.value(d); };
    accessor.time = function(d) { return d.time; };
    accessor.zero = function() { return 0; };
    accessor.value = function(d) { return d.value; };

    accessor.withZero = function(fun) {
      accessor.zero = fun;
      return accessor;
    };

    return accessor;
  };

  var accessors_trade = function() {
    var accessor = function(d) { return accessor.value(d); };
    accessor.time = function(d) { return d.time; };
    accessor.type = function(d) { return d.type; };
    accessor.price = function(d) { return d.price; };
    accessor.volume = function(d) { return d.volume; };
    accessor.value = accessor.price;

    accessor.withValue = function(fun) {
      accessor.value = fun;
      return accessor;
    };

    return accessor;
  };

  var accessors_quote = function() {
    var accessor = function(d) { return accessor.value(d); };
    accessor.time = function(d) { return d.time; };
    accessor.ask = function(d) { return d.askPrice; };
    accessor.bid = function(d) { return d.bidPrice; };
    accessor.mid = function(d) { return (d.askPrice + d.bidPrice) / 2; };
    accessor.spread = function(d) { return d.askPrice - d.bidPrice; };
    accessor.value = accessor.mid;
    accessor.price = accessor.mid;
    accessor.close = accessor.mid;

    accessor.withValue = function(fun) {
      accessor.value = fun;
      accessor.price = fun;
      accessor.close = fun;
      return accessor;
    };

    return accessor;
  };

  var accessors_tick = function() {
    var accessor = function(d) { return accessor.value(d); };
    accessor.time = function(d) { return d.time; };
    accessor.high = function(d) { return d.askPrice; };
    accessor.low = function(d) { return d.bidPrice; };
    accessor.spread = function(d) { return (d.askPrice - d.bidPrice) / 2; };
    accessor.value = accessor.spread;

    return accessor;
  };

  var accessors_crosshair = function() {
    var x = function(d, _) {
      if (arguments.length < 2) {
        return d.x;
      }
      d.x = _;
      return accessor;
    };

    var y = function(d, _) {
      if (arguments.length < 2) {
        return d.y;
      }
      d.y = _;
      return accessor;
    };

    var accessor = function(d) { return accessor.y(d); };
    accessor.x = x;
    accessor.y = y;

    return accessor;
  };

  var accessors_trendline = function() {
    var startTime = function(d, _) {
      if (arguments.length < 2) {
        return d.start.time;
      }
      d.start.time = _;
    };

    var startValue = function(d, _) {
      if (arguments.length < 2) {
        return d.start.value;
      }
      d.start.value = _;
    };

    var endTime = function(d, _) {
      if (arguments.length < 2) {
        return d.end.time;
      }
      d.end.time = _;
    };

    var endValue = function(d, _) {
      if (arguments.length < 2) {
        return d.end.value;
      }
      d.end.value = _;
    };

    var accessor = function(d) { return accessor.startValue(d); };

    accessor.startTime = startTime;
    accessor.startValue = startValue;
    accessor.endTime = endTime;
    accessor.endValue = endValue;

    return accessor;
  };

  var accessors_supstance = function() {
    var value = function(d, _) {
      if (arguments.length < 2) {
        return d.value;
      }
      d.value = _;
      return accessor;
    };

    var accessor = function(d) { return accessor.value(d); };
    accessor.start = function(d) { return d.start; };
    accessor.end = function(d) { return d.end; };
    accessor.value = value;

    return accessor;
  };

  var accessors_ = function() {
    return {
      value: accessors_value,
      ohlcv: accessors_ohlcv,
      volume: accessors_volume,
      quote: accessors_quote,
      trade: accessors_trade,
      tick: accessors_tick,
      crosshair: accessors_crosshair,
      trendline: accessors_trendline,
      supstance: accessors_supstance
    };
  };

  // ---------------------------------------------------------------------------
  // scale/zoomable
  // ---------------------------------------------------------------------------
  var zoomable_ = function() {
    function zoomable(linear, zoomed, domainLimit, clamp) {
      clamp = clamp !== undefined ? clamp : true;

      function scale() {
        return linear.apply(linear, arguments);
      }

      scale.invert = linear.invert;

      scale.domain = function(_) {
        if (!arguments.length) {
          return linear.domain();
        }

        if (clamp) {
          linear.domain([
            Math.max(domainLimit.domain[0], _[0]),
            Math.min(domainLimit.domain[1], _[1])
          ]);
        }
        else {
          linear.domain(_);
        }

        if (zoomed) {
          zoomed();
        }

        return scale;
      };

      scale.range = function() {
        if (!arguments.length) {
          return linear.range();
        }

        throw new Error('Zoomable is a read only range. Use this scale for zooming only.');
      };

      scale.copy = function() {
        return zoomable(linear.copy(), zoomed, domainLimit, clamp);
      };

      scale.clamp = function(_) {
        if (!arguments.length) {
          return clamp;
        }

        clamp = _;
        return scale;
      };

      return scale;
    }

    return zoomable;
  };

  // ---------------------------------------------------------------------------
  // scale/financetime
  // ---------------------------------------------------------------------------
  var d3_v3_multi_shim = function(multi) {
    return function(d) {
      for (var i = 0; i < multi.length; i++) {
        if (multi[i][1](d)) {
          return multi[i][0](d);
        }
      }
    };
  };

  var financetime_ = function(scaleWiden) {
    function fintime(tickMethods, genericFmt, index, domain,
      padding, outerPadding, zoomLimit, closestTicks, zoomable) {
      var dateIndexMap;
      var band = 3;
      var tickState = { tickFormat: tickMethods.daily[tickMethods.daily.length - 1][2] };

      index = index || d3.scaleLinear();
      domain = domain || [new Date(0), new Date(1)];
      padding = padding === undefined ? 0.2 : padding;
      outerPadding = outerPadding === undefined ? 0.65 : outerPadding;
      zoomLimit = zoomLimit || { domain: index.domain() };
      closestTicks = closestTicks || false;

      var zoomed = function() {
        band = rangeBand(index, domain, padding);
        return scale;
      };

      zoomable = zoomable || zoomable_()(index, zoomed, zoomLimit);

      var scale = function(x, offset) {
        var mappedIndex = dateIndexMap[x instanceof Date ? x.getTime() : +x];
        offset = offset || 0;

        if (mappedIndex === undefined) {
          if (domain[0] > x) {
            mappedIndex = -1;
          }
          else {
            mappedIndex = d3.bisect(domain, x);
          }
        }

        return index(mappedIndex + offset);
      };

      scale.invert = function(y) {
        var d = domain[scale.invertToIndex(y)];
        return d ? d : null;
      };

      scale.invertToIndex = function(y) { return Math.round(index.invert(y)); };

      scale.domain = function(_) {
        if (!arguments.length) {
          var visible = index.domain();

          if (visible[0] < 0 && visible[visible.length - 1] < 0) {
            return [];
          }

          visible = [
            Math.max(Math.ceil(visible[0]), 0),
            Math.min(Math.floor(visible[visible.length - 1]), domain.length - 1)
          ];

          return domain.slice(visible[0], visible[visible.length - 1] + 1);
        }

        domain = _;
        return applyDomain();
      };

      var domainMap = function() {
        dateIndexMap = lookupIndex(domain);
      };

      var applyDomain = function() {
        domainMap();
        index.domain([0, domain.length - 1]);
        zoomed();

        index.domain(index.range().map(scaleWiden(outerPadding, band)).map(index.invert));

        zoomLimit.domain = index.domain();
        return zoomed();
      };

      scale.copy = function() {
        return fintime(tickMethods, genericFmt, index.copy(), domain, padding, outerPadding, zoomLimit, closestTicks);
      };

      scale.band = function() { return band; };

      scale.outerPadding = function(_) {
        if (!arguments.length) {
          return outerPadding;
        }

        outerPadding = _;
        return applyDomain();
      };

      scale.padding = function(_) {
        if (!arguments.length) {
          return padding;
        }

        padding = _;
        return applyDomain();
      };

      scale.zoomable = function() { return zoomable; };

      scale.ticks = function(interval, steps) {
        var visibleDomain = scale.domain();
        var indexDomain = index.domain();

        if (!visibleDomain.length) {
          return [];
        }

        var method = interval === undefined ? tickMethod(visibleDomain, indexDomain, 10) :
          typeof interval === 'number' ? tickMethod(visibleDomain, indexDomain, interval) : null;

        tickState.tickFormat = method ? method[2] : tickMethod(visibleDomain, indexDomain, 10)[2];

        if (method) {
          interval = method[0];
          steps = method[1];
        }

        var intervalRange = interval.every(steps)
          .range(visibleDomain[0], +visibleDomain[visibleDomain.length - 1] + 1);

        return intervalRange
          .map(domainTicks(visibleDomain, closestTicks))
          .reduce(sequentialDuplicates, []);
      };

      var tickMethod = function(visibleDomain, indexDomain, count) {
        if (visibleDomain.length === 1) {
          return genericFmt;
        }

        var visibleDomainExtent = visibleDomain[visibleDomain.length - 1] - visibleDomain[0];

        var intraday = visibleDomainExtent / dailyStep < 1;
        var methods = intraday ? tickMethods.intraday : tickMethods.daily;
        var tickSteps = intraday ? intradayTickSteps : dailyTickSteps;
        var k = Math.min(Math.round(countK(visibleDomain, indexDomain) * count), count);

        var target = visibleDomainExtent / k;
        var i = d3.bisect(tickSteps, target);

        return i === methods.length ?
          methods[i - 1] :
          i ? methods[target / tickSteps[i - 1] < tickSteps[i] / target ? i - 1 : i] : methods[i];
      };

      scale.closestTicks = function(_) {
        if (!arguments.length) {
          return closestTicks;
        }

        closestTicks = _;
        return scale;
      };

      scale.tickFormat = function() {
        return function(date) { return tickState.tickFormat(date); };
      };

      rebindCallback(scale, index, zoomed, 'range');
      domainMap();
      return zoomed();
    }

    var rangeBand = function(linear, domain, padding) {
      return (Math.abs(linear(domain.length - 1) - linear(0)) / Math.max(1, domain.length - 1)) * (1 - padding);
    };

    var countK = function(visibleDomain, indexDomain) {
      return visibleDomain.length / (indexDomain[indexDomain.length - 1] - indexDomain[0]);
    };

    var lookupIndex = function(array) {
      var lookup = {};
      array.forEach(function(d, i) { lookup[+d] = i; });
      return lookup;
    };

    var domainTicks = function(visibleDomain, closest) {
      var visibleDomainLookup = lookupIndex(visibleDomain);

      return function(d) {
        var value = visibleDomainLookup[+d];
        if (value !== undefined) {
          return visibleDomain[value];
        }

        var index = d3.bisect(visibleDomain, d);
        if (closest && index > 0) {
          if ((+d - (+visibleDomain[index - 1])) < (+visibleDomain[index] - +d)) {
            index--;
          }
        }

        return visibleDomain[index];
      };
    };

    var sequentialDuplicates = function(previous, current) {
      if (previous.length === 0 || previous[previous.length - 1] !== current) {
        previous.push(current);
      }
      return previous;
    };

    var dailyStep = 864e5;
    var dailyTickSteps = [
      dailyStep,
      6048e5,
      2592e6,
      7776e6,
      31536e6
    ];
    var intradayTickSteps = [
      1e3, 5e3, 15e3, 3e4, 6e4, 3e5, 9e5, 18e5, 36e5, 108e5, 216e5, 432e5, dailyStep
    ];

    var dayFormat = d3.timeFormat('%b %e');
    var yearFormat = d3_v3_multi_shim([
      [d3.timeFormat('%b %Y'), function(d) { return d.getMonth(); }],
      [d3.timeFormat('%Y'), function() { return true; }]
    ]);
    var intradayFormat = d3_v3_multi_shim([
      [d3.timeFormat(':%S'), function(d) { return d.getSeconds(); }],
      [d3.timeFormat('%I:%M'), function(d) { return d.getMinutes(); }],
      [d3.timeFormat('%I %p'), function() { return true; }]
    ]);
    var genericFormat = [d3.timeSecond, 1, d3_v3_multi_shim([
      [d3.timeFormat(':%S'), function(d) { return d.getSeconds(); }],
      [d3.timeFormat('%I:%M'), function(d) { return d.getMinutes(); }],
      [d3.timeFormat('%I %p'), function(d) { return d.getHours(); }],
      [d3.timeFormat('%b %e'), function() { return true; }]
    ])];

    var dayFormatUtc = d3.utcFormat('%b %e');
    var yearFormatUtc = d3_v3_multi_shim([
      [d3.utcFormat('%b %Y'), function(d) { return d.getUTCMonth(); }],
      [d3.utcFormat('%Y'), function() { return true; }]
    ]);
    var intradayFormatUtc = d3_v3_multi_shim([
      [d3.utcFormat(':%S'), function(d) { return d.getUTCSeconds(); }],
      [d3.utcFormat('%I:%M'), function(d) { return d.getUTCMinutes(); }],
      [d3.utcFormat('%I %p'), function() { return true; }]
    ]);
    var genericFormatUtc = [d3.timeSecond, 1, d3_v3_multi_shim([
      [d3.utcFormat(':%S'), function(d) { return d.getUTCSeconds(); }],
      [d3.utcFormat('%I:%M'), function(d) { return d.getUTCMinutes(); }],
      [d3.utcFormat('%I %p'), function(d) { return d.getUTCHours(); }],
      [d3.utcFormat('%b %e'), function() { return true; }]
    ])];

    var dailyTickMethod = [
      [d3.timeDay, 1, dayFormat],
      [d3.timeMonday, 1, dayFormat],
      [d3.timeMonth, 1, yearFormat],
      [d3.timeMonth, 3, yearFormat],
      [d3.timeYear, 1, yearFormat]
    ];
    var intradayTickMethod = [
      [d3.timeSecond, 1, intradayFormat],
      [d3.timeSecond, 5, intradayFormat],
      [d3.timeSecond, 15, intradayFormat],
      [d3.timeSecond, 30, intradayFormat],
      [d3.timeMinute, 1, intradayFormat],
      [d3.timeMinute, 5, intradayFormat],
      [d3.timeMinute, 15, intradayFormat],
      [d3.timeMinute, 30, intradayFormat],
      [d3.timeHour, 1, intradayFormat],
      [d3.timeHour, 3, intradayFormat],
      [d3.timeHour, 6, intradayFormat],
      [d3.timeHour, 12, intradayFormat],
      [d3.timeDay, 1, dayFormat]
    ];

    var dailyTickMethodUtc = [
      [d3.utcDay, 1, dayFormatUtc],
      [d3.utcMonday, 1, dayFormatUtc],
      [d3.utcMonth, 1, yearFormatUtc],
      [d3.utcMonth, 3, yearFormatUtc],
      [d3.utcYear, 1, yearFormatUtc]
    ];
    var intradayTickMethodUtc = [
      [d3.utcSecond, 1, intradayFormatUtc],
      [d3.utcSecond, 5, intradayFormatUtc],
      [d3.utcSecond, 15, intradayFormatUtc],
      [d3.utcSecond, 30, intradayFormatUtc],
      [d3.utcMinute, 1, intradayFormatUtc],
      [d3.utcMinute, 5, intradayFormatUtc],
      [d3.utcMinute, 15, intradayFormatUtc],
      [d3.utcMinute, 30, intradayFormatUtc],
      [d3.utcHour, 1, intradayFormatUtc],
      [d3.utcHour, 3, intradayFormatUtc],
      [d3.utcHour, 6, intradayFormatUtc],
      [d3.utcHour, 12, intradayFormatUtc],
      [d3.utcDay, 1, dayFormatUtc]
    ];

    var scaleFinancetime = function() {
      return fintime({ daily: dailyTickMethod, intraday: intradayTickMethod }, genericFormat);
    };

    scaleFinancetime.utc = function() {
      return fintime({ daily: dailyTickMethodUtc, intraday: intradayTickMethodUtc }, genericFormatUtc);
    };

    return scaleFinancetime;
  };

  // ---------------------------------------------------------------------------
  // scale/index
  // ---------------------------------------------------------------------------
  var widen = function(widening, width) {
    widening = widening || 0;

    return function(d, i, array) {
      if (array.length > 2) {
        throw new Error('array.length > 2 unsupported. array.length = ' + array.length);
      }

      width = width || (array[array.length - 1] - array[0]);
      return d + (i * 2 - 1) * width * widening;
    };
  };

  var pathDomain = function(data, accessor, widening) {
    return data.length > 0 ? d3.extent(data, accessor).map(widen(widening)) : [];
  };

  var pathScale = function(data, accessor, widening) {
    return d3.scaleLinear().domain(pathDomain(data, accessor, widening));
  };

  var mapReduceFilter = function(data, map) {
    return data
      .map(map)
      .reduce(function(a, b) { return a.concat(b); })
      .filter(function(d) { return d !== null; });
  };

  var scale_ = function() {
    var accessors = accessors_();
    var fintime = financetime_(widen);

    var ohlcv = function(data, accessor, widening) {
      accessor = accessor || accessors.ohlcv();
      widening = widening === undefined ? 0.02 : widening;
      var low = accessor.low;
      var high = accessor.high;
      return d3.scaleLinear()
        .domain([d3.min(data.map(low)), d3.max(data.map(high))].map(widen(widening)));
    };

    var quote = function(data, accessor, widening) {
      accessor = accessor || accessors.quote();
      widening = widening === undefined ? 0.02 : widening;
      var bid = accessor.bid;
      var ask = accessor.ask;
      return d3.scaleLinear()
        .domain([d3.min(data.map(bid)), d3.max(data.map(ask))].map(widen(widening)));
    };

    var pathWithValueAccessor = function(data, accessor, widening) {
      accessor = accessor || accessors.value();
      widening = widening === undefined ? 0.02 : widening;
      return pathScale(data, accessor, widening);
    };

    return {
      financetime: fintime,

      plot: {
        candlestick: ohlcv,
        ohlc: ohlcv,
        tick: ohlcv,

        closeline: pathWithValueAccessor,
        tradeline: pathWithValueAccessor,
        valueline: pathWithValueAccessor,
        tradepoint: pathWithValueAccessor,
        valuepoint: pathWithValueAccessor,

        quotepoint: quote,
        quotebar: quote,

        percent: function(scale, reference) {
          var domain = scale.domain();
          reference = reference || domain[0];
          return scale
            .copy()
            .domain([domain[0], domain[domain.length - 1]]
              .map(function(d) { return (d - reference) / reference; }));
        },

        supstance: function(data, accessor, widening) {
          accessor = accessor || accessors.supstance();
          widening = widening === undefined ? 0.02 : widening;
          return pathScale(data, accessor.value, widening);
        },

        time: function(data, accessor) {
          accessor = accessor || accessors.value();
          return fintime().domain(data.map(accessor.time));
        },

        tradearrow: function(data, accessor, widening) {
          accessor = accessor || accessors.trade();
          widening = widening === undefined ? 0.02 : widening;
          return pathScale(data, accessor.price, widening);
        },

        trendline: function(data, accessor, widening) {
          accessor = accessor || accessors.trendline();
          widening = widening === undefined ? 0.04 : widening;
          var values = mapReduceFilter(data,
            function(d) { return [accessor.startValue(d), accessor.endValue(d)]; });
          return d3.scaleLinear().domain(d3.extent(values).map(widen(widening)));
        },

        volume: function(data, accessor) {
          accessor = accessor || accessors.ohlcv();
          return d3.scaleLinear()
            .domain([0, d3.max(data.map(accessor.volume)) * 1.15]);
        }
      }
    };
  };

  // ---------------------------------------------------------------------------
  // plot/plot
  // ---------------------------------------------------------------------------
  var plot_ = function() {
    var DataSelector = function(mapper) {
      var key;
      var scope;
      var classes = ['data'];

      var dataSelect = function(g) {
        var selection = dataSelect.select(g).data(mapper, key);
        var ent = selection.enter().append('g').attr('class', arrayJoin(classes, ' '));
        selection.exit().remove();

        return {
          entry: ent,
          selection: ent.merge(selection)
        };
      };

      dataSelect.select = function(g) { return g.selectAll('g.' + arrayJoin(classes, '.')); };

      dataSelect.mapper = function(_) {
        if (!arguments.length) {
          return mapper;
        }
        mapper = _;
        return dataSelect;
      };

      dataSelect.scope = function(_) {
        if (!arguments.length) {
          return scope;
        }
        scope = _;
        classes = ['data', 'scope-' + scope];
        return dataSelect;
      };

      dataSelect.key = function(_) {
        if (!arguments.length) {
          return key;
        }
        key = _;
        return dataSelect;
      };

      return dataSelect;
    };

    DataSelector.mapper = {
      unity: function(d) { return d; },
      array: function(d) { return [d]; }
    };

    var PathLine = function() {
      var d3Line = d3.line().curve(d3.curveMonotoneX);
      var line = function(data) { return d3Line(data); };

      line.init = function(timeAccessor, x, valueAccessor, y, offset) {
        return d3Line
          .defined(function(d) { return valueAccessor(d) !== null; })
          .x(function(d) { return x(timeAccessor(d), offset === undefined ? offset : offset(d)); })
          .y(function(d) { return y(valueAccessor(d)); });
      };

      line.d3 = function() { return d3Line; };

      return line;
    };

    var PathArea = function() {
      var d3Area = d3.area().curve(d3.curveMonotoneX);
      var area = function(data) { return d3Area(data); };

      area.init = function(timeAccessor, x, valueAccessor, y, yBase) {
        return d3Area
          .defined(function(d) { return valueAccessor(d) !== null; })
          .x(function(d) { return x(timeAccessor(d)); })
          .y0(function() { return y.range()[0]; })
          .y1(function(d) { return y(valueAccessor(d)); });
      };

      area.d3 = function() { return d3Area; };

      return area;
    };

    var upDownEqual = function(ohlcvAcessor) {
      return {
        up: function(d) { return ohlcvAcessor.open(d) < ohlcvAcessor.close(d); },
        down: function(d) { return ohlcvAcessor.open(d) > ohlcvAcessor.close(d); },
        equal: function(d) { return ohlcvAcessor.open(d) === ohlcvAcessor.close(d); }
      };
    };

    var appendPathsGroupBy = function(g, ohlcvAcessor, plotName, classes) {
      var plotNames = plotName instanceof Array ? plotName : [plotName];
      classes = classes || upDownEqual(ohlcvAcessor);

      Object.keys(classes).forEach(function(key) {
        appendPlotTypePath(g, classes[key], plotNames, key);
      });
    };

    var appendPathsUpDownEqual = function(g, ohlcvAcessor, plotName) {
      appendPathsGroupBy(g, ohlcvAcessor, plotName, upDownEqual(ohlcvAcessor));
    };

    var appendPlotTypePath = function(g, data, plotNames, direction) {
      g.selectAll('path.' + arrayJoin(plotNames, '.') + '.' + direction)
        .data(function(d) { return [d.filter(data)]; })
        .enter()
        .append('path')
        .attr('class', arrayJoin(plotNames, ' ') + ' ' + direction);
    };

    var barWidth = function(x) {
      if (x.band !== undefined) {
        return Math.max(x.band(), 1);
      }
      else {
        return 3;
      }
    };

    var arrayJoin = function(array, delimiter) {
      if (!array.length) {
        return '';
      }

      var result = array[0];
      for (var i = 1; i < array.length; i++) {
        result += delimiter + array[i];
      }

      return result;
    };

    var PlotComposer = function() {
      var dataSelector = DataSelector();
      var plotScale = function(plt) { return plt.scale(); };
      var plots = [];
      var scale;
      var accessor;

      var plotComposer = function(g) {
        var group = dataSelector.mapper(function() { return plots.map(function() { return []; }); })(g);

        group.selection.each(function(d, i) {
          plots[i](d3.select(this));
        });

        plotComposer.refresh(g);
      };

      plotComposer.refresh = function(g) {
        dataSelector.select(g).data(function(d) {
          var value = accessor(d);
          if (value === null || value === undefined) {
            return plots.map(function() { return []; });
          }

          var y = scale(value);
          return plots.map(function(plt) {
            var annotationValue = plotScale(plt) === scale ? value : plotScale(plt).invert(y);
            return [{ value: annotationValue }];
          });
        }).each(function(d, i) {
          plots[i](d3.select(this));
        });
      };

      plotComposer.plots = function(_) {
        if (!arguments.length) {
          return plots;
        }
        plots = _;
        return plotComposer;
      };

      plotComposer.scale = function(_) {
        if (!arguments.length) {
          return scale;
        }
        scale = _;
        return plotComposer;
      };

      plotComposer.accessor = function(_) {
        if (!arguments.length) {
          return accessor;
        }
        accessor = _;
        return plotComposer;
      };

      plotComposer.scope = function(_) {
        if (!arguments.length) {
          return dataSelector.scope();
        }
        dataSelector.scope(_);
        return plotComposer;
      };

      plotComposer.plotScale = function(_) {
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
      appendPathsGroupBy: appendPathsGroupBy,
      appendPathsUpDownEqual: appendPathsUpDownEqual,

      horizontalPathLine: function(timeAccessor, x, valueAccessor, y) {
        return function(d) {
          if (!d.length) {
            return null;
          }

          var firstDatum = d[0];
          var lastDatum = d[d.length - 1];

          return 'M ' + x(timeAccessor(firstDatum)) + ' ' + y(valueAccessor(firstDatum)) +
            ' L ' + x(timeAccessor(lastDatum)) + ' ' + y(valueAccessor(lastDatum));
        };
      },

      pathLine: PathLine,
      pathArea: PathArea,
      barWidth: barWidth,

      scaledStrokeWidth: function(x, max, div) {
        max = max || 1;
        div = div || 1;
        return function() { return Math.min(max, barWidth(x) / div) + 'px'; };
      },

      joinPath: function(path) {
        return function(data) { return arrayJoin(data.map(path()), ' '); };
      },

      interaction: {
        mousedispatch: function(dispatch) {
          return function(selection) {
            return selection
              .on('mouseenter', function(_event, d) {
                d3.select(this.parentNode).classed('mouseover', true);
                dispatch.call('mouseenter', this, d);
              })
              .on('mouseleave', function(_event, d) {
                var parentElement = d3.select(this.parentNode);
                if (!parentElement.classed('dragging')) {
                  parentElement.classed('mouseover', false);
                  dispatch.call('mouseout', this, d);
                }
              })
              .on('mousemove', function(_event, d) {
                dispatch.call('mousemove', this, d);
              });
          };
        },

        dragStartEndDispatch: function(drag, dispatch) {
          return drag
            .on('start', function(_event, d) {
              d3.select(this.parentNode.parentNode).classed('dragging', true);
              dispatch.call('dragstart', this, d);
            })
            .on('end', function(_event, d) {
              d3.select(this.parentNode.parentNode).classed('dragging', false);
              dispatch.call('dragend', this, d);
            });
        }
      },

      plotComposer: PlotComposer
    };
  };

  // ---------------------------------------------------------------------------
  // plot/plotmixin
  // ---------------------------------------------------------------------------
  var plotMixin_ = function(plot) {
    var plotmixin = function(source, priv) {
      var plotMixin = {};

      plotMixin.dataSelector = function(mapper, key) {
        priv.dataSelector = plot.dataSelector(mapper).key(key);
        return plotMixin;
      };

      plotMixin.xScale = function(binder) {
        priv.xScale = scale_().financetime();

        source.xScale = function(_) {
          if (!arguments.length) {
            return priv.xScale;
          }
          priv.xScale = _;
          if (binder) {
            binder();
          }
          return source;
        };

        return plotMixin;
      };

      plotMixin.yScale = function(binder) {
        priv.yScale = d3.scaleLinear();

        source.yScale = function(_) {
          if (!arguments.length) {
            return priv.yScale;
          }
          priv.yScale = _;
          if (binder) {
            binder();
          }
          return source;
        };

        return plotMixin;
      };

      plotMixin.accessor = function(accessor, binder) {
        priv.accessor = accessor;

        source.accessor = function(_) {
          if (!arguments.length) {
            return priv.accessor;
          }
          priv.accessor = _;
          if (binder) {
            binder();
          }
          return source;
        };

        return plotMixin;
      };

      plotMixin.width = function(binder) {
        priv.width = plot.barWidth;

        source.width = function(_) {
          if (!arguments.length) {
            return priv.width;
          }
          priv.width = functor(_);
          if (binder) {
            binder();
          }
          return source;
        };

        return plotMixin;
      };

      plotMixin.on = function(dispatch, binder) {
        source.on = function(type, listener) {
          dispatch.on(type, listener);
          if (binder) {
            binder();
          }
          return source;
        };

        return plotMixin;
      };

      plotMixin.plot = function(accessor, binder) {
        return plotMixin.xScale(binder).yScale(binder).accessor(accessor, binder);
      };

      return plotMixin;
    };

    plotmixin.dataMapper = plot.dataSelector.mapper;

    return plotmixin;
  };

  // ---------------------------------------------------------------------------
  // plot/candlestick
  // ---------------------------------------------------------------------------
  var candlestick_ = function(ohlcvAccessor, plot, plotMixin) {
    return function() {
      var p = {};
      var bodyPathGenerator;
      var wickGenerator;
      var wickWidthGenerator;

      var candlestick = function(g) {
        var group = p.dataSelector(g);

        plot.appendPathsUpDownEqual(group.selection, p.accessor, ['candle', 'body']);
        plot.appendPathsUpDownEqual(group.selection, p.accessor, ['candle', 'wick']);

        candlestick.refresh(g);
      };

      candlestick.refresh = function(g) {
        g.selectAll('path.candle.body').attr('d', bodyPathGenerator).style('stroke-width', wickWidthGenerator);
        g.selectAll('path.candle.wick').attr('d', wickGenerator).style('stroke-width', wickWidthGenerator);
      };

      var binder = function() {
        bodyPathGenerator = plot.joinPath(bodyPath);
        wickGenerator = plot.joinPath(wickPath);
        wickWidthGenerator = plot.scaledStrokeWidth(p.xScale, 1, 4);
      };

      var bodyPath = function() {
        var accessor = p.accessor;
        var x = p.xScale;
        var y = p.yScale;
        var w = p.width(x);
        var w2 = w / 2;

        return function(d) {
          var open = y(accessor.open(d));
          var close = y(accessor.close(d));
          var xValue = x(accessor.time(d)) - w2;

          var path = 'M' + xValue + ',' + open + 'l' + w + ',0';

          if (open !== close) {
            path += 'L' + (xValue + w) + ',' + close + 'l' + -w + ',0L' + xValue + ',' + open;
          }

          return path;
        };
      };

      var wickPath = function() {
        var accessor = p.accessor;
        var x = p.xScale;
        var y = p.yScale;
        var w = p.width(x);
        var w2 = w / 2;

        return function(d) {
          var open = y(accessor.open(d));
          var close = y(accessor.close(d));
          var xPoint = x(accessor.time(d));
          var xValue = xPoint - w2;

          var path = 'M' + xPoint + ',' + y(accessor.high(d)) + 'L' + xPoint + ',' + Math.min(open, close);

          if (open === close) {
            path += 'M' + xValue + ',' + open + 'l' + w + ',0';
          }

          return path + 'M' + xPoint + ',' + Math.max(open, close) + 'L' + xPoint + ',' + y(accessor.low(d));
        };
      };

      plotMixin(candlestick, p)
        .plot(ohlcvAccessor(), binder)
        .width(binder)
        .dataSelector(plotMixin.dataMapper.array);
      binder();

      return candlestick;
    };
  };

  // ---------------------------------------------------------------------------
  // plot/ohlc
  // ---------------------------------------------------------------------------
  var ohlc_ = function(ohlcvAccessor, plot, plotMixin) {
    return function() {
      var p = {};
      var ohlcGenerator;
      var lineWidthGenerator;

      var ohlc = function(g) {
        plot.appendPathsUpDownEqual(p.dataSelector(g).selection, p.accessor, 'ohlc');
        ohlc.refresh(g);
      };

      ohlc.refresh = function(g) {
        g.selectAll('path.ohlc').attr('d', ohlcGenerator).style('stroke-width', lineWidthGenerator);
      };

      var binder = function() {
        ohlcGenerator = plot.joinPath(ohlcPath);
        lineWidthGenerator = plot.scaledStrokeWidth(p.xScale, 1, 2);
      };

      var ohlcPath = function() {
        var accessor = p.accessor;
        var x = p.xScale;
        var y = p.yScale;
        var w = p.width(x);
        var w2 = w / 2;

        return function(d) {
          var open = y(accessor.open(d));
          var close = y(accessor.close(d));
          var xPoint = x(accessor.time(d));
          var xValue = xPoint - w2;

          return 'M' + xValue + ',' +
            open + 'l' + w2 + ',0M' + xPoint + ',' + y(accessor.high(d)) + 'L' +
            xPoint + ',' + y(accessor.low(d)) + 'M' + xPoint + ',' + close + 'l' + w2 + ',0';
        };
      };

      plotMixin(ohlc, p)
        .plot(ohlcvAccessor(), binder)
        .width(binder)
        .dataSelector(plotMixin.dataMapper.array);
      binder();

      return ohlc;
    };
  };

  // ---------------------------------------------------------------------------
  // plot/volume
  // ---------------------------------------------------------------------------
  var volume_ = function(volumeAccessor, plot, plotMixin) {
    return function() {
      var p = {};
      var volumeGenerator;

      var volume = function(g) {
        var group = p.dataSelector(g);

        if (isOhlcvAccessor()) {
          plot.appendPathsUpDownEqual(group.selection, p.accessor, 'volume');
        }
        else {
          group.entry.append('path').attr('class', 'volume');
        }

        volume.refresh(g);
      };

      volume.refresh = function(g) {
        if (isOhlcvAccessor()) {
          g.selectAll('path.volume').attr('d', volumeGenerator);
        }
        else {
          p.dataSelector.select(g).select('path.volume').attr('d', volumeGenerator);
        }
      };

      var binder = function() {
        volumeGenerator = plot.joinPath(volumePath);
      };

      var isOhlcvAccessor = function() { return p.accessor.open && p.accessor.close; };

      var volumePath = function() {
        var accessor = p.accessor;
        var x = p.xScale;
        var y = p.yScale;
        var w = p.width(x);
        var w2 = w / 2;

        return function(d) {
          var vol = accessor.volume(d);
          if (isNaN(vol)) {
            return null;
          }

          var zero = y(0);
          var h = y(vol) - zero;
          var xValue = x(accessor.time(d)) - w2;

          return 'M ' + xValue + ' ' + zero + ' l 0 ' + h + ' l ' + w + ' 0 l 0 ' + (-h);
        };
      };

      plotMixin(volume, p)
        .plot(volumeAccessor(), binder)
        .width(binder)
        .dataSelector(plotMixin.dataMapper.array);
      binder();

      return volume;
    };
  };

  // ---------------------------------------------------------------------------
  // plot/line
  // ---------------------------------------------------------------------------
  var line_ = function(valueAccessor, plot, plotMixin, showZero) {
    showZero = showZero || false;

    return function() {
      var p = {};
      var svgLine = plot.pathLine();

      var line = function(g) {
        var group = p.dataSelector(g);
        group.entry.append('path').attr('class', 'line');

        if (showZero) {
          group.selection.append('path').attr('class', 'zero');
        }

        line.refresh(g);
      };

      line.refresh = function(g) {
        var selection = p.dataSelector.select(g);
        selection.select('path.line').attr('d', svgLine);

        if (showZero) {
          var accessor = p.accessor;
          selection.select('path.zero')
            .attr('d', plot.horizontalPathLine(accessor.time, p.xScale, accessor.zero, p.yScale));
        }
      };

      var binder = function() {
        svgLine.init(p.accessor.time, p.xScale, p.accessor, p.yScale);
      };

      plotMixin(line, p)
        .plot(valueAccessor(), binder)
        .dataSelector(plotMixin.dataMapper.array);
      binder();

      return line;
    };
  };

  // ---------------------------------------------------------------------------
  // plot/area
  // ---------------------------------------------------------------------------
  var area_ = function(areaAccessor, plot, plotMixin) {
    return function() {
      var p = {};
      var svgArea = plot.pathArea();

      var area = function(g) {
        var group = p.dataSelector(g);
        group.entry.append('path').attr('class', 'area');
        area.refresh(g);
      };

      area.refresh = function(g) {
        p.dataSelector.select(g).select('path.area').attr('d', svgArea);
      };

      var binder = function() {
        svgArea.init(p.accessor.time, p.xScale, p.accessor, p.yScale, 0);
      };

      plotMixin(area, p)
        .plot(areaAccessor(), binder)
        .dataSelector(plotMixin.dataMapper.array);
      binder();

      return area;
    };
  };

  // ---------------------------------------------------------------------------
  // plot/valuepoint
  // ---------------------------------------------------------------------------
  var valuepoint_ = function(valueAccessor, plot, plotMixin) {
    return function() {
      var p = {};
      var pointGenerator;
      var radiusOverride = null;

      var valuepoint = function(g) {
        var group = p.dataSelector(g);
        group.entry.append('path').attr('class', 'point');
        valuepoint.refresh(g);
      };

      valuepoint.refresh = function(g) {
        p.dataSelector.select(g).select('path.point').attr('d', pointGenerator);
      };

      valuepoint.radius = function(_) {
        if (!arguments.length) return radiusOverride;
        radiusOverride = _;
        binder();
        return valuepoint;
      };

      var getRadius = function() {
        if (radiusOverride !== null) return radiusOverride;
        var css = getComputedStyle(document.documentElement).getPropertyValue('--point-radius');
        return css ? parseFloat(css) : 1.5;
      };

      var binder = function() {
        pointGenerator = plot.joinPath(pointPath);
      };

      var pointPath = function() {
        var accessor = p.accessor;
        var x = p.xScale;
        var y = p.yScale;
        var w = p.width(x);
        var w2 = w / 2;

        return function(d) {
          var value = accessor.value(d);
          if (isNaN(value)) {
            return null;
          }

          var cy = y(value);
          var cx = x(accessor.time(d)) - w2;
          var r = getRadius();
          var r2 = r * 2;

          return 'M' + (cx - r) + ',' + cy +
            'a' + r + ',' + r + ' 0 1,0 ' + r2 + ',0a' + r + ',' + r + ' 0 1,0 -' + r2 + ',0';
        };
      };

      plotMixin(valuepoint, p)
        .plot(valueAccessor(), binder)
        .width(binder)
        .dataSelector(plotMixin.dataMapper.array);
      binder();

      return valuepoint;
    };
  };

  // ---------------------------------------------------------------------------
  // plot/tradepoint
  // ---------------------------------------------------------------------------
  var tradepoint_ = function(tradeAccessor, plot, plotMixin) {
    return function() {
      var p = {};
      var pointGenerator;
      var radiusOverride = null;

      var tradepoint = function(g) {
        var group = p.dataSelector(g);
        group.entry.append('path').attr('class', 'point');
        tradepoint.refresh(g);
      };

      tradepoint.refresh = function(g) {
        p.dataSelector.select(g).select('path.point').attr('d', pointGenerator);
      };

      tradepoint.radius = function(_) {
        if (!arguments.length) return radiusOverride;
        radiusOverride = _;
        binder();
        return tradepoint;
      };

      var getRadius = function() {
        if (radiusOverride !== null) return radiusOverride;
        var css = getComputedStyle(document.documentElement).getPropertyValue('--point-radius');
        return css ? parseFloat(css) : 1.5;
      };

      var binder = function() {
        pointGenerator = plot.joinPath(pointPath);
      };

      var pointPath = function() {
        var accessor = p.accessor;
        var x = p.xScale;
        var y = p.yScale;
        var w = p.width(x);
        var w2 = w / 2;

        return function(d) {
          var price = accessor.price(d);
          if (isNaN(price)) {
            return null;
          }

          var cy = y(price);
          var cx = x(accessor.time(d)) - w2;
          var r = getRadius();
          var r2 = r * 2;

          return 'M' + (cx - r) + ',' + cy +
            'a' + r + ',' + r + ' 0 1,0 ' + r2 + ',0a' + r + ',' + r + ' 0 1,0 -' + r2 + ',0';
        };
      };

      plotMixin(tradepoint, p)
        .plot(tradeAccessor(), binder)
        .width(binder)
        .dataSelector(plotMixin.dataMapper.array);
      binder();

      return tradepoint;
    };
  };

  // ---------------------------------------------------------------------------
  // plot/quotepoint
  // ---------------------------------------------------------------------------
  var quotepoint_ = function(quoteAccessor, plot, plotMixin) {
    return function() {
      var p = {};
      var quotepointGenerator;
      var radiusOverride = null;

      var quotepoint = function(g) {
        var group = p.dataSelector(g);
        group.entry.append('path').attr('class', 'point');
        quotepoint.refresh(g);
      };

      quotepoint.refresh = function(g) {
        p.dataSelector.select(g).select('path.point').attr('d', quotepointGenerator);
      };

      quotepoint.radius = function(_) {
        if (!arguments.length) return radiusOverride;
        radiusOverride = _;
        binder();
        return quotepoint;
      };

      var getRadius = function() {
        if (radiusOverride !== null) return radiusOverride;
        var css = getComputedStyle(document.documentElement).getPropertyValue('--point-radius');
        return css ? parseFloat(css) : 1.5;
      };

      var binder = function() {
        quotepointGenerator = plot.joinPath(quotepointPath);
      };

      var quotepointPath = function() {
        var accessor = p.accessor;
        var x = p.xScale;
        var y = p.yScale;
        var w = p.width(x);
        var w2 = w / 2;

        return function(d) {
          var ask = accessor.ask(d);
          var bid = accessor.bid(d);
          if (isNaN(ask) || isNaN(bid)) {
            return null;
          }
          var cyHigh = y(ask);
          var cyLow = y(bid);
          var cx = x(accessor.time(d)) - w2;
          var r = getRadius();
          var r2 = r * 2;

          return 'M' + (cx - r) + ',' + cyHigh +
            ' a' + r + ',' + r + ' 0 1,0 ' + r2 + ',0 a' + r + ',' + r + ' 0 1,0 -' + r2 + ',0' +
            'M' + (cx - r) + ',' + cyLow +
            ' a' + r + ',' + r + ' 0 1,0 ' + r2 + ',0 a' + r + ',' + r + ' 0 1,0 -' + r2 + ',0';
        };
      };

      plotMixin(quotepoint, p)
        .plot(quoteAccessor(), binder)
        .width(binder)
        .dataSelector(plotMixin.dataMapper.array);
      binder();

      return quotepoint;
    };
  };

  // ---------------------------------------------------------------------------
  // plot/quotebar
  // ---------------------------------------------------------------------------
  var quotebar_ = function(quoteAccessor, plot, plotMixin) {
    return function() {
      var p = {};
      var quotebarGenerator;
      var lineWidthGenerator;

      var quotebar = function(g) {
        p.dataSelector(g).entry.append('path').attr('class', 'quotebar');
        quotebar.refresh(g);
      };

      quotebar.refresh = function(g) {
        p.dataSelector.select(g).select('path.quotebar').attr('d', quotebarGenerator)
          .style('stroke-width', lineWidthGenerator);
      };

      var binder = function() {
        quotebarGenerator = plot.joinPath(quotebarPath);
        lineWidthGenerator = plot.scaledStrokeWidth(p.xScale, 1, 2);
      };

      var quotebarPath = function() {
        var accessor = p.accessor;
        var x = p.xScale;
        var y = p.yScale;
        var w = p.width(x);
        var w2 = w / 2;

        return function(d) {
          var high = y(accessor.ask(d));
          var low = y(accessor.bid(d));
          var xPoint = x(accessor.time(d));
          var xValue = xPoint - w2;

          return 'M' + xValue + ',' + high + 'l' + w + ',0M' + xPoint + ',' + high +
            'L' + xPoint + ',' + low + 'M' + xValue + ',' + low + 'l' + w + ',0';
        };
      };

      plotMixin(quotebar, p)
        .plot(quoteAccessor(), binder)
        .width(binder)
        .dataSelector(plotMixin.dataMapper.array);
      binder();

      return quotebar;
    };
  };

  // ---------------------------------------------------------------------------
  // plot/crosshair
  // ---------------------------------------------------------------------------
  var crosshair_ = function(crosshairAccessor, plot, plotMixin) {
    return function() {
      var p = {};
      var dispatcher = d3.dispatch('enter', 'out', 'move');
      var xAnnotationComposer = plot.plotComposer().scope('composed-annotation')
        .plotScale(function(plt) { return plt.axis().scale(); });
      var yAnnotationComposer = plot.plotComposer().scope('composed-annotation')
        .plotScale(function(plt) { return plt.axis().scale(); });
      var verticalPathGenerator;
      var horizontalPathGenerator;
      var verticalWireRange;
      var horizontalWireRange;

      var crosshair = function(g) {
        var group = p.dataSelector(g);

        group.entry.append('path').attr('class', 'horizontal wire');
        group.entry.append('path').attr('class', 'vertical wire');

        group.entry.append('g').attr('class', 'axisannotation x').call(xAnnotationComposer);
        group.entry.append('g').attr('class', 'axisannotation y').call(yAnnotationComposer);

        g.selectAll('rect').data([undefined]).enter().append('rect')
          .style('fill', 'none')
          .style('pointer-events', 'all');

        crosshair.refresh(g);
      };

      crosshair.refresh = function(g) {
        var xRange = p.xScale.range();
        var yRange = p.yScale.range();
        var group = p.dataSelector.select(g);
        var pathVerticalSelection = group.select('path.vertical');
        var pathHorizontalSelection = group.select('path.horizontal');
        var xAnnotationSelection = group.select('g.axisannotation.x');
        var yAnnotationSelection = group.select('g.axisannotation.y');

        verticalPathGenerator = verticalPathLine();
        horizontalPathGenerator = horizontalPathLine();

        g.selectAll('rect')
          .attr('x', Math.min.apply(null, xRange))
          .attr('y', Math.min.apply(null, yRange))
          .attr('height', Math.abs(yRange[yRange.length - 1] - yRange[0]))
          .attr('width', Math.abs(xRange[xRange.length - 1] - xRange[0]))
          .on('mouseenter', function() {
            dispatcher.call('enter', this);
          })
          .on('mouseout', function() {
            dispatcher.call('out', this);

            delete group.node().__coord__;

            initialiseWire(group.datum());
            refresh(group, pathVerticalSelection, pathHorizontalSelection, xAnnotationSelection, yAnnotationSelection);
          })
          .on('mousemove', mousemoveRefresh(group, pathVerticalSelection, pathHorizontalSelection,
            xAnnotationSelection, yAnnotationSelection)
          );

        refresh(group, pathVerticalSelection, pathHorizontalSelection, xAnnotationSelection, yAnnotationSelection);
      };

      var mousemoveRefresh =
        function(selection, pathVerticalSelection, pathHorizontalSelection, xAnnotationSelection, yAnnotationSelection) {
          return function(event) {
            selection.node().__coord__ = d3.pointer(event);
            refresh(selection, pathVerticalSelection, pathHorizontalSelection, xAnnotationSelection, yAnnotationSelection);
          };
        };

      var refresh = function(selection, xPath, yPath, xAnnotationSelection, yAnnotationSelection) {
        var coords = selection.node().__coord__;
        if (coords !== undefined) {
          var d = selection.datum();
          var xNew = p.xScale.invert(coords[0]);
          var yNew = p.yScale.invert(coords[1]);
          var doDispatch = xNew !== null && yNew !== null
            && (p.accessor.x(d) === null || p.accessor.y(d) === null
              || Math.abs(p.accessor.x(d) - xNew) > 1e-10 || Math.abs(p.accessor.y(d) - yNew) > 1e-10);

          p.accessor.x(d, xNew);
          p.accessor.y(d, yNew);
          if (doDispatch) {
            dispatcher.call('move', selection.node(), d);
          }
        }

        xPath.attr('d', verticalPathGenerator);
        yPath.attr('d', horizontalPathGenerator);
        xAnnotationSelection.call(xAnnotationComposer.refresh);
        yAnnotationSelection.call(yAnnotationComposer.refresh);
        selection.attr('display', displayAttr);
      };

      crosshair.xAnnotation = function(_) {
        if (!arguments.length) {
          return xAnnotationComposer.plots();
        }
        xAnnotationComposer.plots(_ instanceof Array ? _ : [_]);
        return binder();
      };

      crosshair.yAnnotation = function(_) {
        if (!arguments.length) {
          return yAnnotationComposer.plots();
        }
        yAnnotationComposer.plots(_ instanceof Array ? _ : [_]);
        return binder();
      };

      crosshair.verticalWireRange = function(_) {
        if (!arguments.length) {
          return verticalWireRange;
        }
        verticalWireRange = _;
        return binder();
      };

      crosshair.horizontalWireRange = function(_) {
        if (!arguments.length) {
          return horizontalWireRange;
        }
        horizontalWireRange = _;
        return binder();
      };

      var binder = function() {
        xAnnotationComposer.accessor(p.accessor.x).scale(p.xScale);
        yAnnotationComposer.accessor(p.accessor.y).scale(p.yScale);
        return crosshair;
      };

      var horizontalPathLine = function() {
        var range = horizontalWireRange || p.xScale.range();

        return function(d) {
          if (p.accessor.y(d) === null) {
            return null;
          }

          var value = p.yScale(p.accessor.y(d));
          if (isNaN(value)) {
            return null;
          }

          return 'M ' + range[0] + ' ' + value + ' L ' + range[range.length - 1] + ' ' + value;
        };
      };

      var verticalPathLine = function() {
        var range = verticalWireRange || p.yScale.range();

        return function(d) {
          if (p.accessor.x(d) === null) {
            return null;
          }

          var value = p.xScale(p.accessor.x(d));
          var sr = p.xScale.range();
          if (value < Math.min(sr[0], sr[sr.length - 1]) || value > Math.max(sr[0], sr[sr.length - 1])) {
            return null;
          }

          return 'M ' + value + ' ' + range[0] + ' L ' + value + ' ' + range[range.length - 1];
        };
      };

      var initialiseWire = function(d) {
        d = d || {};
        p.accessor.x(d, null);
        p.accessor.y(d, null);
        return d;
      };

      var isEmpty = function(d) { return d === undefined || p.accessor.x(d) === null || p.accessor.y(d) === null; };

      var displayAttr = function(d) { return isEmpty(d) ? 'none' : null; };

      plotMixin(crosshair, p)
        .plot(crosshairAccessor(), binder)
        .dataSelector(function(d) {
          return isEmpty(d) ? [initialiseWire()] : [d];
        })
        .on(dispatcher);

      p.dataSelector.scope('crosshair');

      return binder();
    };
  };

  // ---------------------------------------------------------------------------
  // plot/axisannotation
  // ---------------------------------------------------------------------------
  var axisannotation_refresh = function(selection, accessor, axis, orient, format, height, width, point, translate) {
    var neg = orient === 'left' || orient === 'top' ? -1 : 1;

    selection.attr('transform', 'translate(' + translate[0] + ',' + translate[1] + ')');
    selection.select('path').attr('d', axisannotation_backgroundPath(accessor, axis, orient, height, width, point, neg));
    selection.select('text').text(axisannotation_textValue(accessor, format)).call(axisannotation_textAttributes, accessor, axis, orient, neg);
  };

  var axisannotation_filterInvalidValues = function(accessor, scale) {
    return function(data) {
      var range = scale.range();
      var start = range[0];
      var end = range[range.length - 1];

      range = start < end ? [start, end] : [end, start];

      return data.filter(function(d) {
        if (accessor(d) === null || accessor(d) === undefined) {
          return false;
        }

        var value = scale(accessor(d));
        return value !== null && !isNaN(value) && range[0] <= value && value <= range[1];
      });
    };
  };

  var axisannotation_textAttributes = function(text, accessor, axis, orient, neg) {
    var scale = axis.scale();

    switch (orient) {
      case 'left':
      case 'right':
        text.attr('x', neg * (Math.max(axis.tickSizeInner(), 0) + axis.tickPadding()))
          .attr('y', axisannotation_textPosition(accessor, scale))
          .attr('dy', '.32em')
          .style('text-anchor', neg < 0 ? 'end' : 'start');
        break;
      case 'top':
      case 'bottom':
        text.attr('x', axisannotation_textPosition(accessor, scale))
          .attr('y', neg * (Math.max(axis.tickSizeInner(), 0) + axis.tickPadding()))
          .attr('dy', neg < 0 ? '0em' : '.72em')
          .style('text-anchor', 'middle');
        break;
    }
  };

  var axisannotation_textPosition = function(accessor, scale) {
    return function(d) { return scale(accessor(d)); };
  };

  var axisannotation_textValue = function(accessor, format) {
    return function(d) { return format(accessor(d)); };
  };

  var axisannotation_backgroundPath = function(accessor, axis, orient, height, width, point, neg) {
    return function(d) {
      var scale = axis.scale();
      var value = scale(accessor(d));
      var pt = point;

      switch (orient) {
        case 'left':
        case 'right': {
          var h = 0;

          if (height / 2 < point) {
            pt = height / 2;
          }
          else {
            h = height / 2 - point;
          }

          return 'M 0 ' + value + ' l ' + (neg * Math.max(axis.tickSizeInner(), 1)) + ' ' + (-pt) +
            ' l 0 ' + (-h) + ' l ' + (neg * width) + ' 0 l 0 ' + height +
            ' l ' + (neg * -width) + ' 0 l 0 ' + (-h);
        }
        case 'top':
        case 'bottom': {
          var w = 0;

          if (width / 2 < point) {
            pt = width / 2;
          }
          else {
            w = width / 2 - point;
          }

          return 'M ' + value + ' 0 l ' + (-pt) + ' ' + (neg * Math.max(axis.tickSizeInner(), 1)) +
            ' l ' + (-w) + ' 0 l 0 ' + (neg * height) + ' l ' + width + ' 0 l 0 ' + (neg * -height) +
            ' l ' + (-w) + ' 0';
        }
        default: throw new Error('Unsupported orient value: axisannotation.orient('
          + orient + '). Set to one of: \'top\', \'bottom\', \'left\', \'right\'');
      }
    };
  };

  var axisannotation_ = function(valueAccessor, plotMixin) {
    return function() {
      var p = {};
      var point = 4;
      var axis = d3.axisTop(d3.scaleLinear());
      var format;
      var height = 14;
      var width = 50;
      var translate = [0, 0];
      var orient = 'bottom';

      var annotation = function(g) {
        var group = p.dataSelector.mapper(axisannotation_filterInvalidValues(p.accessor, axis.scale()))(g);

        group.entry.append('path');
        group.entry.append('text');

        annotation.refresh(g);
      };

      annotation.refresh = function(g) {
        var fmt = format ? format :
          (axis.tickFormat() ? axis.tickFormat() : axis.scale().tickFormat());

        axisannotation_refresh(p.dataSelector.select(g), p.accessor, axis, orient, fmt, height, width, point, translate);
      };

      annotation.axis = function(_) {
        if (!arguments.length) {
          return axis;
        }
        axis = _;
        return annotation;
      };

      annotation.orient = function(_) {
        if (!arguments.length) {
          return orient;
        }
        orient = _;
        return annotation;
      };

      annotation.format = function(_) {
        if (!arguments.length) {
          return format;
        }
        format = _;
        return annotation;
      };

      annotation.height = function(_) {
        if (!arguments.length) {
          return height;
        }
        height = _;
        return annotation;
      };

      annotation.width = function(_) {
        if (!arguments.length) {
          return width;
        }
        width = _;
        return annotation;
      };

      annotation.translate = function(_) {
        if (!arguments.length) {
          return translate;
        }
        translate = _;
        return annotation;
      };

      plotMixin(annotation, p)
        .accessor(valueAccessor())
        .dataSelector();

      return annotation;
    };
  };

  // ---------------------------------------------------------------------------
  // plot/supstance
  // ---------------------------------------------------------------------------
  var supstance_refresh = function(selection, accessor, x, y, annotationComposer) {
    selection.select('.supstance path').attr('d', supstance_path(accessor, x, y));
    selection.select('.interaction path').attr('d', supstance_path(accessor, x, y));
    selection.select('.axisannotation.y').call(annotationComposer.refresh);
  };

  var supstance_path = function(accessor, x, y) {
    return function(d) {
      var range;
      if (supstance_isSupstanceAccessor(accessor)) {
        range = [accessor.start(d), accessor.end(d)];
        range[0] = range[0] !== undefined ? x(range[0]) : x.range()[0];
        range[1] = range[1] !== undefined ? x(range[1]) : x.range()[1];
      }
      else {
        range = x.range();
      }

      var v = y(accessor.value(d));
      return 'M ' + range[0] + ' ' + v + ' L ' + range[range.length - 1] + ' ' + v;
    };
  };

  var supstance_isSupstanceAccessor = function(accessor) {
    return accessor.start !== undefined && accessor.end !== undefined;
  };

  var supstance_ = function(supstanceAccessor, plot, plotMixin) {
    var supstance = function() {
      var p = {};
      var dispatch = d3.dispatch('mouseenter', 'mouseout', 'mousemove', 'drag', 'dragstart', 'dragend');
      var annotationComposer = plot.plotComposer().scope('composed-annotation')
        .plotScale(function(plt) { return plt.axis().scale(); });

      var supstanceInner = function(g) {
        var group = p.dataSelector(g);

        group.entry.append('g').attr('class', 'supstance').append('path');
        group.entry.append('g').attr('class', 'axisannotation y').call(annotationComposer);

        var interaction = group.entry.append('g').attr('class', 'interaction')
          .style('opacity', 0)
          .style('fill', 'none')
          .call(plot.interaction.mousedispatch(dispatch));

        interaction.append('path').style('stroke-width', '16px');

        supstanceInner.refresh(g);
      };

      supstanceInner.refresh = function(g) {
        supstance_refresh(p.dataSelector.select(g), p.accessor, p.xScale, p.yScale, annotationComposer);
      };

      supstanceInner.drag = function(g) {
        g.selectAll('.interaction path').call(dragBody(dispatch, p.accessor, p.xScale, p.yScale, annotationComposer));
      };

      supstanceInner.annotation = function(_) {
        if (!arguments.length) {
          return annotationComposer.plots();
        }
        annotationComposer.plots(_ instanceof Array ? _ : [_]);
        return supstanceInner;
      };

      var binder = function() {
        annotationComposer.accessor(p.accessor.value).scale(p.yScale);
        return supstanceInner;
      };

      plotMixin(supstanceInner, p)
        .dataSelector(plotMixin.dataMapper.unity)
        .plot(supstanceAccessor(), binder)
        .on(dispatch);

      p.dataSelector.scope('supstance');

      return binder();
    };

    var dragBody = function(dispatch, accessor, x, y, annotationComposer) {
      var drag = d3.drag()
        .subject(function(d) { return { x: 0, y: y(accessor(d)) }; })
        .on('drag', function(event, d) {
          var value = y.invert(event.y);

          var g = d3.select(this.parentNode.parentNode);

          accessor.value(d, value);
          supstance_refresh(g, accessor, x, y, annotationComposer);
          dispatch.call('drag', this, d);
        });

      return plot.interaction.dragStartEndDispatch(drag, dispatch);
    };

    return supstance;
  };

  // ---------------------------------------------------------------------------
  // plot/trendline
  // ---------------------------------------------------------------------------
  var trendline_refresh = function(selection, accessor, x, y) {
    selection.selectAll('path.body')
      .attr('d', trendline_path(accessor, x, y));
    selection.selectAll('circle.start')
      .attr('cx', trendline_endCX(accessor.startTime, x))
      .attr('cy', trendline_endCY(accessor.startValue, y));
    selection.selectAll('circle.end')
      .attr('cx', trendline_endCX(accessor.endTime, x))
      .attr('cy', trendline_endCY(accessor.endValue, y));
  };

  var trendline_path = function(accessor, x, y) {
    return function(d) {
      return 'M ' + x(accessor.startTime(d)) + ' ' + y(accessor.startValue(d)) +
        ' L ' + x(accessor.endTime(d)) + ' ' + y(accessor.endValue(d));
    };
  };

  var trendline_endCX = function(xAccessor, x) {
    return function(d) { return x(xAccessor(d)); };
  };

  var trendline_endCY = function(yAccessor, y) {
    return function(d) { return y(yAccessor(d)); };
  };

  var trendline_ = function(trendlineAccessor, plot, plotMixin) {
    var trendline = function() {
      var p = {};
      var dispatch = d3.dispatch('mouseenter', 'mouseout', 'mousemove', 'drag', 'dragstart', 'dragend');

      var trendlineInner = function(g) {
        var group = p.dataSelector(g);
        var trendlineGroup = group.entry.append('g').attr('class', 'trendline');

        trendlineGroup.append('path').attr('class', 'body');
        trendlineGroup.append('circle').attr('class', 'start').attr('r', 1);
        trendlineGroup.append('circle').attr('class', 'end').attr('r', 1);

        var interaction = group.entry.append('g')
          .attr('class', 'interaction')
          .style('opacity', 0)
          .style('fill', 'none')
          .call(plot.interaction.mousedispatch(dispatch));

        interaction.append('path').attr('class', 'body').style('stroke-width', '16px');
        interaction.append('circle').attr('class', 'start').attr('r', 8);
        interaction.append('circle').attr('class', 'end').attr('r', 8);

        trendlineInner.refresh(g);
      };

      trendlineInner.refresh = function(g) {
        trendline_refresh(p.dataSelector.select(g), p.accessor, p.xScale, p.yScale);
      };

      trendlineInner.drag = function(g) {
        g.selectAll('.interaction circle.start')
          .call(dragEnd(dispatch, p.accessor, p.accessor.startTime, p.xScale, p.accessor.startValue, p.yScale));
        g.selectAll('.interaction circle.end')
          .call(dragEnd(dispatch, p.accessor, p.accessor.endTime, p.xScale, p.accessor.endValue, p.yScale));
        g.selectAll('.interaction path.body')
          .call(dragBody(dispatch, p.accessor, p.xScale, p.yScale));
      };

      plotMixin(trendlineInner, p)
        .dataSelector(plotMixin.dataMapper.unity)
        .plot(trendlineAccessor())
        .on(dispatch);

      return trendlineInner;
    };

    var dragEnd = function(dispatch, accessor, xAccessor, x, yAccessor, y) {
      var drag = d3.drag();
      drag
        .subject(function(_event, d) { return { x: x(xAccessor(d)), y: y(yAccessor(d)) }; })
        .on('drag', function(event, d) {
          updateEnd(xAccessor, x, event.x, yAccessor, y, event.y, d);
          trendline_refresh(d3.select(this.parentNode.parentNode.parentNode), accessor, x, y);
          dispatch.call('drag', this, d);
        });

      return plot.interaction.dragStartEndDispatch(drag, dispatch);
    };

    var dragBody = function(dispatch, accessor, x, y) {
      var dragStart = {};
      var drag = d3.drag();

      drag
        .subject(function(_event, d) {
          dragStart.start = { date: x(accessor.startTime(d)), value: y(accessor.startValue(d)) };
          dragStart.end = { date: x(accessor.endTime(d)), value: y(accessor.endValue(d)) };
          return { x: 0, y: 0 };
        })
        .on('drag', function(event, d) {
          updateEnd(accessor.startTime, x, event.x + dragStart.start.date,
            accessor.startValue, y, event.y + dragStart.start.value,
            d);
          updateEnd(accessor.endTime, x, event.x + dragStart.end.date,
            accessor.endValue, y, event.y + dragStart.end.value,
            d);
          trendline_refresh(d3.select(this.parentNode.parentNode.parentNode), accessor, x, y);
          dispatch.call('drag', this, d);
        });

      return plot.interaction.dragStartEndDispatch(drag, dispatch);
    };

    var updateEnd = function(xAccessor, x, xValue, yAccessor, y, yValue, d) {
      var time = x.invert(xValue);
      if (time !== null && time !== undefined) {
        xAccessor(d, time);
      }
      yAccessor(d, y.invert(yValue));
    };

    return trendline;
  };

  // ---------------------------------------------------------------------------
  // plot/tradearrow
  // ---------------------------------------------------------------------------
  var tradearrow_classed = function(selection, classes) {
    Object.keys(classes).forEach(function(clazz) {
      selection.classed(clazz, classes[clazz]);
    });
  };

  var tradearrow_ = function(tradeAccessor, plot, plotMixin) {
    return function() {
      var p = {};
      var dispatch = d3.dispatch('mouseenter', 'mouseout');
      var y = function(d) { return p.yScale(p.accessor.price(d)); };
      var svgArrow = arrow_().orient(function(d) { return p.accessor.type(d).startsWith('buy') ? 'up' : 'down'; });
      var arrowGenerator;

      var tradearrow = function(g) {
        var group = p.dataSelector(g);
        var classes = typesToClasses(g.datum());

        plot.appendPathsGroupBy(group.selection, p.accessor, 'tradearrow', classes);

        group.entry.append('path').attr('class', 'highlight').style('pointer-events', 'none');

        group.selection.selectAll('path.tradearrow')
          .on('mouseenter', function(event, data) {
            var nearest = findNearest(data, d3.pointer(event)[0]);

            d3.select(this.parentNode).select('path.highlight').datum(nearest.d)
              .attr('d', svgArrow).call(tradearrow_classed, classes);
            dispatch.call('mouseenter', this, nearest.d, nearest.i);
          }).on('mouseout', function(event, data) {
            d3.select(this.parentNode).selectAll('path.highlight').datum([])
              .attr('d', null).attr('class', 'highlight');
            var nearest = findNearest(data, d3.pointer(event)[0]);
            dispatch.call('mouseout', this, nearest.d, nearest.i);
          });

        tradearrow.refresh(g);
      };

      tradearrow.refresh = function(g) {
        g.selectAll('path.tradearrow').attr('d', arrowGenerator);
      };

      tradearrow.orient = function(_) {
        if (!arguments.length) {
          return svgArrow.orient();
        }
        svgArrow.orient(_);
        return binder();
      };

      tradearrow.y = function(_) {
        if (!arguments.length) {
          return y;
        }
        y = functor(_);
        return binder();
      };

      tradearrow.arrow = function() { return svgArrow; };

      var binder = function() {
        svgArrow.x(function(d) { return p.xScale(p.accessor.time(d)); }).y(y);
        arrowGenerator = plot.joinPath(function() { return svgArrow; });
        return tradearrow;
      };

      var findNearest = function(data, x) {
        return data.map(function(d, i) { return { d: d, i: i, x: p.xScale(p.accessor.time(d)) }; })
          .reduce(function(q, c) { return Math.abs(q.x - x) < Math.abs(c.x - x) ? q : c; });
      };

      var typesToClasses = function(data) {
        return data.map(function(d) { return p.accessor.type(d); })
          .reduce(function(prev, cur) {
            if (prev[cur] === undefined) {
              prev[cur] = function(d) { return cur === p.accessor.type(d); };
            }
            return prev;
          }, {});
      };

      plotMixin(tradearrow, p)
        .plot(tradeAccessor(), binder)
        .on(dispatch)
        .dataSelector(plotMixin.dataMapper.array);
      binder();

      return tradearrow;
    };
  };

  // ---------------------------------------------------------------------------
  // plot/tick
  // ---------------------------------------------------------------------------
  var tick_ = function(tickAccessor, plot, plotMixin) {
    return function() {
      var p = {};
      var tickGenerator;
      var lineWidthGenerator;

      var tick = function(g) {
        p.dataSelector(g).entry.append('path').attr('class', 'tick');
        tick.refresh(g);
      };

      tick.refresh = function(g) {
        p.dataSelector.select(g).select('path.tick').attr('d', tickGenerator)
          .style('stroke-width', lineWidthGenerator);
      };

      var binder = function() {
        tickGenerator = plot.joinPath(tickPath);
        lineWidthGenerator = plot.scaledStrokeWidth(p.xScale, 1, 2);
      };

      var tickPath = function() {
        var accessor = p.accessor;
        var x = p.xScale;
        var y = p.yScale;
        var w = p.width(x);
        var w2 = w / 2;

        return function(d) {
          var high = y(accessor.high(d));
          var low = y(accessor.low(d));
          var xPoint = x(accessor.time(d));
          var xValue = xPoint - w2;

          return 'M ' + xValue + ' ' + high + ' l ' + w + ' 0 M ' + xPoint + ' ' + high +
            ' L ' + xPoint + ' ' + low + ' M ' + xValue + ' ' + low + ' l ' + w + ' 0';
        };
      };

      plotMixin(tick, p)
        .plot(tickAccessor(), binder)
        .width(binder)
        .dataSelector(plotMixin.dataMapper.array);
      binder();

      return tick;
    };
  };

  // ---------------------------------------------------------------------------
  // shapes/arrow
  // ---------------------------------------------------------------------------
  var arrow_ = function() {
    var fx = functor(0);
    var fy = functor(0);
    var width = functor(12);
    var height = functor(15);
    var orient = functor('up');
    var tail = functor(true);

    var arrow = function(d, i) {
      var x = fx(d, i);
      var y = fy(d, i);
      var w = width(d, i);
      var h = height(d, i);
      var o = orient(d, i);
      var t = tail(d, i);
      var neg = o === 'left' || o === 'up' ? 1 : -1;
      var ws = w / 3;
      var pw = w / 2;
      var ph = t ? h / 2 : h;

      var path = 'M ' + x + ' ' + y;

      switch (o) {
        case 'up':
        case 'down':
          path += ' l ' + -pw + ' ' + neg * ph + ' l ' + ws + ' ' + 0;
          if (t) {
            path += ' l ' + 0 + ' ' + neg * ph;
          }
          path += ' l ' + ws + ' ' + 0;
          if (t) {
            path += ' l ' + 0 + ' ' + -neg * ph;
          }
          path += ' l ' + ws + ' ' + 0;
          break;

        case 'left':
        case 'right':
          path += ' l ' + neg * ph + ' ' + -pw + ' l ' + 0 + ' ' + ws;
          if (t) {
            path += ' l ' + neg * ph + ' ' + 0;
          }
          path += ' l ' + 0 + ' ' + ws;
          if (t) {
            path += ' l ' + -neg * ph + ' ' + 0;
          }
          path += ' l ' + 0 + ' ' + ws;
          break;

        default: throw new Error('Unsupported arrow.orient() = ' + orient);
      }

      return path + ' z';
    };

    arrow.x = function(_) {
      if (!arguments.length) {
        return fx;
      }
      fx = functor(_);
      return arrow;
    };

    arrow.y = function(_) {
      if (!arguments.length) {
        return fy;
      }
      fy = functor(_);
      return arrow;
    };

    arrow.height = function(_) {
      if (!arguments.length) {
        return height;
      }
      height = functor(_);
      return arrow;
    };

    arrow.width = function(_) {
      if (!arguments.length) {
        return width;
      }
      width = functor(_);
      return arrow;
    };

    arrow.orient = function(_) {
      if (!arguments.length) {
        return orient;
      }
      orient = functor(_);
      return arrow;
    };

    arrow.tail = function(_) {
      if (!arguments.length) {
        return tail;
      }
      tail = functor(_);
      return arrow;
    };

    return arrow;
  };

  // ---------------------------------------------------------------------------
  // plot/index (assembly of all plot types)
  // ---------------------------------------------------------------------------
  var plotFactory = function() {
    var plt = plot_();
    var plotMixin = plotMixin_(plt);
    var accessor = accessors_();

    return {
      ohlcarea: area_(accessor.ohlcv, plt, plotMixin),
      valuearea: area_(accessor.value, plt, plotMixin),
      tradearea: area_(accessor.trade, plt, plotMixin),
      quotearea: area_(accessor.quote, plt, plotMixin),
      axisannotation: axisannotation_(accessor.value, plotMixin),
      quotepoint: quotepoint_(accessor.quote, plt, plotMixin),
      quotebar: quotebar_(accessor.quote, plt, plotMixin),
      candlestick: candlestick_(accessor.ohlcv, plt, plotMixin),
      tradepoint: tradepoint_(accessor.trade, plt, plotMixin),
      valuepoint: valuepoint_(accessor.value, plt, plotMixin),
      closeline: line_(accessor.ohlcv, plt, plotMixin),
      tradeline: line_(accessor.trade, plt, plotMixin),
      valueline: line_(accessor.value, plt, plotMixin),
      crosshair: crosshair_(accessor.crosshair, plt, plotMixin),
      ohlc: ohlc_(accessor.ohlcv, plt, plotMixin),
      supstance: supstance_(accessor.supstance, plt, plotMixin),
      tick: tick_(accessor.tick, plt, plotMixin),
      tradearrow: tradearrow_(accessor.trade, plt, plotMixin),
      trendline: trendline_(accessor.trendline, plt, plotMixin),
      volume: volume_(accessor.volume, plt, plotMixin)
    };
  };

  // ---------------------------------------------------------------------------
  // Export
  // ---------------------------------------------------------------------------
  window.primitives = {
    plot: plotFactory(),
    scale: scale_(),
    shapes: {
      arrow: arrow_
    }
  };

})();

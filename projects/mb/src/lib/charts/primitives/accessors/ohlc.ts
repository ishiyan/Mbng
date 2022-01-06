export const ohlc = function () {
  var time = function (d?: any): any { return d.time; },
    open = function (d?: any): any { return d.open; },
    high = function (d?: any): any { return d.high; },
    low = function (d?: any): any { return d.low; },
    close = function (d?: any): any { return d.close; },
    volume = function (d?: any): any { return d.volume; };

  function accessor(d?: any): any {

    return accessor.c(d);
  }

  accessor.t = time;
  accessor.o = open;
  accessor.h = high;
  accessor.l = low;
  accessor.c = close;
  accessor.v = volume;

  accessor.time = function (_?: any) {
    if (!arguments.length) return time;
    time = _;
    accessor.t = _;
    return accessor;
  };

  accessor.open = function (_?: any) {
    if (!arguments.length) return open;
    open = _;
    accessor.o = _;
    return accessor;
  };

  accessor.high = function (_?: any) {
    if (!arguments.length) return high;
    high = _;
    accessor.h = _;
    return accessor;
  };

  accessor.low = function (_?: any) {
    if (!arguments.length) return low;
    low = _;
    accessor.l = _;
    return accessor;
  };

  accessor.close = function (_?: any) {
    if (!arguments.length) return close;
    close = _;
    accessor.c = _;
    return accessor;
  };

  accessor.volume = function (_?: any) {
    if (!arguments.length) return volume;
    volume = _;
    accessor.v = _;
  return accessor;
  };

  return accessor;
};
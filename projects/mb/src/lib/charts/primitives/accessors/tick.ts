export const tick = function () {
  var time = function (d: any) { return d.time; },
    high = function (d: any) { return d.askPrice; }, // d.high
    low = function (d: any) { return d.bidPrice; }, // d.low
    spread = function (d: any) { return (d.askPrice - d.bidPrice) / 2; }; // d.spread

  function accessor(d: any) {
    return accessor.s(d);
  }

  accessor.t = time;
  accessor.h = high;
  accessor.l = low;
  accessor.s = spread;

  accessor.time = function (_?: any) {
    if (!arguments.length) return time;
    time = _;
    accessor.t = _;
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

  accessor.spread = function (_?: any) {
    if (!arguments.length) return spread;
    spread = _;
    accessor.s = _;
    return accessor;
  };

  return accessor;
};
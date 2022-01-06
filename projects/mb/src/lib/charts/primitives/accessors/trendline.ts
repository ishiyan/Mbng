export const trendline = function () {
  var startTime = function (d: any, _?: any) {
    if (arguments.length < 2) return d.start.time;
    d.start.time = _;
  },
    startValue = function (d: any, _?: any) {
      if (arguments.length < 2) return d.start.value;
      d.start.value = _;
    },
    endTime = function (d: any, _?: any) {
      if (arguments.length < 2) return d.end.time;
      d.end.time = _;
    },
    endValue = function (d: any, _?: any) {
      if (arguments.length < 2) return d.end.value;
      d.end.value = _;
    };

  function accessor(d: any) {
    return accessor.sv(d);
  }

  accessor.st = startTime;
  accessor.sv = startValue;
  accessor.et = endTime;
  accessor.ev = endValue;

  accessor.startTime = function (_?: any) {
    if (!arguments.length) return startTime;
    startTime = _;
    accessor.st = _;
    return accessor;
  };

  accessor.startValue = function (_?: any) {
    if (!arguments.length) return startValue;
    startValue = _;
    accessor.sv = _;
    return accessor;
  };

  accessor.endTime = function (_?: any) {
    if (!arguments.length) return endTime;
    endTime = _;
    accessor.et = _;
    return accessor;
  };

  accessor.endValue = function (_?: any) {
    if (!arguments.length) return endValue;
    endValue = _;
    accessor.ev = _;
    return accessor;
  };

  return accessor;
};
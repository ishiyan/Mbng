export const crosshair = function () {
  var x = function (d: any, _?: any) {
    if (arguments.length < 2) return d.x;
    d.x = _;
    return accessor;
  },
    y = function (d: any, _?: any) {
      if (arguments.length < 2) return d.y;
      d.y = _;
      return accessor;
    };

  function accessor(d: any) {
    return accessor.xv(d);
  }

  accessor.xv = x;
  accessor.yv = y;

  accessor.x = function (_?: any) {
    if (!arguments.length) return x;
    x = _;
    accessor.xv = _;
    return accessor;
  };

  accessor.y = function (_?: any) {
    if (!arguments.length) return y;
    y = _;
    accessor.yv = _;
    return accessor;
  };

  return accessor;
};

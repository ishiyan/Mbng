export const supstance = function () {
  var start = function (d: any) { return d.start; },
    end = function (d: any) { return d.end; },
    /**
     * Supports getter and setter
     * @param d Underlying data object to get or set the value
     * @param _ If passed turns into a setter. This is the value to set
     * @returns {*}
     */
    value = function (d: any, _?: any) {
      if (arguments.length < 2) return d.value;
      d.value = _;
      return accessor;
    };

  function accessor(d: any) {
    return accessor.v(d);
  }

  accessor.s = start;
  accessor.e = end;
  accessor.v = value;

  accessor.start = function (_?: any) {
    if (!arguments.length) return start;
    start = _;
    accessor.s = _;
    return accessor;
  };

  accessor.end = function (_?: any) {
    if (!arguments.length) return end;
    end = _;
    accessor.e = _;
    return accessor;
  };

  accessor.value = function (_?: any) {
    if (!arguments.length) return value;
    value = _;
    accessor.v = _;
    return accessor;
  };

  return accessor;
};
export const supstance = function () {
  const start = function (d: any) { return d.start; };
  const end = function (d: any) { return d.end; };

  /** Supports getter and setter. */
  const value = function (d: any, _?: any) {
    if (arguments.length < 2) return d.value;
    d.value = _;
    return accessor;
  };

  function accessor(d: any) {
    return accessor.value(d);
  }

  accessor.start = start;
  accessor.end = end;
  accessor.value = value;

  return accessor;
};
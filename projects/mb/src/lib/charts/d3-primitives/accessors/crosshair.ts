export const crosshair = function () {
  /** Supports getter and setter. */
  const x = function (d: any, _?: any) {
    if (arguments.length < 2) return d.x;
    d.x = _;
    return accessor;
  };

  /** Supports getter and setter. */
  const y = function (d: any, _?: any) {
    if (arguments.length < 2) return d.y;
    d.y = _;
    return accessor;
  };

  function accessor(d: any) {
    return accessor.y(d);
  }

  accessor.x = x;
  accessor.y = y;

  return accessor;
};

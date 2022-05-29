export const crosshair = () => {
  /** Supports getter and setter. */
  // eslint-disable-next-line prefer-arrow/prefer-arrow-functions
  const x = function(d: any, _?: any) {
    if (arguments.length < 2) {
      return d.x;
    }

    d.x = _;
    return accessor;
  };

  /** Supports getter and setter. */
  // eslint-disable-next-line prefer-arrow/prefer-arrow-functions
  const y = function(d: any, _?: any) {
    if (arguments.length < 2) {
      return d.y;
    }

    d.y = _;
    return accessor;
  };

  const accessor = (d: any): any => accessor.y(d);
  accessor.x = x;
  accessor.y = y;

  return accessor;
};

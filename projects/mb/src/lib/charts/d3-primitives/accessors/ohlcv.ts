export const ohlcv = function () {
  function accessor(d: any): any {
    return accessor.value(d);
  }

  accessor.time = function (d: any): any { return d.time; };
  accessor.open = function (d: any): any { return d.open; };
  accessor.high = function (d: any): any { return d.high; };
  accessor.low = function (d: any): any { return d.low; };
  accessor.close = function (d: any): any { return d.close; };
  accessor.volume = function (d: any): any { return d.volume; };

  accessor.value = accessor.close;

  /** By default, *value(d)* returns closing price (*d.close*).
   *  This setter allows to set it to a different expression, e.g. *(d.high + d.low)/2*
   *  by passing a function or a lambda *d: any => (d.high + d.low)/2*.
   */
  accessor.withValue = function (fun: any) {
    accessor.value = fun;
    return accessor;
  };

  return accessor;
};
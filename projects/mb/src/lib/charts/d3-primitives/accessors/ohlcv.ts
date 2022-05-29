export const ohlcv = () => {
  const accessor = (d: any): any => accessor.value(d);
  accessor.time = (d: any): any => d.time;
  accessor.open = (d: any): any => d.open;
  accessor.high = (d: any): any => d.high;
  accessor.low = (d: any): any => d.low;
  accessor.close = (d: any): any => d.close;
  accessor.volume = (d: any): any => d.volume;
  accessor.value = accessor.close;

  /** By default, *value(d)* returns closing price (*d.close*).
   *  This setter allows to set it to a different expression, e.g. *(d.high + d.low)/2*
   *  by passing a function or a lambda *d: any => (d.high + d.low)/2*.
   */
  accessor.withValue = (fun: any): any => {
    accessor.value = fun;
    return accessor;
  };

  return accessor;
};

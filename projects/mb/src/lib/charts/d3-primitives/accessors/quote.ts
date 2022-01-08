export const quote = function () {
  function accessor(d: any): any {
    return accessor.value(d);
  }

  accessor.time = function (d: any) { return d.time; };
  accessor.ask = function (d: any) { return d.askPrice; };
  accessor.bid = function (d: any) { return d.bidPrice; };
  accessor.mid = function (d: any) { return (d.askPrice + d.bidPrice) / 2; };
  accessor.spread = function (d: any) { return d.askPrice - d.bidPrice; };

  accessor.value = accessor.mid;
  accessor.price = accessor.mid;
  accessor.close = accessor.mid;

  /** By default, *value(d)* returns a mid-price (*(d.askPrice + d.bidPrice)/2*).
   *  This setter allows to set it to a different expression, e.g. *d.askPrice - d.bidPrice*
   *  by passing a function or a lambda *d: any => d.askPrice - d.bidPrice*.
   */
  accessor.withValue = function (fun: any) {
    accessor.value = fun;
    accessor.price = fun;
    accessor.close = fun;
    return accessor;
  };

  return accessor;
};
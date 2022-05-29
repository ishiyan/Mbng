export const quote = () => {
  const accessor = (d: any): any => accessor.value(d);
  accessor.time = (d: any) => d.time;
  accessor.ask = (d: any) => d.askPrice;
  accessor.bid = (d: any) => d.bidPrice;
  accessor.mid = (d: any) => (d.askPrice + d.bidPrice) / 2;
  accessor.spread = (d: any) => d.askPrice - d.bidPrice;
  accessor.value = accessor.mid;
  accessor.price = accessor.mid;
  accessor.close = accessor.mid;

  /** By default, *value(d)* returns a mid-price (*(d.askPrice + d.bidPrice)/2*).
   *  This setter allows to set it to a different expression, e.g. *d.askPrice - d.bidPrice*
   *  by passing a function or a lambda *d: any => d.askPrice - d.bidPrice*.
   */
  accessor.withValue = (fun: any): any => {
    accessor.value = fun;
    accessor.price = fun;
    accessor.close = fun;
    return accessor;
  };

  return accessor;
};

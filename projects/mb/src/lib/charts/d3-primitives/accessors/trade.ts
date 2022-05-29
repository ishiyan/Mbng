export const trade = () => {
  const accessor = (d: any): any => accessor.value(d);
  accessor.time = (d: any) => d.time;
  accessor.type = (d: any) => d.type;
  accessor.price = (d: any) => d.price;
  accessor.volume = (d: any) => d.volume;
  accessor.value = accessor.price;

  /** By default, *value(d)* returns trade price (*d.price*).
   *  This setter allows to set it to a different expression, e.g. *d.price* * *d.volume*
   *  by passing a function or a lambda *d: any => d.price* * *d.volume*.
   */
  accessor.withValue = (fun: any): any => {
    accessor.value = fun;
    return accessor;
  };

  return accessor;
};

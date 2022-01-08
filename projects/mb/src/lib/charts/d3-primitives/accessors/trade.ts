export const trade = function () {

  function accessor(d: any) {
    return accessor.value(d);
  }

  accessor.time = function (d: any) { return d.time; };
  accessor.type = function (d: any) { return d.type; };
  accessor.price = function (d: any) { return d.price; };
  accessor.volume = function (d: any) { return d.volume; };

  accessor.value = accessor.price;

  /** By default, *value(d)* returns trade price (*d.price*).
   *  This setter allows to set it to a different expression, e.g. *d.price* * *d.volume*
   *  by passing a function or a lambda *d: any => d.price* * *d.volume*.
   */
  accessor.withValue = function (fun: any) {
    accessor.value = fun;
    return accessor;
  };

  return accessor;
};
export const volume = function () {
  function accessor(d: any): any {
    return accessor.value(d);
  }

  accessor.time = function (d: any) { return d.time; };
  accessor.volume = function (d: any) { return d.volume; };

  accessor.value = accessor.volume;


  /** By default, *value(d)* returns the volume (*d.volume*).
   *  This setter allows to set it to a different expression, e.g. *d.volume* * *d.price*
   *  by passing a function or a lambda *d: any => d.volume* * *d.price*.
   */
  accessor.withValue = function (fun: any) {
    accessor.value = fun;
    return accessor;
  };

  return accessor;
};
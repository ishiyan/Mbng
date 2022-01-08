export const value = function () {
  function accessor(d: any) {
    return accessor.value(d);
  }

  accessor.time = function (d: any) { return d.time; };
  accessor.zero = function (d: any) { return 0; };
  accessor.value = function (d: any) { return d.value; };

  /** By default, *zero(d)* returns *0*.
   *  This setter allows to set it to a different value
   *  by passing a function or a lambda *d: any => 123*.
   */
  accessor.withZero = function (fun: any) {
    accessor.zero = fun;
    return accessor;
  };

  return accessor;
};
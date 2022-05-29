export const value = () => {
  const accessor = (d: any): any => accessor.value(d);
  accessor.time = (d: any) => d.time;
  accessor.zero = () => 0;
  accessor.value = (d: any) => d.value;

  /** By default, *zero(d)* returns *0*.
   *  This setter allows to set it to a different value
   *  by passing a function or a lambda *d: any => 123*.
   */
  accessor.withZero = (fun: any) => {
    accessor.zero = fun;
    return accessor;
  };

  return accessor;
};

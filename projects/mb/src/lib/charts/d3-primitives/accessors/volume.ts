export const volume = () => {
  const accessor = (d: any): any => accessor.value(d);
  accessor.time = (d: any) => d.time;
  accessor.volume = (d: any) => d.volume;
  accessor.value = accessor.volume;

  /** By default, *value(d)* returns the volume (*d.volume*).
   *  This setter allows to set it to a different expression, e.g. *d.volume* * *d.price*
   *  by passing a function or a lambda *d: any => d.volume* * *d.price*.
   */
  accessor.withValue = (fun: any): any => {
    accessor.value = fun;
    return accessor;
  };

  return accessor;
};

export const supstance = () => {
  /** Supports getter and setter. */
  const value = function(d: any, _?: any) {
    if (arguments.length < 2) {
      return d.value;
    }

    d.value = _;
    return accessor;
  };

  const accessor = (d: any): any => accessor.value(d);
  accessor.start = (d: any) => d.start;
  accessor.end = (d: any) => d.end;
  accessor.value = value;

  return accessor;
};

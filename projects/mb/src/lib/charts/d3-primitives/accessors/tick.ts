export const tick = () => {
  const accessor = (d: any): any => accessor.value(d);
  accessor.time = (d: any) => d.time;
  accessor.high = (d: any) => d.askPrice; // d.high
  accessor.low = (d: any) => d.bidPrice; // d.low
  accessor.spread = (d: any) => (d.askPrice - d.bidPrice) / 2; // d.spread
  accessor.value = accessor.spread; // Make a setter: withValue(_).

  return accessor;
};

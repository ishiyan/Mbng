export const tick = function () {
  const time = function (d: any) { return d.time; };
  const high = function (d: any) { return d.askPrice; }; // d.high
  const low = function (d: any) { return d.bidPrice; }; // d.low
  const spread = function (d: any) { return (d.askPrice - d.bidPrice) / 2; }; // d.spread

  function accessor(d: any) {
    return accessor.value(d);
  }

  accessor.time = time;
  accessor.high = high;
  accessor.low = low;
  accessor.spread = spread;

  accessor.value = spread; // Make a setter: withValue(_).

  return accessor;
};
export const trade = function() {
  var time = function(d: any) { return d.time; },
      type = function(d: any) { return d.type; },
      price = function(d: any) { return d.price; },
      volume = function(d: any) { return d.volume; };

  function accessor(d: any) {
    return accessor.p(d);
  }

  accessor.t = time;
  accessor.typ = type;
  accessor.p = price;
  accessor.v = volume;

  accessor.time = function(_?: any) {
    if (!arguments.length) return time;
    time = _;
    accessor.t = _;
    return accessor;
  };

  /**
   * A function which returns a string representing the type of this trade
   * @param _ A constant string or function which takes a data point and returns a string of valid classname format
   */
  accessor.type = function(_?: any) {
    if (!arguments.length) return type;
    type = _;
    accessor.typ = _;
    return accessor;
  };

  accessor.price = function(_?: any) {
    if (!arguments.length) return price;
    price = _;
    accessor.p = _;
    return accessor;
  };

  accessor.volume = function(_?: any) {
    if (!arguments.length) return volume;
    volume = _;
    accessor.v = _;
    return accessor;
  };

  return accessor;
};
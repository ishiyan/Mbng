'use strict';

module.exports = function() {
  var time = function(d) { return d.time; },
      type = function(d) { return d.type; },
      price = function(d) { return d.price; },
      volume = function(d) { return d.volume; };

  function accessor(d) {
    return accessor.p(d);
  }

  accessor.time = function(_) {
    if (!arguments.length) return time;
    time = _;
    return bind();
  };

  /**
   * A function which returns a string representing the type of this trade
   * @param _ A constant string or function which takes a data point and returns a string of valid classname format
   */
  accessor.type = function(_) {
    if (!arguments.length) return type;
    type = _;
    return bind();
  };

  accessor.price = function(_) {
    if (!arguments.length) return price;
    price = _;
    return bind();
  };

  accessor.volume = function(_) {
    if (!arguments.length) return volume;
    volume = _;
    return bind();
  };

  function bind() {
    accessor.t = time;
    accessor.typ = type;
    accessor.p = price;
    accessor.v = volume;

    return accessor;
  }

  return bind();
};
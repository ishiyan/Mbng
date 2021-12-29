'use strict';

module.exports = function() {
  var time = function(d) { return d.time; },
      high = function(d) { return d.askPrice; }, // d.high
      low = function(d) { return d.bidPrice; }, // d.low
      spread = function(d) { return (d.askPrice - d.bidPrice)/2; }; // d.spread

  function accessor(d) {
    bind();
  }

  accessor.time = function(_) {
    if (!arguments.length) return time;
    time = _;
    return bind();
  };

  accessor.high = function(_) {
    if (!arguments.length) return high;
    high = _;
    return bind();
  };

  accessor.low = function(_) {
    if (!arguments.length) return low;
    low = _;
    return bind();
  };

  accessor.spread = function(_) {
    if (!arguments.length) return spread;
    spread = _;
    return bind();
  };

  function bind() {
    accessor.t = time;
    accessor.h = high;
    accessor.l = low;
    accessor.s = spread;

    return accessor;
  }

  return bind();
};
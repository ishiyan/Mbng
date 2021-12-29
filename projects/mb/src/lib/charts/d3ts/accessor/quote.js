'use strict';

module.exports = function() {
  var time = function(d) { return d.time; },
    mid = function(d) { return (d.askPrice + d.bidPrice) / 2; },
    ask = function(d) { return d.askPrice; },
    bid = function(d) { return d.bidPrice; };

  function accessor(d) {
    bind();
  }

  accessor.time = function(_) {
    if (!arguments.length) return time;
    time = _;
    return bind();
  };

  accessor.ask = function(_) {
    if (!arguments.length) return ask;
    ask = _;
    return bind();
  };

  accessor.bid = function(_) {
    if (!arguments.length) return bid;
    bid = _;
    return bind();
  };

  function bind() {
    accessor.t = time;
    accessor.a = ask;
    accessor.b = bid;
    accessor.v = mid;
    accessor.p = mid;
    accessor.c = mid;

    return accessor;
  }

  return bind();
};
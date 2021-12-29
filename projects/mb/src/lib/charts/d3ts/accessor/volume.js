'use strict';

module.exports = function() {
  var time = function(d) { return d.time; },
      volume = function(d) { return d.volume; };

  function accessor(d) {
    return accessor.v(d);
  }

  accessor.time = function(_) {
    if (!arguments.length) return time;
    time = _;
    return bind();
  };

  accessor.volume = function(_) {
    if (!arguments.length) return volume;
    volume = _;
    return bind();
  };

  function bind() {
    accessor.t = time;
    accessor.v = volume;

    return accessor;
  }

  return bind();
};
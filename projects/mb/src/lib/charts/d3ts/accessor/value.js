'use strict';

module.exports = function() {
  var time = function(d) { return d.time; },
      /**
       * Supports getter and setter
       * @param d Underlying data object to get or set the value
       * @param _ If passed turns into a setter. This is the value to set
       * @returns {*}
       */
      value = function(d, _) {
        if(arguments.length < 2) return d.value;
        d.value = _;
        return accessor;
      },
      zero = function(d) { return 0; };

  function accessor(d) {
    return accessor.v(d);
  }

  accessor.time = function(_) {
    if (!arguments.length) return time;
    time = _;
    return bind();
  };

  accessor.value = function(_) {
    if (!arguments.length) return value;
    value = _;
    return bind();
  };

  accessor.zero = function(_) {
    if (!arguments.length) return zero;
    zero = _;
    return bind();
  };

  function bind() {
    accessor.t = time;
    accessor.v = value;
    accessor.z = zero;

    return accessor;
  }

  return bind();
};
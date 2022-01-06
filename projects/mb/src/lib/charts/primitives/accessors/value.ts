export const value = function() {
  var time = function(d: any) { return d.time; },
      value = function(d: any, _?: any) {
        if(arguments.length < 2) return d.value;
        d.value = _;
        return accessor;
      },
      zero = function(d: any) { return 0; };

  function accessor(d: any) {
    return accessor.v(d);
  }

  accessor.t = time;
  accessor.v = value;
  accessor.z = zero;

  accessor.time = function(_?: any) {
    if (!arguments.length) return time;
    time = _;
    accessor.t = _;
    return accessor;
  };

  accessor.value = function(_?: any) {
    if (!arguments.length) return value;
    value = _;
    accessor.v = _;
    return accessor;
  };

  accessor.zero = function(_?: any) {
    if (!arguments.length) return zero;
    zero = _;
    accessor.z = _;
    return accessor;
  };

  return accessor;
};
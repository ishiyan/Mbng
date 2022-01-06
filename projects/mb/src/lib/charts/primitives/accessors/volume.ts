export const volume = function() {
  var time = function(d: any) { return d.time; },
      volume = function(d: any) { return d.volume; };

  function accessor(d: any): any {
    return accessor.volume(d);
  }

  accessor.t = time;
  accessor.v = volume;

  accessor.time = function(_?: any) {
    if (!arguments.length) return time;
    time = _;
    accessor.t = _;
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
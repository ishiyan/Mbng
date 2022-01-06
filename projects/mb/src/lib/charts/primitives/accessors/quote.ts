export const quote = function() {
  var time = function(d: any) { return d.time; },
    mid = function(d: any) { return (d.askPrice + d.bidPrice) / 2; },
    ask = function(d: any) { return d.askPrice; },
    bid = function(d: any) { return d.bidPrice; };

  function accessor(d: any): any {
    return accessor.v(d);
  }

  accessor.t = time;
  accessor.a = ask;
  accessor.b = bid;
  accessor.v = mid;
  accessor.p = mid;
  accessor.c = mid;

  accessor.time = function(_?: any) {
    if (!arguments.length) return time;
    time = _;
    accessor.t = _;
    return accessor;
  };

  accessor.ask = function(_?: any) {
    if (!arguments.length) return ask;
    ask = _;
    accessor.a = _;
    return accessor;
  };

  accessor.bid = function(_?: any) {
    if (!arguments.length) return bid;
    bid = _;
    accessor.b = _;
    return accessor;
  };

  return accessor;
};
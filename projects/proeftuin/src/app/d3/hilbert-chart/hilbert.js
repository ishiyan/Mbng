module.exports = (function () {
  // From Mike Bostock: http://bl.ocks.org/597287
  // Adapted from Nick Johnson: http://bit.ly/biWkkq
  var pairs = [
    [[0, 3], [1, 0], [3, 1], [2, 0]],
    [[2, 1], [1, 1], [3, 0], [0, 2]],
    [[2, 2], [3, 3], [1, 2], [0, 1]],
    [[0, 0], [3, 2], [1, 3], [2, 3]]
  ];
  // d2xy and rot are from:
  // http://en.wikipedia.org/wiki/Hilbert_curve#Applications_and_mapping_algorithms
  function rot(n, x, y, rx, ry) {
    if (ry === 0) {
      if (rx === 1) {
        x = n - 1 - x;
        y = n - 1 - y;
      }
      return [y, x];
    }
    return [x, y];
  }
  return {
    xy2d: function (x, y, z) {
      var quad = 0,
        pair,
        i = 0;
      while (--z >= 0) {
        pair = pairs[quad][(x & (1 << z) ? 2 : 0) | (y & (1 << z) ? 1 : 0)];
        i = (i << 2) | pair[0];
        quad = pair[1];
      }
      return i;
    },
    d2xy: function (z, t) {
      var n = 1 << z,
        x = 0,
        y = 0;
      for (var s = 1; s < n; s *= 2) {
        var rx = 1 & (t / 2),
          ry = 1 & (t ^ rx);
        var xy = rot(s, x, y, rx, ry);
        x = xy[0] + s * rx;
        y = xy[1] + s * ry;
        t /= 4;
      }
      return [x, y];
    }
  };
})();
/*
exports.d2xy = function(d) {
  d = Math.floor(d);
  var curPos = {
    x: 0,
    y: 0
  };
  var s = 1;
  var iter = 0;
  while (d > 0) {
    var ry = 1 & (d/2);
    var rx = 1 & (ry ^ d);
    //log("s:"+s+" d:"+d+" r:"+rx+','+ry);

    // Rotate, if need be
    if (rx == 0) {
      if (ry == 1) {
        curPos = {
          x: s - 1 - curPos.x,
          y: s - 1 - curPos.y
        };
      }
      curPos = {
        x: curPos.y,
        y: curPos.x
      };
    }

    curPos = {
      x: curPos.x + s*rx,
      y: curPos.y + s*ry
    };

    s *= 2;
    d = Math.floor(d/4);
    iter = (iter + 1) % 2;
  }
  if (iter == 0) {
    curPos = {
      x: curPos.y,
      y: curPos.x
    };
  }
  return curPos;
};

var horseshoe2d = [0, 1, 3, 2];

exports.xy2d = function(x, y) {
  x = Math.floor(x);
  y = Math.floor(y);
  var s = 1;
  var max = Math.max(x,y);
  var level = 0;
  for (; 2*s <= max; s*=2) {
    level = (level + 1) % 2;
  }
  if (level % 2 == 1) {
    var t = x;
    x = y;
    y = t;
  }

  var d = 0;
  while(s > 0) {
    var rx = x&s && 1;
    var ry = y&s && 1;
    d *= 4;
    d += horseshoe2d[2*ry + rx];
    //log("s: " + s + " d: " + d + " r:("+rx+','+ry+')');
    if (rx == 0) {
      if (ry == 1) {
        x = s-1 - x;
        y = s-1 - y;
      }
      var t = x;
      x = y;
      y = t;
    }
    x %= s;
    y %= s;
    s = Math.floor(s / 2);
  }
  return d;
};
*/
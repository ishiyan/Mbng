import { functor } from "../functor";

export const arrow = function () {
  var fx = functor(0),
    fy = functor(0),
    width = functor(12),
    height = functor(15),
    orient = functor('up'), // 'up', 'down', 'left', 'right'
    tail = functor(true);

  function arrow(d: any, i: any): string {
    var path,
      x = fx(d, i),
      y = fy(d, i),
      w = width(d, i),
      h = height(d, i),
      o = orient(d, i),
      t = tail(d, i),
      neg = o === 'left' || o === 'up' ? 1 : -1,
      ws = w / 3,         // Width Segment
      pw = w / 2,         // Point width
      ph = t ? h / 2 : h; // Point Height

    path = 'M ' + x + ' ' + y;

    switch (o) {
      case 'up':
      case 'down':
        path += ' l ' + -pw + ' ' + neg * ph + ' l ' + ws + ' ' + 0;
        if (t) path += ' l ' + 0 + ' ' + neg * ph;
        path += ' l ' + ws + ' ' + 0;
        if (t) path += ' l ' + 0 + ' ' + -neg * ph;
        path += ' l ' + ws + ' ' + 0;
        break;

      case 'left':
      case 'right':
        path += ' l ' + neg * ph + ' ' + -pw + ' l ' + 0 + ' ' + ws;
        if (t) path += ' l ' + neg * ph + ' ' + 0;
        path += ' l ' + 0 + ' ' + ws;
        if (t) path += ' l ' + -neg * ph + ' ' + 0;
        path += ' l ' + 0 + ' ' + ws;
        break;

      default: throw "Unsupported arrow.orient() = " + orient;
    }

    return path + ' z';
  }

  arrow.x = function (_?: any) {
    if (!arguments.length) return fx;
    fx = functor(_);
    return arrow;
  };

  arrow.y = function (_?: any) {
    if (!arguments.length) return fy;
    fy = functor(_);
    return arrow;
  };

  arrow.height = function (_?: any) {
    if (!arguments.length) return height;
    height = functor(_);
    return arrow;
  };

  arrow.width = function (_?: any) {
    if (!arguments.length) return width;
    width = functor(_);
    return arrow;
  };

  arrow.orient = function (_?: any): any {
    if (!arguments.length) return orient;
    orient = functor(_);
    return arrow;
  };

  arrow.tail = function (_?: any) {
    if (!arguments.length) return tail;
    tail = functor(_);
    return arrow;
  };

  return arrow;
};

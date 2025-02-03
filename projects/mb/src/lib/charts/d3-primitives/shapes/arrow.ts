import { functor } from '../functor';

export const arrow = () => {
  let fx = functor(0);
  let fy = functor(0);
  let width = functor(12);
  let height = functor(15);
  let orient = functor('up'); // 'up', 'down', 'left', 'right'
  let tail = functor(true);

  // eslint-disable-next-line @typescript-eslint/no-shadow
  const arrow = (d: any, i: any): string => {
    const x = fx(d, i);
    const y = fy(d, i);
    const w = width(d, i);
    const h = height(d, i);
    const o = orient(d, i);
    const t = tail(d, i);
    const neg = o === 'left' || o === 'up' ? 1 : -1;
    const ws = w / 3; // Width segment.
    const pw = w / 2; // Point width.
    const ph = t ? h / 2 : h; // Point height

    let path = 'M ' + x + ' ' + y;

    switch (o) {
      case 'up':
      case 'down':
        path += ' l ' + -pw + ' ' + neg * ph + ' l ' + ws + ' ' + 0;
        if (t) {
          path += ' l ' + 0 + ' ' + neg * ph;
        }

        path += ' l ' + ws + ' ' + 0;
        if (t) {
          path += ' l ' + 0 + ' ' + -neg * ph;
        }

        path += ' l ' + ws + ' ' + 0;
        break;

      case 'left':
      case 'right':
        path += ' l ' + neg * ph + ' ' + -pw + ' l ' + 0 + ' ' + ws;
        if (t) {
          path += ' l ' + neg * ph + ' ' + 0;
        }

        path += ' l ' + 0 + ' ' + ws;
        if (t) {
          path += ' l ' + -neg * ph + ' ' + 0;
        }

        path += ' l ' + 0 + ' ' + ws;
        break;

      default: throw new Error('Unsupported arrow.orient() = ' + orient);
    }

    return path + ' z';
  };

  arrow.x = function(_?: any) {
    if (!arguments.length) {
      return fx;
    }
    fx = functor(_);
    return arrow;
  };

  arrow.y = function(_?: any) {
    if (!arguments.length) {
      return fy;
    }

    fy = functor(_);
    return arrow;
  };

  arrow.height = function(_?: any) {
    if (!arguments.length) {
      return height;
    }

    height = functor(_);
    return arrow;
  };

  arrow.width = function(_?: any) {
    if (!arguments.length) {
      return width;
    }

    width = functor(_);
    return arrow;
  };

  arrow.orient = function(_?: any): any {
    if (!arguments.length) {
      return orient;
    }

    orient = functor(_);
    return arrow;
  };

  arrow.tail = function(_?: any) {
    if (!arguments.length) {
      return tail;
    }

    tail = functor(_);
    return arrow;
  };

  return arrow;
};

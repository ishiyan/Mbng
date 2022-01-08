import * as d3 from 'd3';

import { functor } from '../functor';
import { arrow } from '../shapes/arrow';

// Injected dependencies.
export const tradearrow = function (tradeAccessor: any, plot: any, plotMixin: any) {
  // Closure function.
  return function () {
    // Container for private, direct access mixed in variables.
    const p = {} as any;
    const dispatch = d3.dispatch('mouseenter', 'mouseout');
    const svgArrow = arrow().orient(function (d: any) { return p.accessor.type(d) === 'buy' ? 'up' : 'down'; });
    var y = function (d: any) { return p.yScale(p.accessor.price(d)); };
    var arrowGenerator: any;

    function tradearrow(g: any) {
      const group = p.dataSelector(g);
      const classes = typesToClasses(g.datum());

      plot.appendPathsGroupBy(group.selection, p.accessor, 'tradearrow', classes);

      // Do not want mouse events on the highlight.
      group.entry.append('path').attr('class', 'highlight').style('pointer-events', 'none');

      group.selection.selectAll('path.tradearrow')
        .on('mouseenter', function (event: any, data: any) {
          const nearest = findNearest(data, d3.pointer(event)[0]);

          // Watch out here, not using generator as this is single element, not grouped.
          // Done purely to get this node correctly classed and technically only 1 node
          // can be selected for the moment.
          // @ts-ignore
          d3.select(this.parentNode).select('path.highlight').datum(nearest.d)
            .attr('d', svgArrow).call(classed, classes);
          // @ts-ignore
          dispatch.call('mouseenter', this, nearest.d, nearest.i);
        }).on('mouseout', function (data: any) {
          // @ts-ignore
          d3.select(this.parentNode).selectAll('path.highlight').datum([])
            .attr('d', null).attr('class', 'highlight');
          const nearest = findNearest(data, d3.pointer(event)[0]);
          // @ts-ignore
          dispatch.call('mouseout', this, nearest.d, nearest.i);
        });

      tradearrow.refresh(g);
    }

    tradearrow.refresh = function (g: any) {
      g.selectAll('path.tradearrow').attr('d', arrowGenerator);
    };

    /**
     * Pass through straight to `svgArrow`.
     *
     * Since all plotted trades are plotted as grouped `type`s, ensure for every trade `type` input
     * a definition of orient exists.
     *
     * If there is an undefined orient definition for trade type, you will probably get an error.
     *
     * Default is "buy" => "up", "sell" => "down".
     *
     * @param _ Either a constant or function that returns the orientation of the rendered arrow.
     *          Ensure for every input type a corresponding `svgArrow` orient value is returned.
     */
    tradearrow.orient = function (_?: any) {
      if (!arguments.length) return svgArrow.orient();
      svgArrow.orient(_);
      return binder();
    };

    /**
     * Define the way y position of the arrow is determined.
     * Useful if required to show under or over OHLC quotes.
     * Defaults to showing the arrow on the trade price value.
     */
    tradearrow.y = function (_?: any) {
      if (!arguments.length) return y;
      y = functor(_);
      return binder();
    };

    /**
     * Direct access to the underlying arrow.
     */
    tradearrow.arrow = function () {
      return svgArrow;
    };

    function binder() {
      svgArrow.x(function (d: any) { return p.xScale(p.accessor.time(d)); }).y(y);
      arrowGenerator = plot.joinPath(function () { return svgArrow; });
      return tradearrow;
    }

    function findNearest(d: any, x: any) {
      // Definitely know we're over a trade, but witch one?
      // Find the nearest...?
      // Should work _most_ of the time.
      return d.map(function (d: any, i: any) {
        return { d: d, i: i, x: p.xScale(p.accessor.time(d)) };
      })
        .reduce(function (p: any, c: any) {
          return Math.abs(p.x - x) < Math.abs(c.x - x) ? p : c;
        });
    }

    function typesToClasses(data: any) {
      return data.map(function (d: any) { return p.accessor.time(d); })
        .reduce(function (prev: any, cur: any) {
          if (prev[cur] === undefined) {
            prev[cur] = function (d: any) { return cur === p.accessor.time(d); };
          }

          return prev;
        }, {});
    }

    // Mixin 'superclass' methods and variables.
    plotMixin(tradearrow, p)
      .plot(tradeAccessor(), binder)
      .on(dispatch)
      .dataSelector(plotMixin.dataMapper.array);
    binder();

    return tradearrow;
  };
};

// d3 v4 no longer takes classed(Object), shim to convert Object and add classes to the selection
function classed(selection: any, classes: any) {
  Object.keys(classes).forEach(function (clazz) {
    selection.classed(clazz, classes[clazz]);
  });
}
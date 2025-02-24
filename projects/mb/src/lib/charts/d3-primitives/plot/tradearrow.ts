import * as d3 from 'd3';

import { functor } from '../functor';
import { arrow } from '../shapes/arrow';

// Injected dependencies.
export const tradearrow = (tradeAccessor: any, plot: any, plotMixin: any) =>
  // Closure function.
  () => {
    const p = {} as any;
    const dispatch = d3.dispatch('mouseenter', 'mouseout');
    let y = (d: any) => p.yScale(p.accessor.price(d));
    const svgArrow = arrow().orient((d: any) => p.accessor.type(d).startsWith('buy') ? 'up' : 'down');
    let arrowGenerator: any;

    // eslint-disable-next-line no-underscore-dangle
    const tradearrow_ = (g: any) => {
      const group = p.dataSelector(g);
      const classes = typesToClasses(g.datum());

      plot.appendPathsGroupBy(group.selection, p.accessor, 'tradearrow', classes);

      // Do not want mouse events on the highlight.
      group.entry.append('path').attr('class', 'highlight').style('pointer-events', 'none');

      group.selection.selectAll('path.tradearrow')
        .on('mouseenter', function(event: any, data: any) {
          const nearest = findNearest(data, d3.pointer(event)[0]);

          // Watch out here, not using generator as this is single element, not grouped.
          // Done purely to get this node correctly classed and technically only 1 node
          // can be selected for the moment.
          // eslint-disable-next-line @typescript-eslint/ban-ts-comment
          // @ts-ignore
          d3.select(this.parentNode).select('path.highlight').datum(nearest.d)
            .attr('d', svgArrow).call(classed, classes);
          // eslint-disable-next-line @typescript-eslint/ban-ts-comment
          // @ts-ignore
          dispatch.call('mouseenter', this, nearest.d, nearest.i);
        }).on('mouseout', function(event: any, data: any) {
          // eslint-disable-next-line @typescript-eslint/ban-ts-comment
          // @ts-ignore
          d3.select(this.parentNode).selectAll('path.highlight').datum([])
            .attr('d', null).attr('class', 'highlight');
          const nearest = findNearest(data, d3.pointer(event)[0]);
          // eslint-disable-next-line @typescript-eslint/ban-ts-comment
          // @ts-ignore
          dispatch.call('mouseout', this, nearest.d, nearest.i);
        });

        tradearrow_.refresh(g);
    };

    tradearrow_.refresh = (g: any) => {
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
    tradearrow_.orient = function(_?: any) {
      if (!arguments.length) {
        return svgArrow.orient();
      }

      svgArrow.orient(_);
      return binder();
    };

    /**
     * Define the way y position of the arrow is determined.
     * Useful if required to show under or over OHLC quotes.
     * Defaults to showing the arrow on the trade price value.
     */
    tradearrow_.y = function(_?: any) {
      if (!arguments.length) {
        return y;
      }

      y = functor(_);
      return binder();
    };

    /**
     * Direct access to the underlying arrow.
     */
    tradearrow_.arrow = () => svgArrow;

    const binder = () => {
      svgArrow.x((d: any) => p.xScale(p.accessor.time(d))).y(y);
      arrowGenerator = plot.joinPath(() => svgArrow);
      return tradearrow;
    };

    const findNearest = (data: any, x: any) =>
      // Definitely know we're over a trade, but witch one?
      // Find the nearest...?
      // Should work _most_ of the time.
      data.map((d: any, i: any) => ({ d: d, i: i, x: p.xScale(p.accessor.time(d)) }))
        .reduce((q: any, c: any) => Math.abs(q.x - x) < Math.abs(c.x - x) ? q : c);

    const typesToClasses = (data: any) =>
      data.map((d: any) => p.accessor.type(d))
      .reduce((prev: any, cur: any) => {
          if (prev[cur] === undefined) {
            prev[cur] = (d: any) => cur === p.accessor.type(d);
          }

          return prev;
        }, {});

    // Mixin 'superclass' methods and variables.
    plotMixin(tradearrow_, p)
      .plot(tradeAccessor(), binder)
      .on(dispatch)
      .dataSelector(plotMixin.dataMapper.array);
    binder();

    return tradearrow_;
  };

// d3 v4 no longer takes classed(Object), shim to convert Object and add classes to the selection
const classed = (selection: any, classes: any) => {
  Object.keys(classes).forEach((clazz) => {
      selection.classed(clazz, classes[clazz]);
    });
};

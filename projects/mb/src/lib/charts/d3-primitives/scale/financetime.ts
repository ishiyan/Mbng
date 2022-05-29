import * as d3 from 'd3';

import { rebindCallback } from '../rebind';
import { zoomable as zoomable_ } from './zoomable';

/**
 Finance time scale which is not necessarily continuous, is required to be plot continuous. Finance scale
 generally contains data points on days where a market is open but no points when closed, such as weekday
 and weekends respectively. When plot, is done so without weekend gaps.
 */
export const financetime = (scaleWiden: any) => { // Injected dependencies
  // eslint-disable-next-line prefer-arrow/prefer-arrow-functions
  function fintime(tickMethods: any, genericFmt: any, index?: any, domain?: any,
    padding?: any, outerPadding?: any, zoomLimit?: any, closestTicks?: any, zoomable?: any) {
    let dateIndexMap: any;
    let band = 3;
    const tickState = { tickFormat: tickMethods.daily[tickMethods.daily.length - 1][2] };

    index = index || d3.scaleLinear();
    domain = domain || [new Date(0), new Date(1)];
    padding = padding === undefined ? 0.2 : padding;
    outerPadding = outerPadding === undefined ? 0.65 : outerPadding;
    zoomLimit = zoomLimit || { domain: index.domain() }; // Wrap in object to carry onto zoomable
    closestTicks = closestTicks || false;

    const zoomed = () => {
      band = rangeBand(index, domain, padding);
      return scale;
    };

    zoomable = zoomable || zoomable_()(index, zoomed, zoomLimit);

    /**
     * Scales the value to domain. If the value is not within the domain, will currently brutally round the data:
     * - If before min domain, will round to 1 index value before min domain
     * - If after max domain, will round to 1 index value after min domain
     * - If within domain, but not mapped to domain value, uses d3.bisect to find nearest domain index
     *
     * This logic was not required until the domain was being updated and scales re-rendered and this line
     * https://github.com/mbostock/d3/blob/abbe1c75c16c3e9cb08b1d0872f4a19890d3bb58/src/svg/axis.js#L107 was causing error.
     * New scale generated ticks that old scale did not have, causing error during transform. To avoid error this logic
     * was added.
     *
     * @param x The value to scale.
     * @param offset Apply an index offset to the mapped x (date) parameter.
     */
    const scale = (x: any, offset: any): any => {
      let mappedIndex = dateIndexMap[x instanceof Date ? x.getTime() : +x];
      offset = offset || 0;

      // Make sure the value has been mapped, if not, determine if it's just before,
      // round in, or just after domain.
      if (mappedIndex === undefined) {
        if (domain[0] > x) {
          // Less than min, round just out of domain.
          mappedIndex = -1;
        }
        else {
          // Else let bisect determine where in or just after than domain it is.
          mappedIndex = d3.bisect(domain, x);
        }
      }

      return index(mappedIndex + offset);
    };

    /**
     * Invert the passed range coordinate to the corresponding domain. Returns null if no valid domain available.
     *
     * @param y
     * @returns If the range value cannot be mapped. eg, if range value is outside of the mapped domain.
     */
    scale.invert = (y: any): null => {
      const d = domain[scale.invertToIndex(y)];
      return d ? d : null;
    };

    /**
     * Inverts the coordinate to the corresponding domain.
     * <b>NOTE:</b> May return values outside of the domain such as negative indexes,
     * or an index greater than what is available in the domain.
     *
     * @param y
     * @returns A number representing the index in the domain the range value has been inverted to.
     *          May return values outside of the domain such as negatives or value greater
     *          than `domain().length-1`.
     */
    scale.invertToIndex = (y: any): number => Math.round(index.invert(y));

    /**
     * As the underlying structure relies on a full array, ensure the full domain is passed here,
     * not just min and max values.
     *
     * @param _ The full domain array.
     */
    // eslint-disable-next-line prefer-arrow/prefer-arrow-functions
    scale.domain = function(_?: any): any {
      if (!arguments.length) {
        let visible = index.domain();

        if (visible[0] < 0 && visible[visible.length - 1] < 0) {
          // If it's all negative return empty, nothing is visible.
          return [];
        }

        visible = [
          // If min is fraction, it is partially out of view, but still partially visible, round up (ceil).
          Math.max(Math.ceil(visible[0]), 0),
          // If max is fraction, is partially out of view, but still partially visible, round down (floor).
          Math.min(Math.floor(visible[visible.length - 1]), domain.length - 1)
        ];

        // Grab visible domain, inclusive.
        return domain.slice(visible[0], visible[visible.length - 1] + 1);
      }

      domain = _;
      return applyDomain();
    };

    const domainMap = () => {
      dateIndexMap = lookupIndex(domain);
    };

    const applyDomain = () => {
      domainMap();
      index.domain([0, domain.length - 1]);
      zoomed();

      // Apply outerPadding and widen the outer edges by pulling the domain in to ensure
      // start and end bands are fully visible.
      index.domain(index.range().map(scaleWiden(outerPadding, band)).map(index.invert));

      // Capture the zoom limit after the domain has been applied.
      zoomLimit.domain = index.domain();
      return zoomed();
    };

    scale.copy = () =>
      fintime(tickMethods, genericFmt, index.copy(), domain, padding, outerPadding, zoomLimit, closestTicks);

    /**
     * Equivalent to d3's ordinal.rangeBand(). It could not be named rangeBand as d3 uses the method
     * to determine how axis ticks should be rendered. This scale is a hybrid ordinal and linear scale,
     * such that scale(x) returns y at center of the band as does d3.scale.linear()(x) does, whereas
     * d3.scale.ordinal()(x) returns y at the beginning of the band. When rendering svg axis, d3
     * compensates for this checking if rangeBand is defined and compensates as such.
     */
    scale.band = (): number => band;

    // eslint-disable-next-line prefer-arrow/prefer-arrow-functions
    scale.outerPadding = function(_?: any): any {
      if (!arguments.length) {
        return outerPadding;
      }

      outerPadding = _;
      return applyDomain();
    };

    // eslint-disable-next-line prefer-arrow/prefer-arrow-functions
    scale.padding = function(_?: any): any {
      if (!arguments.length) {
        return padding;
      }

      padding = _;
      return applyDomain();
    };

    scale.zoomable = (): any => zoomable;

    /**
     * Generates ticks as continuous as possible against the underlying domain. Where continuous time ticks
     * fall on where there is no matching domain (such as weekend or holiday day), it will be replaced with
     * the nearest domain datum ahead of the tick to keep close to continuous.
     *
     * Ticks based heavily on d3 implementation. Attempted to implement this using composition with d3.time.scale,
     * but in the end there were sufficient differences to 'roll my own'.
     * - Different base tick steps: millis not required (yet!).
     * - State based tick formatting given the non continuous, even steps of ticks.
     * - Supporting daily and intraday continuous (no gaps) plotting.
     * https://github.com/mbostock/d3/blob/e03b6454294e1c0bbe3125f787df56c468658d4e/src/time/scale.js#L67
     */
    scale.ticks = (interval: any, steps: any): any => {
      const visibleDomain = scale.domain();
      const indexDomain = index.domain();

      if (!visibleDomain.length) {
        // Nothing is visible, no ticks to show.
        return [];
      }

      const method = interval === undefined ? tickMethod(visibleDomain, indexDomain, 10) :
        typeof interval === 'number' ? tickMethod(visibleDomain, indexDomain, interval) : null;

      tickState.tickFormat = method ? method[2] : tickMethod(visibleDomain, indexDomain, 10)[2];

      if (method) {
        interval = method[0];
        steps = method[1];
      }

      // Interval, possibly contains values not in domain.
      const intervalRange = interval.every(steps)
        .range(visibleDomain[0], +visibleDomain[visibleDomain.length - 1] + 1);

      return intervalRange
        // Line up interval ticks with domain, possibly adding duplicates.
        .map(domainTicks(visibleDomain, closestTicks))
        // Filter out duplicates, produce new 'reduced' array.
        .reduce(sequentialDuplicates, []);
    };

    const tickMethod = (visibleDomain: any, indexDomain: any, count: any): any => {
      if (visibleDomain.length === 1) {
        // If we only have 1 to display, show the generic tick method.
        return genericFmt;
      }

      const visibleDomainExtent = visibleDomain[visibleDomain.length - 1] - visibleDomain[0];

      // Determine whether we're showing daily or intraday data.
      const intraday = visibleDomainExtent / dailyStep < 1;
      const methods = intraday ? tickMethods.intraday : tickMethods.daily;
      const tickSteps = intraday ? intradayTickSteps : dailyTickSteps;
      const k = Math.min(Math.round(countK(visibleDomain, indexDomain) * count), count);

      // Adjust the target based on proportion of domain that is visible.
      const target = visibleDomainExtent / k;
      const i = d3.bisect(tickSteps, target);

      return i === methods.length ?
        // Return the largest tick method.
        methods[i - 1] :
        // Else return close approximation or first tickMethod.
        i ? methods[target / tickSteps[i - 1] < tickSteps[i] / target ? i - 1 : i] : methods[i];
    };

    /**
     * By default `ticks()` will generate tick values greater than the nearest domain interval
     * value, which may not be best value, particularly for irregular intraday domains.
     *
     * Setting this to true will cause tick generation to choose values closest to the
     * corresponding domain value for the calculated interval.
     *
     * @param _ Optional `boolean` value. If argument is passed, sets the value
     *          and returns this instance, if no argument, returns the current value.
     */
    // eslint-disable-next-line prefer-arrow/prefer-arrow-functions
    scale.closestTicks = function(_?: any): any {
      if (!arguments.length) {
        return closestTicks;
      }

      closestTicks = _;
      return scale;
    };

    /**
     * NOTE: The type of tick format returned is dependant on ticks that were generated.
     * To obtain the correct format for ticks, ensure ticks function is called first,
     * otherwise a default tickFormat will be returned which may not be the optimal
     * representation of the current domain state.
     */
    // eslint-disable-next-line @typescript-eslint/ban-types
    scale.tickFormat = (): Function => (date: any) => tickState.tickFormat(date);

    rebindCallback(scale, index, zoomed, 'range');
    domainMap();
    return zoomed();
  }

  const rangeBand = (linear: any, domain: any, padding: any) =>
    (Math.abs(linear(domain.length - 1) - linear(0)) / Math.max(1, domain.length - 1)) * (1 - padding);

  /**
   * Calculates the proportion of domain that is visible.
   * Used to reduce the overall count by this factor.
   */
  const countK = (visibleDomain: any, indexDomain: any): number =>
    visibleDomain.length / (indexDomain[indexDomain.length - 1] - indexDomain[0]);

  const lookupIndex = (array: any) => {
    const lookup = {} as any;
    array.forEach((d: any, i: any) => { lookup[+d] = i; });
    return lookup;
  };

  const domainTicks = (visibleDomain: any, closest: any) => {
    // Quickly lookup index of the domain.
    const visibleDomainLookup = lookupIndex(visibleDomain);

    return (d: any) => {
      const value = visibleDomainLookup[+d];
      if (value !== undefined) {
        return visibleDomain[value];
      }

      let index = d3.bisect(visibleDomain, d);
      if (closest && index > 0) {
        // `d3.bisect` gets the index of the closest value that is the greater than d,
        // which may not be the value that is closest to d.
        // If the closest value that is smaller than d is closer, choose that instead.
        if ((+d - (+visibleDomain[index - 1])) < (+visibleDomain[index] - +d)) {
          index--;
        }
      }

      return visibleDomain[index];
    };
  };

  const sequentialDuplicates = (previous: any, current: any) => {
    if (previous.length === 0 || previous[previous.length - 1] !== current) {
      previous.push(current);
    }

    return previous;
  };

  const dailyStep = 864e5;
  const dailyTickSteps = [
    dailyStep, // 1-day
    6048e5,    // 1-week
    2592e6,    // 1-month
    7776e6,    // 3-month
    31536e6    // 1-year
  ];
  const intradayTickSteps = [
    1e3,      // 1-second
    5e3,      // 5-second
    15e3,     // 15-second
    3e4,      // 30-second
    6e4,      // 1-minute
    3e5,      // 5-minute
    9e5,      // 15-minute
    18e5,     // 30-minute
    36e5,     // 1-hour
    108e5,    // 3-hour
    216e5,    // 6-hour
    432e5,    // 12-hour
    dailyStep // 1-day
  ];

  const dayFormat = d3.timeFormat('%b %e');
  const yearFormat = d3_v3_multi_shim([
    [d3.timeFormat('%b %Y'), (d: any) => d.getMonth()],
    [d3.timeFormat('%Y'), () => true]
  ]);
  const intradayFormat = d3_v3_multi_shim([
    [d3.timeFormat(':%S'), (d: any) => d.getSeconds()],
    [d3.timeFormat('%I:%M'), (d: any) => d.getMinutes()],
    [d3.timeFormat('%I %p'), () => true]
  ]);
  const genericFormat = [d3.timeSecond, 1, d3_v3_multi_shim([
    [d3.timeFormat(':%S'), (d: any) => d.getSeconds()],
    [d3.timeFormat('%I:%M'), (d: any) => d.getMinutes()],
    [d3.timeFormat('%I %p'), (d: any) => d.getHours()],
    [d3.timeFormat('%b %e'), () => true]
  ])
  ];

  const dayFormatUtc = d3.utcFormat('%b %e');
  const yearFormatUtc = d3_v3_multi_shim([
    [d3.utcFormat('%b %Y'), (d: any) => d.getUTCMonth()],
    [d3.utcFormat('%Y'), () => true]
  ]);
  const intradayFormatUtc = d3_v3_multi_shim([
    [d3.utcFormat(':%S'), (d: any) => d.getUTCSeconds()],
    [d3.utcFormat('%I:%M'), (d: any) => d.getUTCMinutes()],
    [d3.utcFormat('%I %p'), () => true]
  ]);
  const genericFormatUtc = [d3.timeSecond, 1, d3_v3_multi_shim([
    [d3.utcFormat(':%S'), (d: any) => d.getUTCSeconds()],
    [d3.utcFormat('%I:%M'), (d: any) => d.getUTCMinutes()],
    [d3.utcFormat('%I %p'), (d: any) => d.getUTCHours()],
    [d3.utcFormat('%b %e'), () => true]
  ])
  ];

  const dailyTickMethod = [
    [d3.timeDay, 1, dayFormat],
    [d3.timeMonday, 1, dayFormat],
    [d3.timeMonth, 1, yearFormat],
    [d3.timeMonth, 3, yearFormat],
    [d3.timeYear, 1, yearFormat]
  ];
  const intradayTickMethod = [
    [d3.timeSecond, 1, intradayFormat],
    [d3.timeSecond, 5, intradayFormat],
    [d3.timeSecond, 15, intradayFormat],
    [d3.timeSecond, 30, intradayFormat],
    [d3.timeMinute, 1, intradayFormat],
    [d3.timeMinute, 5, intradayFormat],
    [d3.timeMinute, 15, intradayFormat],
    [d3.timeMinute, 30, intradayFormat],
    [d3.timeHour, 1, intradayFormat],
    [d3.timeHour, 3, intradayFormat],
    [d3.timeHour, 6, intradayFormat],
    [d3.timeHour, 12, intradayFormat],
    [d3.timeDay, 1, dayFormat]
  ];

  const dailyTickMethodUtc = [
    [d3.utcDay, 1, dayFormatUtc],
    [d3.utcMonday, 1, dayFormatUtc],
    [d3.utcMonth, 1, yearFormatUtc],
    [d3.utcMonth, 3, yearFormatUtc],
    [d3.utcYear, 1, yearFormatUtc]
  ];
  const intradayTickMethodUtc = [
    [d3.utcSecond, 1, intradayFormatUtc],
    [d3.utcSecond, 5, intradayFormatUtc],
    [d3.utcSecond, 15, intradayFormatUtc],
    [d3.utcSecond, 30, intradayFormatUtc],
    [d3.utcMinute, 1, intradayFormatUtc],
    [d3.utcMinute, 5, intradayFormatUtc],
    [d3.utcMinute, 15, intradayFormatUtc],
    [d3.utcMinute, 30, intradayFormatUtc],
    [d3.utcHour, 1, intradayFormatUtc],
    [d3.utcHour, 3, intradayFormatUtc],
    [d3.utcHour, 6, intradayFormatUtc],
    [d3.utcHour, 12, intradayFormatUtc],
    [d3.utcDay, 1, dayFormatUtc]
  ];

  const scaleFinancetime = () =>
    fintime({ daily: dailyTickMethod, intraday: intradayTickMethod }, genericFormat);

  scaleFinancetime.utc = () =>
    fintime({ daily: dailyTickMethodUtc, intraday: intradayTickMethodUtc }, genericFormatUtc);

  return scaleFinancetime;
};

const d3_v3_multi_shim = (multi: any) => (d: any) => {
  for (const elem of multi) {
    if (elem[1](d)) {
      return elem[0](d);
    }
  }
};


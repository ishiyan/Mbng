/**
 * Creates a decorated zoomable view of the passed scale.
 * As the finance scale deals with an array and integer positions within the array,
 * it does not support the d3 zoom behaviour. d3 zoom behaviour rescales the input domain.
 *
 * Finance scale is composed of an array of dates which is fixed in length
 * and position and a linear scale mapping index to range.
 *
 * The linear scale can be zoomed. This object decorates the scale with only the methods
 * required by zoom (invert, domain, copy). On zoom, calls the based zoomed callback.
 *
 * NOTE: This is not a complete scale, it will throw errors
 * if it is used for anything else but zooming.
 */
export const zoomable = () => {
  // eslint-disable-next-line prefer-arrow/prefer-arrow-functions, @typescript-eslint/no-shadow
  function zoomable(linear: any, zoomed: any, domainLimit: any, clamp?: any) {
    clamp = clamp !== undefined ? clamp : true;

    // Delegates the scale call to the underlying linear scale.
    // eslint-disable-next-line prefer-arrow/prefer-arrow-functions
    function scale(/* _: any */) {
      // eslint-disable-next-line prefer-rest-params
      return linear.apply(linear, arguments);
    }

    scale.invert = linear.invert;

    // eslint-disable-next-line prefer-arrow/prefer-arrow-functions
    scale.domain = function(_?: any) {
      if (!arguments.length) {
        return linear.domain();
      }

      if (clamp) {
        linear.domain([
          Math.max(domainLimit.domain[0], _[0]),
          Math.min(domainLimit.domain[1], _[1])
        ]);
      }
      else {
        linear.domain(_);
      }

      if (zoomed) {
        // Callback to that we have been zoomed.
        zoomed();
      }

      return scale;
    };

    // eslint-disable-next-line prefer-arrow/prefer-arrow-functions
    scale.range = function() {
      if (!arguments.length) {
        return linear.range();
      }

      throw new Error('Zoomable is a read only range. Use this scale for zooming only.');
    };

    // eslint-disable-next-line prefer-arrow/prefer-arrow-functions
    scale.copy = function() {
      return zoomable(linear.copy(), zoomed, domainLimit, clamp);
    };

    // eslint-disable-next-line prefer-arrow/prefer-arrow-functions
    scale.clamp = function(_?: any) {
      if (!arguments.length) {
        return clamp;
      }

      clamp = _;
      return scale;
    };

    return scale;
  }

  return zoomable;
};

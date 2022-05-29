export const trendline = () => {
  /** Supports getter and setter. */
  // eslint-disable-next-line prefer-arrow/prefer-arrow-functions
  const startTime = function(d: any, _?: any) {
    if (arguments.length < 2) {
      return d.start.time;
    }

    d.start.time = _;
  };

  /** Supports getter and setter. */
  // eslint-disable-next-line prefer-arrow/prefer-arrow-functions
  const startValue = function(d: any, _?: any) {
    if (arguments.length < 2) {
      return d.start.value;
    }

    d.start.value = _;
  };

  /** Supports getter and setter. */
  // eslint-disable-next-line prefer-arrow/prefer-arrow-functions
  const endTime = function(d: any, _?: any) {
    if (arguments.length < 2) {
      return d.end.time;
    }

    d.end.time = _;
  };

  /** Supports getter and setter. */
  // eslint-disable-next-line prefer-arrow/prefer-arrow-functions
  const endValue = function(d: any, _?: any) {
    if (arguments.length < 2) {
      return d.end.value;
    }

    d.end.value = _;
  };

  const accessor = (d: any): any => accessor.startValue(d);

  accessor.startTime = startTime;
  accessor.startValue = startValue;
  accessor.endTime = endTime;
  accessor.endValue = endValue;

  return accessor;
};

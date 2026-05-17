// Method is assumed to be a standard D3 getter-setter:
// If passed with no arguments, gets the value.
// If passed with arguments, sets the value and returns the target.
const doRebind = (target: any, source: any, method: any, postSetCallback: any) =>
  function() {
    // eslint-disable-next-line prefer-rest-params
    const value = method.apply(source, arguments);
    if (postSetCallback && value === source) {
      postSetCallback();
    }
    return value === source ? target : value;
  };

// Slight modification to d3.rebind taking a post set callback
// https://github.com/d3/d3/blob/v3.5.17/src/core/rebind.js
// Copies a variable number of methods from source to target.
export const rebindCallback = (target: any, source: any, postSetCallback: any, ...methods: string[]) => {
  for (const method of methods) {
    target[method] = doRebind(target, source, source[method], postSetCallback);
  }
  return target;
};

export const rebinder = {
  rebindCallback: rebindCallback,

  rebind: (target: any, source: any, ...methods: string[]) =>
    rebindCallback(target, source, undefined, ...methods),
};

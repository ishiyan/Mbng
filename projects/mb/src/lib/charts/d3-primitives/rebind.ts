// Method is assumed to be a standard D3 getter-setter:
// If passed with no arguments, gets the value.
// If passed with arguments, sets the value and returns the target.
function doRebind(target: any, source: any, method: any, postSetCallback: any) {
  return function() {
    var value = method.apply(source, arguments);
    if (postSetCallback && value === source) {
      postSetCallback();
    }
    return value === source ? target : value;
  };
}

// Slight modification to d3.rebind taking a post set callback
// https://github.com/d3/d3/blob/v3.5.17/src/core/rebind.js
// // Copies a variable number of methods from source to target.
export function rebindCallback(target: any, source: any, arg1?: any, arg2?: any, postSetCallback?: any) {
  var i = 2, n = arguments.length, method: any;
  while (++i < n) {
    target[method = arguments[i]] = doRebind(target, source, source[method], postSetCallback);
  }
  return target;
}

export var rebinder = {
  rebindCallback: rebindCallback,

  rebind: function(target: any, source: any) {
    var newArgs = Array.prototype.slice.call(arguments, 0);
    newArgs.splice(2, 0, undefined);
    return rebindCallback.apply(this, newArgs as any);
  }
};

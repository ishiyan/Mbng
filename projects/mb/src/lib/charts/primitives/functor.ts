// https://github.com/d3/d3/blob/v3.5.17/src/core/functor.js
export function functor(v: any) {
  return typeof v === "function" ? v : function() { return v; };
}

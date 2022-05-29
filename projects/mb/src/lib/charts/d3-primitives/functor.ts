// https://github.com/d3/d3/blob/v3.5.17/src/core/functor.js
export const functor = (v: any) => typeof v === 'function' ? v : () => v;

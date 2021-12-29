/**
 * Generates a procedural palette using the following cosine equation.
 *
 * color(t) = a + b ⋅ cos[ 2π(c⋅t+d)]
 *
 * As *t* runs from 0 to 1 (our normalized palette index or domain), the
 * cosine oscilates *c* times with a phase of *d*. The result is scaled and
 * biased by *a* and *b* to meet the desired constrast and brightness.
 *
 * In order to get hue variation the four parameters *a*, *b*, *c* and *d* must
 * be vectors of three components (red, gree, blue).
 *
 * If you need to ensure the palettes cycle over the *0..1* interval exactly,
 * then you'll need to make *c* an integer number of halves
 * *(0.0, 0.5, 1.0, 1.5, 2.0, ...)*.
 *
 * If you worry about *C1* continuity, then make *c* an integer (and you'll get
 * infinite degree continuity in fact).
 *
 * All the palattes produced by the above formula have the same rythm.
 *
 * Example values:
 *
 * a = [0.5, 0.5, 0.5], b = [0.5, 0.5, 0.5], c = [1.0, 1.0, 1.0], d = [0.00, 0.33, 0.67]
 *
 * a = [0.5, 0.5, 0.5], b = [0.5, 0.5, 0.5], c = [1.0, 1.0, 1.0], d = [0.00, 0.10, 0.20]
 *
 * a = [0.5, 0.5, 0.5], b = [0.5, 0.5, 0.5], c = [1.0, 1.0, 1.0], d = [0.30, 0.20, 0.20]
 *
 * a = [0.5, 0.5, 0.5], b = [0.5, 0.5, 0.5], c = [1.0, 1.0, 0.5], d = [0.80, 0.90, 0.30]
 *
 * a = [0.5, 0.5, 0.5], b = [0.5, 0.5, 0.5], c = [1.0, 0.7, 0.4], d = [0.00, 0.15, 0.20]
 *
 * a = [0.5, 0.5, 0.5], b = [0.5, 0.5, 0.5], c = [2.0, 1.0, 0.0], d = [0.50, 0.20, 0.25]
 *
 * a = [0.8, 0.5, 0.4], b = [0.2, 0.4, 0.2], c = [2.0, 1.0, 1.0], d = [0.00, 0.25, 0.25]
 *
 * a = [0.3, 0.5, 0.6], b = [0.1, 0, 0.6], c = [1.0, 1.0, 1.0], d = [0.8, 0.5, 0.25]
 *
 * https://observablehq.com/@makio135/give-me-colors
 * https://iquilezles.org/www/articles/palettes/palettes.htm
 */
export function parametricProceduralPalette(numberOfSwatches: number,
                                            a: number[], b: number[], c: number[], d: number[]): string[] {
  const func = proceduralScale(a, b, c, d);
  const swatches: string[] = [];
  const coef = 1 / (numberOfSwatches - 1);

  for (let i = 0; i < numberOfSwatches; ++i) {
    swatches.push(func(i * coef));
  }

  return swatches;
}

function proceduralScale(a: number[], b: number[], c: number[], d: number[]): any {
  function channel(i: number, t: number): number {
    return (a[i] + b[i] * Math.cos(Math.PI * 2 * (c[i] * t + d[i]))) * 255;
  }

  return (t: number): string => `rgb(${channel(0, t)}, ${channel(1, t)}, ${channel(2, t)})`;
}

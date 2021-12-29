import * as d3 from 'd3';

/**
 * Generates a palette as a linear interpolation between two colors.
 *
 * Example: _linearInterpolatedPalette('green', 'yellow', 5)_
 */
export function linearInterpolatedPalette(colorStart: string, colorEnd: string, numberOfSwatches: number): string[] {

  if (numberOfSwatches < 2) {
    numberOfSwatches = 2;
  }

  const interpolator = d3.interpolate(colorStart, colorEnd);
  const coef = 1 / (numberOfSwatches - 1);
  const swatches: string[] = [];

  for (let i = 0; i < numberOfSwatches; ++i) {
    swatches.push(interpolator(i * coef));
  }

  return swatches;
}

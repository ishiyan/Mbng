import * as d3 from 'd3';

/**
 * Generates a palette as a linear interpolation between three colors.
 *
 * Example: _linearInterpolatedPalette('green', 'red', 'blue', 7)_
 */
export const tripleInterpolatedPalette =
  (colorStart: string, colorMiddle: string, colorEnd: string, numberOfSwatches: number): string[] => {

  if (numberOfSwatches < 2) {
    return [colorStart];
  }

  if (numberOfSwatches === 2) {
    return [colorStart, colorEnd];
  }

  if (numberOfSwatches === 3) {
    return [colorStart, colorMiddle, colorEnd];
  }

  const interp1 = d3.interpolateLab(colorStart, colorMiddle);
  const interp2 = d3.interpolateLab(colorMiddle, colorEnd);

  const swatches: string[] = [colorStart];

  if (numberOfSwatches%2 > 0) { // Odd: 5, 7, 9 ...
    const z = (numberOfSwatches - 1) / 2;

    for (let i = 1; i < z; ++i) {
      swatches.push(interp1(i / z));
    }

    swatches.push(colorMiddle);

    for (let i = 1; i < z; ++i) {
      swatches.push(interp2(i / z));
    }
  } else { // Even: 4, 6, 8 ...
    const z = (numberOfSwatches - 2) / 2;
    const d1 = 2 / (numberOfSwatches - 1);

    for (let i = 1; i <= z; ++i) {
      swatches.push(interp1(i * d1));
    }

    for (let i = 1; i <= z; ++i) {
      swatches.push(interp2(i * d1));
    }
  }

  swatches.push(colorEnd);
  return swatches;
};

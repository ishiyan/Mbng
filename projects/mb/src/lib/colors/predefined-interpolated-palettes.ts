import {
  interpolateCividis, interpolateCool, interpolatePlasma, interpolateTurbo, interpolateViridis, interpolateWarm
} from 'd3';

/**
 * Generates a palette from a collection of predefined _d3_ interpolators.
 *
 * Example: _predefinedInterpolatedPalettes(5)_
 */
export const predefinedInterpolatedPalettes = (numberOfSwatches: number): string[][] => {

  if (numberOfSwatches < 2) {
    numberOfSwatches = 2;
  }

  const interpolators = [
    interpolateCool, interpolateWarm, interpolatePlasma, interpolateViridis, interpolateCividis, interpolateTurbo
  ];

  const coef = 1 / (numberOfSwatches - 1);
  const palettes: Array<string[]> = [];

  for (const interpolator of interpolators) {
    const swatches: string[] = [];

    for (let i = 0; i < numberOfSwatches; ++i) {
      swatches.push(interpolator(i * coef));
    }

    palettes.push(swatches);
  }

  return palettes;
};

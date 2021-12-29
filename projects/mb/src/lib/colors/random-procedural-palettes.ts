import * as d3 from 'd3';

/**
 * Generates a random procedural palette.
 *
 * https://medium.com/@shahriyarshahrabi/procedural-color-algorithm-a37739f6dc1
 * https://observablehq.com/@tarte0/color-palettes-generator
 */
export function randomPalette(numberOfSwatches: number): string[] {
  const startingColors = [
    generateColor(randomDate(Date.now())),
    generateColor(randomDate(Date.now())),
    generateColor(randomDate(Date.now()))
  ];

  const swatches = generateColors(numberOfSwatches, startingColors)
    .map(c => rgbToHex(Math.floor(c.r * 255), Math.floor(c.g * 255), Math.floor(c.b * 255)));

  return swatches;
}

function randomDate(now: number): any {
  return new Date(now * Math.random()).getTime();
}

function rgbString(color: any): string {
  return `rgb(${Math.floor(color.r * 255)}, ${Math.floor(color.g * 255)}, ${Math.floor(color.b * 255)})`;
}

function sampleFromColorScheme(r1: number, r2: number, [color1, color2, color3]: any[]): any {
  // return a sample from our generated colorScheme
  return {
    r: (1. - Math.sqrt(r1)) * color1.r + (Math.sqrt(r1) * (1. - r2)) * color2.r + (r2 * Math.sqrt(r1)) * color3.r,
    g: (1. - Math.sqrt(r1)) * color1.g + (Math.sqrt(r1) * (1. - r2)) * color2.g + (r2 * Math.sqrt(r1)) * color3.g,
    b: (1. - Math.sqrt(r1)) * color1.b + (Math.sqrt(r1) * (1. - r2)) * color2.b + (r2 * Math.sqrt(r1)) * color3.b,
  };
}

function generateColor(time: number): any {
  // return a random color based on the algorithm
  return {
    r: Math.abs(Math.sin(time + 12.) + Math.sin(time * 0.7 + 71.124) * 0.5),
    g: Math.abs(Math.sin(time)       + Math.sin(time * 0.8 + 41.)    * 0.5),
    b: Math.abs(Math.sin(time + 61.) + Math.sin(time * 0.8 + 831.32) * 0.5)
  };
}

function generateColors(n: number, [color1, color2, color3]: any[]){
  // generate n colors from the given scheme
  const colors: any[] = [];
  for (let i = 0; i < n; ++i) {
    colors.push(sampleFromColorScheme(i / n, i / n, [color1, color2, color3]));
  }

  // i like to sort them by luminance, feel free to sort them as you prefer
  const hslColors = colors.map(c => d3.hcl(rgbString(c)));
  colors.sort((a, b) => hslColors[colors.indexOf(a)].l - hslColors[colors.indexOf(b)].l);
  return colors;
}

function componentToHex(c: number): string {
  c = Math.min(Math.max(0, c), 255);
  const hex = c.toString(16);
  return hex.length === 1 ? '0' + hex : hex;
}

function rgbToHex(r: number, g: number, b: number): string {
  return '#' + componentToHex(r) + componentToHex(g) + componentToHex(b);
}

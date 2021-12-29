import { colorsCoAll5Palettes } from './colors-co-all-5-palettes';

/**
 * Selected all palletes from *colors.co*.
 *
 * The *sequence* parameter defines the number of colors and their order as a string with digits *5 4 3 2 1*.
 *
 * The number of digits determines the number of colors, their order determines the order of colors.
 */
export function colorsCoAll5PalettesSelection(sequence: string = '54321'): string[][] {
  const palettes: string[][] = [];

  if (sequence.length < 1) {
    return palettes;
  }

  const length = 132;
  for (let i = 0; i < length; ++i) {
    palettes.push([]);
  }

  const digitArray = Array.from(sequence);
  for (const digit of digitArray) {
    switch (digit) {
      case '5': {
        for (let i = 0; i < length; ++i) {
          palettes[i].push(colorsCoAll5Palettes[i][4]);
        }
        break;
      }
      case '4': {
        for (let i = 0; i < length; ++i) {
          palettes[i].push(colorsCoAll5Palettes[i][3]);
        }
        break;
      }
      case '3': {
        for (let i = 0; i < length; ++i) {
          palettes[i].push(colorsCoAll5Palettes[i][2]);
        }
        break;
      }
      case '2': {
        for (let i = 0; i < length; ++i) {
          palettes[i].push(colorsCoAll5Palettes[i][1]);
        }
        break;
      }
      case '1': {
        for (let i = 0; i < length; ++i) {
          palettes[i].push(colorsCoAll5Palettes[i][0]);
        }
        break;
      }
    }
  }

  return palettes;
}

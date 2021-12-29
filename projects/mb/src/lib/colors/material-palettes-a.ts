/**
 * Material Design sequential A700-A400-A200-A100 palettes.
 *
 * The *sequence* parameter defines the number of colors and their order as a string with digits *7 4 2 1*.
 *
 * The number of digits determines the number of colors, their order determines the order of colors.
 *
 * For instance, *'27'* defines A200-A700 palettes.
 */
export function materialPalettesA(sequence: string = '7241'): string[][] {
  const palettes: string[][] = [
    [], // red
    [], // pink
    [], // purple
    [], // deep purple
    [], // indigo
    [], // blue
    [], // light blue
    [], // cyan
    [], // teal
    [], // green
    [], // light green
    [], // lime
    [], // yellow
    [], // amber
    [], // orange
    []  // deep orange
  ];

  if (sequence.length < 1) {
    return palettes;
  }

  const digitArray = Array.from(sequence);
  for (const digit of digitArray) {
    switch (digit) {
      case '7': {
        palettes[ 0].push('#D50000'); // red
        palettes[ 1].push('#C51162'); // pink
        palettes[ 2].push('#AA00FF'); // purple
        palettes[ 3].push('#6200EA'); // deep purple
        palettes[ 4].push('#304FFE'); // indigo
        palettes[ 5].push('#2962FF'); // blue
        palettes[ 6].push('#0091EA'); // light blue
        palettes[ 7].push('#00B8D4'); // cyan
        palettes[ 8].push('#00BFA5'); // teal
        palettes[ 9].push('#00C853'); // green
        palettes[10].push('#64DD17'); // light green
        palettes[11].push('#AEEA00'); // lime
        palettes[12].push('#FFD600'); // yellow
        palettes[13].push('#FFAB00'); // amber
        palettes[14].push('#FF6D00'); // orange
        palettes[15].push('#DD2C00'); // deep orange
        break;
      }
      case '4': {
        palettes[ 0].push('#FF1744'); // red
        palettes[ 1].push('#F50057'); // pink
        palettes[ 2].push('#D500F9'); // purple
        palettes[ 3].push('#651FFF'); // deep purple
        palettes[ 4].push('#3D5AFE'); // indigo
        palettes[ 5].push('#2979FF'); // blue
        palettes[ 6].push('#00B0FF'); // light blue
        palettes[ 7].push('#00E5FF'); // cyan
        palettes[ 8].push('#1DE9B6'); // teal
        palettes[ 9].push('#00E676'); // green
        palettes[10].push('#76FF03'); // light green
        palettes[11].push('#C6FF00'); // lime
        palettes[12].push('#FFEA00'); // yellow
        palettes[13].push('#FFC400'); // amber
        palettes[14].push('#FF9100'); // orange
        palettes[15].push('#FF3D00'); // deep orange
        break;
      }
      case '2': {
        palettes[ 0].push('#FF5252'); // red
        palettes[ 1].push('#FF4081'); // pink
        palettes[ 2].push('#E040FB'); // purple
        palettes[ 3].push('#7C4DFF'); // deep purple
        palettes[ 4].push('#536DFE'); // indigo
        palettes[ 5].push('#448AFF'); // blue
        palettes[ 6].push('#40C4FF'); // light blue
        palettes[ 7].push('#18FFFF'); // cyan
        palettes[ 8].push('#64FFDA'); // teal
        palettes[ 9].push('#69F0AE'); // green
        palettes[10].push('#B2FF59'); // light green
        palettes[11].push('#EEFF41'); // lime
        palettes[12].push('#FFFF00'); // yellow
        palettes[13].push('#FFD740'); // amber
        palettes[14].push('#FFAB40'); // orange
        palettes[15].push('#FF6E40'); // deep orange
        break;
      }
      case '1': {
        palettes[ 0].push('#FF8A80'); // red
        palettes[ 1].push('#FF80AB'); // pink
        palettes[ 2].push('#EA80FC'); // purple
        palettes[ 3].push('#B388FF'); // deep purple
        palettes[ 4].push('#8C9EFF'); // indigo
        palettes[ 5].push('#82B1FF'); // blue
        palettes[ 6].push('#80D8FF'); // light blue
        palettes[ 7].push('#84FFFF'); // cyan
        palettes[ 8].push('#A7FFEB'); // teal
        palettes[ 9].push('#B9F6CA'); // green
        palettes[10].push('#CCFF90'); // light green
        palettes[11].push('#F4FF81'); // lime
        palettes[12].push('#FFFF8D'); // yellow
        palettes[13].push('#FFE57F'); // amber
        palettes[14].push('#FFD180'); // orange
        palettes[15].push('#FF9E80'); // deep orange
        break;
      }
    }
  }
  return palettes;
}

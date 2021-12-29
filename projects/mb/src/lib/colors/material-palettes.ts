/**
 * Material Design sequential 900-800-700-600-500-400-300-200-100-50 palettes.
 *
 * The *sequence* parameter defines the number of colors and their order as a string with digits *9 8 7 6 5 4 3 2 1 0*.
 *
 * The number of digits determines the number of colors, their order determines the order of colors.
 *
 * For instance, *'270'* defines 200-700-50 palettes.
 */
export function materialPalettes(sequence: string = '9785634120'): string[][] {
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
    [], // deep orange
    [], // brown
    [], // grey
    []  // blue grey
];

  if (sequence.length < 1) {
    return palettes;
  }

  const digitArray = Array.from(sequence);
  for (const digit of digitArray) {
    switch (digit) {
      case '9': {
        palettes[ 0].push('#B71C1C'); // red
        palettes[ 1].push('#880E4F'); // pink
        palettes[ 2].push('#4A148C'); // purple
        palettes[ 3].push('#311B92'); // deep purple
        palettes[ 4].push('#1A237E'); // indigo
        palettes[ 5].push('#0D47A1'); // blue
        palettes[ 6].push('#01579B'); // light blue
        palettes[ 7].push('#006064'); // cyan
        palettes[ 8].push('#004D40'); // teal
        palettes[ 9].push('#1B5E20'); // green
        palettes[10].push('#33691E'); // light green
        palettes[11].push('#827717'); // lime
        palettes[12].push('#F57F17'); // yellow
        palettes[13].push('#FF6F00'); // amber
        palettes[14].push('#E65100'); // orange
        palettes[15].push('#BF360C'); // deep orange
        palettes[16].push('#3E2723'); // brown
        palettes[17].push('#212121'); // grey
        palettes[18].push('#263238'); // blue grey
        break;
      }
      case '8': {
        palettes[ 0].push('#C62828'); // red
        palettes[ 1].push('#AD1457'); // pink
        palettes[ 2].push('#6A1B9A'); // purple
        palettes[ 3].push('#4527A0'); // deep purple
        palettes[ 4].push('#283593'); // indigo
        palettes[ 5].push('#1565C0'); // blue
        palettes[ 6].push('#0277BD'); // light blue
        palettes[ 7].push('#00838F'); // cyan
        palettes[ 8].push('#00695C'); // teal
        palettes[ 9].push('#2E7D32'); // green
        palettes[10].push('#558B2F'); // light green
        palettes[11].push('#9E9D24'); // lime
        palettes[12].push('#F9A825'); // yellow
        palettes[13].push('#FF8F00'); // amber
        palettes[14].push('#EF6C00'); // orange
        palettes[15].push('#D84315'); // deep orange
        palettes[16].push('#4E342E'); // brown
        palettes[17].push('#424242'); // grey
        palettes[18].push('#37474F'); // blue grey
        break;
      }
      case '7': {
        palettes[ 0].push('#D32F2F'); // red
        palettes[ 1].push('#C2185B'); // pink
        palettes[ 2].push('#7B1FA2'); // purple
        palettes[ 3].push('#512DA8'); // deep purple
        palettes[ 4].push('#303F9F'); // indigo
        palettes[ 5].push('#1976D2'); // blue
        palettes[ 6].push('#0288D1'); // light blue
        palettes[ 7].push('#0097A7'); // cyan
        palettes[ 8].push('#00796B'); // teal
        palettes[ 9].push('#388E3C'); // green
        palettes[10].push('#689F38'); // light green
        palettes[11].push('#AFB42B'); // lime
        palettes[12].push('#FBC02D'); // yellow
        palettes[13].push('#FFA000'); // amber
        palettes[14].push('#F57C00'); // orange
        palettes[15].push('#E64A19'); // deep orange
        palettes[16].push('#5D4037'); // brown
        palettes[17].push('#616161'); // grey
        palettes[18].push('#455A64'); // blue grey
        break;
      }
      case '6': {
        palettes[ 0].push('#E53935'); // red
        palettes[ 1].push('#D81B60'); // pink
        palettes[ 2].push('#8E24AA'); // purple
        palettes[ 3].push('#5E35B1'); // deep purple
        palettes[ 4].push('#3949AB'); // indigo
        palettes[ 5].push('#1E88E5'); // blue
        palettes[ 6].push('#039BE5'); // light blue
        palettes[ 7].push('#00ACC1'); // cyan
        palettes[ 8].push('#00897B'); // teal
        palettes[ 9].push('#43A047'); // green
        palettes[10].push('#7CB342'); // light green
        palettes[11].push('#C0CA33'); // lime
        palettes[12].push('#FDD835'); // yellow
        palettes[13].push('#FFB300'); // amber
        palettes[14].push('#FB8C00'); // orange
        palettes[15].push('#F4511E'); // deep orange
        palettes[16].push('#6D4C41'); // brown
        palettes[17].push('#757575'); // grey
        palettes[18].push('#546E7A'); // blue grey
        break;
      }
      case '5': {
        palettes[ 0].push('#F44336'); // red
        palettes[ 1].push('#E91E63'); // pink
        palettes[ 2].push('#9C27B0'); // purple
        palettes[ 3].push('#673AB7'); // deep purple
        palettes[ 4].push('#3F51B5'); // indigo
        palettes[ 5].push('#2196F3'); // blue
        palettes[ 6].push('#03A9F4'); // light blue
        palettes[ 7].push('#00BCD4'); // cyan
        palettes[ 8].push('#009688'); // teal
        palettes[ 9].push('#4CAF50'); // green
        palettes[10].push('#8BC34A'); // light green
        palettes[11].push('#CDDC39'); // lime
        palettes[12].push('#FFEB3B'); // yellow
        palettes[13].push('#FFC107'); // amber
        palettes[14].push('#FF9800'); // orange
        palettes[15].push('#FF5722'); // deep orange
        palettes[16].push('#795548'); // brown
        palettes[17].push('#9E9E9E'); // grey
        palettes[18].push('#607D8B'); // blue grey
        break;
      }
      case '4': {
        palettes[ 0].push('#EF5350'); // red
        palettes[ 1].push('#EC407A'); // pink
        palettes[ 2].push('#AB47BC'); // purple
        palettes[ 3].push('#7E57C2'); // deep purple
        palettes[ 4].push('#5C6BC0'); // indigo
        palettes[ 5].push('#42A5F5'); // blue
        palettes[ 6].push('#29B6F6'); // light blue
        palettes[ 7].push('#26C6DA'); // cyan
        palettes[ 8].push('#26A69A'); // teal
        palettes[ 9].push('#66BB6A'); // green
        palettes[10].push('#9CCC65'); // light green
        palettes[11].push('#D4E157'); // lime
        palettes[12].push('#FFEE58'); // yellow
        palettes[13].push('#FFCA28'); // amber
        palettes[14].push('#FFA726'); // orange
        palettes[15].push('#FF7043'); // deep orange
        palettes[16].push('#8D6E63'); // brown
        palettes[17].push('#BDBDBD'); // grey
        palettes[18].push('#78909C'); // blue grey
        break;
      }
      case '3': {
        palettes[ 0].push('#E57373'); // red
        palettes[ 1].push('#F06292'); // pink
        palettes[ 2].push('#BA68C8'); // purple
        palettes[ 3].push('#9575CD'); // deep purple
        palettes[ 4].push('#7986CB'); // indigo
        palettes[ 5].push('#64B5F6'); // blue
        palettes[ 6].push('#4FC3F7'); // light blue
        palettes[ 7].push('#4DD0E1'); // cyan
        palettes[ 8].push('#4DB6AC'); // teal
        palettes[ 9].push('#81C784'); // green
        palettes[10].push('#AED581'); // light green
        palettes[11].push('#DCE775'); // lime
        palettes[12].push('#FFF176'); // yellow
        palettes[13].push('#FFD54F'); // amber
        palettes[14].push('#FFB74D'); // orange
        palettes[15].push('#FF8A65'); // deep orange
        palettes[16].push('#A1887F'); // brown
        palettes[17].push('#E0E0E0'); // grey
        palettes[18].push('#90A4AE'); // blue grey
        break;
      }
      case '2': {
        palettes[ 0].push('#EF9A9A'); // red
        palettes[ 1].push('#F48FB1'); // pink
        palettes[ 2].push('#CE93D8'); // purple
        palettes[ 3].push('#B39DDB'); // deep purple
        palettes[ 4].push('#9FA8DA'); // indigo
        palettes[ 5].push('#90CAF9'); // blue
        palettes[ 6].push('#81D4FA'); // light blue
        palettes[ 7].push('#80DEEA'); // cyan
        palettes[ 8].push('#80CBC4'); // teal
        palettes[ 9].push('#A5D6A7'); // green
        palettes[10].push('#C5E1A5'); // light green
        palettes[11].push('#E6EE9C'); // lime
        palettes[12].push('#FFF59D'); // yellow
        palettes[13].push('#FFE082'); // amber
        palettes[14].push('#FFCC80'); // orange
        palettes[15].push('#FFAB91'); // deep orange
        palettes[16].push('#BCAAA4'); // brown
        palettes[17].push('#EEEEEE'); // grey
        palettes[18].push('#B0BEC5'); // blue grey
        break;
      }
      case '1': {
        palettes[ 0].push('#FFCDD2'); // red
        palettes[ 1].push('#F8BBD0'); // pink
        palettes[ 2].push('#E1BEE7'); // purple
        palettes[ 3].push('#D1C4E9'); // deep purple
        palettes[ 4].push('#C5CAE9'); // indigo
        palettes[ 5].push('#BBDEFB'); // blue
        palettes[ 6].push('#B3E5FC'); // light blue
        palettes[ 7].push('#B2EBF2'); // cyan
        palettes[ 8].push('#B2DFDB'); // teal
        palettes[ 9].push('#C8E6C9'); // green
        palettes[10].push('#DCEDC8'); // light green
        palettes[11].push('#F0F4C3'); // lime
        palettes[12].push('#FFF9C4'); // yellow
        palettes[13].push('#FFECB3'); // amber
        palettes[14].push('#FFE0B2'); // orange
        palettes[15].push('#FFCCBC'); // deep orange
        palettes[16].push('#D7CCC8'); // brown
        palettes[17].push('#F5F5F5'); // grey
        palettes[18].push('#CFD8DC'); // blue grey
        break;
      }
      case '0': {
        palettes[ 0].push('#FFEBEE'); // red
        palettes[ 1].push('#FCE4EC'); // pink
        palettes[ 2].push('#F3E5F5'); // purple
        palettes[ 3].push('#EDE7F6'); // deep purple
        palettes[ 4].push('#E8EAF6'); // indigo
        palettes[ 5].push('#E3F2FD'); // blue
        palettes[ 6].push('#E1F5FE'); // light blue
        palettes[ 7].push('#E0F7FA'); // cyan
        palettes[ 8].push('#E0F2F1'); // teal
        palettes[ 9].push('#E8F5E9'); // green
        palettes[10].push('#F1F8E9'); // light green
        palettes[11].push('#F9FBE7'); // lime
        palettes[12].push('#FFFDE7'); // yellow
        palettes[13].push('#FFF8E1'); // amber
        palettes[14].push('#FFF3E0'); // orange
        palettes[15].push('#FBE9E7'); // deep orange
        palettes[16].push('#EFEBE9'); // brown
        palettes[17].push('#FAFAFA'); // grey
        palettes[18].push('#ECEFF1'); // blue grey
        break;
      }
    }
  }
  return palettes;
}

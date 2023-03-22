import { tripleInterpolatedPalette } from './triple-interpolated-palette';

// https://leonardocolor.io/scales.html#
// https://medialab.github.io/iwanthue/
const triplets: string[][] = [
  ['#8c00ff', '#009dfd', '#81d600'],
  ['#8c00ff', '#0099f0', '#a2c200'],
  ['#006fe6', '#00a9cd', '#81d600'],
  ['#006fe6', '#00b8ba', '#d6d600'],
  ['#73e6bb', '#99e95a', '#e1d468'], // Fluo.
  ['#87e85b', '#7de5b8', '#dfd862'], // Fluo.
  ['#4dd16e', '#a2db00', '#ffef5b'], // Fluo.
  ['#68cf59', '#ffba25', '#c4fc00'], // Fluo.
  ['#74cd6e', '#c6be00', '#9cfc28'], // Fluo.
  ['#00b395', '#3bd872', '#b8eb00'],
  ['#00b395', '#6fc45c', '#dbbe00'],
  ['#00b395', '#8db639', '#ff9500'],
  ['#92a500', '#bcbaa7', '#36ff74'], // Green mint.
  ['#528c62', '#b9990b', '#63ff8d'], // Green mint.
  ['#a18c52', '#68bf00', '#00df68'], // Green mint.
  ['#cdaf51', '#97e3aa', '#d7ff7f'], // Green mint.
  ['#949280', '#41e532', '#f2d170'], // Green mint.
  ['#847b64', '#6bc686', '#c2be00'], // Green mint.
  ['#3b9a9c', '#4bc2c5', '#78fee0'],
  ['#55968f', '#8acbbb', '#c9f658'],
  ['#00bb46', '#6ecc78', '#b9ddb7'],
  ['#008c5c', '#33b983', '#9b54f3'],
  ['#397273', '#00b183', '#64d2d4'], // Ice cube.
  ['#6a7777', '#61a775', '#01c587'], // Ice cube.
  ['#558384', '#74c18a', '#6fd7d9'], // Ice cube.
  ['#7874f2', '#8e98f5', '#b1cbfa'],
  ['#64638f', '#9795cf', '#cbc9ff'],
  ['#4e709d', '#89a4c7', '#cdd5e0'],
  ['#957dad', '#d291bc', '#fec8d8'],
  ['#9182c4', '#d8aed3', '#ebd9dd'],
  ['#7480ff', '#7abdff', '#7cfcf9'],
  ['#3765ae', '#3c7ae7', '#5f94e1'], // Indigo night.
  ['#004eb0', '#5467b6', '#0091fe'], // Indigo night.
  ['#3d6daf', '#6276cb', '#719fff'], // Indigo night.
  ['#8c00ff', '#ff6944', '#cce000'],
  ['#8c00ff', '#df3e7b', '#e08e00'],
  ['#5900ff', '#b500ff', '#fb00ff'],
  ['#5900ff', '#9800f9', '#ce00d1'],
  ['#1077f3', '#4f890e', '#997600'],
  ['#1077f3', '#4f890e', '#9b54f3'],
  ['#1077f3', '#9b54f3', '#e83326'],
  ['#33b983', '#9b54f3', '#c85b00'],
  ['#648000', '#ba6c00', '#ff3300'],
  ['#7562bc', '#cc549c', '#764a4c'],
  ['#7562bc', '#854e7f', '#764a4c'],
  ['#729b57', '#8e5db0', '#bb5f4c'],
  ['#a15c4e', '#8b5cab', '#91b972'], // All.
  ['#8b5cab', '#a15c4e', '#91b972'], // All.
  ['#8e5db0', '#bb5f4c', '#729b57'], // Intense.
  ['#ba4a8a', '#ff5d6c', '#ffb23d'],
  ['#1d97c1', '#53c7f0', '#87e0ff'],
  ['#493acc', '#7e50bb', '#677bdd'],
  ['#9e6ebd', '#cb6751', '#7aa457'], // Default preset.
  ['#936e3c', '#d89b33', '#deb682'], // Yellow lime.
  ['#a0873b', '#c0a034', '#ffa630'], // Yellow lime.
  ['#917818', '#aca087', '#ffa339'], // Yellow lime.
  ['#8e7665', '#d5a600', '#edd6a0'], // Yellow lime.
  ['#a55b00', '#a29083', '#ffd32e'], // Yellow lime.
  ['#a38938', '#ffa115', '#ffdaba'], // Yellow lime.
  ['#bc6721', '#928877', '#ffbd65'], // Yellow lime.
  ['#914e3a', '#b97160', '#e99c85'], // Orchie sand.
  ['#923b1e', '#b2555c', '#ff968c'], // Orchie sand.
  ['#833f25', '#a67b6e', '#ed8468'], // Orchie sand.
  ['#82402b', '#c35651', '#ab7e74'], // Orchie sand.
  ['#7e4a4d', '#a2359a', '#ff6cc1'], // Red rose.
  ['#912474', '#c20070', '#d059c6'], // Red rose.
  ['#8c3542', '#c90076', '#ff4dda'], // Red rose.
  ['#c50054', '#b535ac', '#d1626b'], // Red rose.
  ['#ca426f', '#d747ae', '#c37f9b'], // Red rose.
  ['#c24770', '#d846ad', '#c989a5'], // Red rose.
  ['#db0065', '#ff57ac', '#e9a0df'], // Red rose.
  ['#ff1744', '#ff6D00', '#ffd600'],
  ['#ec00f0', '#ff7a18', '#d1c000'],
  ['#cc0000', '#e4006d', '#e900fa'],
  ['#c6a000', '#4f890e', '#9b54f3'],
  ['#c6a000', '#33b983', '#bf8cfc'],
  ['#f98517', '#33b983', '#bf8cfc'],
  ['#ec00f0', '#f77100', '#00d150'],
  ['#e83326', '#1077f3', '#4f890e'],
  ['#68823f', '#97d54c', '#c2ce88'], // Green mint.
  ['#465918', '#627f68', '#4ea300'], // Green mint.
  ['#684e2f', '#c38c00', '#ffd28b'], // Yellow lime.
  ['#764809', '#a39586', '#ffd168'], // Yellow lime.
  ['#704c03', '#e78c00', '#ffbd75'], // Yellow lime.
  ['#0a4650', '#2c9e4b', '#9ed763'],
  ['#256700', '#01fb77', '#fff457'], // Green mint.
  ['#595431', '#7fd300', '#ffee9b'], // Green mint.
  ['#415e00', '#01ca2b', '#f0cc59'], // Green mint.
  ['#42505a', '#00658f', '#4a6883'], // Blue ocean.
  ['#35546d', '#007998', '#557d89'] // Blue ocean.
  ];

  const tripletsCount = triplets.length;

/**
 * Generates a palette from a collection of predefined palettes for drawing a set of lines.
 *
 * Example: _predefinedLinePalettes(5)_
 */
export const predefinedLinePalettes = (numberOfSwatches: number): string[][] => {

  if (numberOfSwatches < 2) {
    numberOfSwatches = 2;
  }

  const palettes: string[][] = [];

  for (let i = 0; i < tripletsCount; ++i){
    const tr = triplets[i];
    palettes.push(tripleInterpolatedPalette(tr[0], tr[1], tr[2], numberOfSwatches));
  }

  return palettes;
};

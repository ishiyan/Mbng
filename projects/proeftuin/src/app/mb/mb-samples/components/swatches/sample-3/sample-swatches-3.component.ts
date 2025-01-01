import { Component } from '@angular/core';

import { linearInterpolatedPalette } from 'projects/mb/src/lib/colors/linear-interpolated-palette';

@Component({
    selector: 'app-sample-swatches-3',
    templateUrl: './sample-swatches-3.component.html',
    styleUrls: ['./sample-swatches-3.component.scss'],
    standalone: false
})
export class SampleSwatches3Component {

  private readonly colorsStart: string[] = [
    '#114b5f',
    '#05668d',
    '#464e47',
    '#4b7f52',
    '#7a918d',
    '#77bfa3',
    '#7a9cc6',
    '#717c89',
    '#4a7c59',
    '#50808e',
    '#2f3e46',
    '#5f7470',
    '#696d7d',
    '#586994',
    '#395e66',
    '#07beb8',
    '#85c7de',
    '#4d7298',
    '#949ba0',
    '#46b1c9',
    '#5c6f68',
    '#587291',
    '#3b28cc',
    '#7161ef',
    '#7371fc',
    '#7a6174',
    '#64403e',
    '#696d7d',
    '#81667a',
    '#8895b3',
    '#3b3b58',
    '#5d4e60',
    '#565264',
    '#8d6b94',
    '#846b8a',
    '#56494c',
    '#735d78',
    '#231942',
    '#4f000b',
    '#5c374c',
    '#f55536',
    '#cc5803',
    '#cc444b',
    '#c42348',
    '#3d315b',
    '#545775',
    '#033f63',
    '#407076',
    '#586f6b',
    '#847577',
    '#595959',
    '#aaaaaa',
    '#555b6e',
    '#64a6bd',
    '#484a47',
    '#72ddf7',
    '#c59fc9',
    '#694f5d',
    '#736f72',
    '#75c9c8',
    '#796465',
    '#dba159',
    '#7e1f86',
    '#725752',
    '#8e9aaf',
    '#a7bed3',
    '#533747',
    '#4f3130',
    '#9f9aa4',
    '#2c3d55',
    '#87677b',
    '#738290',
    '#baa7b0',
    '#b0a1ba',
    '#71697a',
    '#7b435b',
    '#615055',
    '#655560',
    '#824670',
    '#546a76',
    '#a09abc',
    '#67597a',
    '#644536',
    '#5f5449',
    '#8f9491',
    '#673c4f',
    '#818479',
    '#e0b0d5',
    '#188fa7',
    '#7c616c',
    '#938ba1',
    '#8d89a6',
    '#898980',
    '#513b56',
    '#13293d',
    '#253237',
    '#320a28',
    '#38302e',
    '#0e103d',
    '#192a51',
    '#424b54',
    '#0d0630',
    '#1f2421',
    '#011936',
    '#000000',
    '#1e3231',
    '#1f2232',
    '#2c1a1d',
    '#2e2c2f',
    '#201e50',
    '#28112b',
    '#2c0735',
    '#262322',
    '#001a23',
    '#3f4739',
    '#3a3238',
    '#0b3948',
    '#231c07',
    '#32213a',
    '#242331',
    '#1b1b3a',
    '#000000',
    '#2e1f27',
    '#594157',
    '#493548',
    '#344e41',
    '#1e2f23',
    '#18020c',
    '#181d27',
    '#2f0147',
    '#666a86',
    '#1e352f'
  ];

  private readonly colorsEnd: string[] = [
    '#f3e9d2',
    '#f0f3bd',
    '#f1fffa',
    '#c9ffe2',
    '#dbfeb8',
    '#edeec9',
    '#fffd98',
    '#adf6b1',
    '#faf3dd',
    '#ddd8c4',
    '#cad2c5',
    '#e0e2db',
    '#faf3dd',
    '#e5e8b6',
    '#2bc016',
    '#c4fff9',
    '#cfe8ef',
    '#d0efb1',
    '#bcd4de',
    '#f2e2d2',
    '#a7fff6',
    '#0cf574',
    '#add7f6',
    '#efd9ce',
    '#f5efff',
    '#d1b1c8',
    '#c9cebd',
    '#f0dcca',
    '#d1f0b1',
    '#dab6fc',
    '#cf9893',
    '#efcefa',
    '#d6cfcb',
    '#fff4e9',
    '#fae3e3',
    '#c2d3cd',
    '#f7d1cd',
    '#e0b1cb',
    '#ff9b54',
    '#faa275',
    '#fabc3c',
    '#ffc971',
    '#e4b1ab',
    '#ef7674',
    '#f8f991',
    '#dbcfb0',
    '#fedc97',
    '#ebbab9',
    '#ddd5d0',
    '#fbfbf2',
    '#f2f2f2',
    '#eeeeee',
    '#ffd6ba',
    '#f4cae0',
    '#e0ac9d',
    '#fdc5f5',
    '#97f9f9',
    '#efc7c2',
    '#9a8f97',
    '#f7f4ea',
    '#dde8b9',
    '#d0e3cc',
    '#91c4f2',
    '#fef6c9',
    '#dee2ff',
    '#dab894',
    '#86bbbd',
    '#d8d78f',
    '#cab1bd',
    '#84828f',
    '#b4edd2',
    '#c2d8b9',
    '#c7ebf0',
    '#bff0d4',
    '#f2f6d0',
    '#bcf8ec',
    '#ddf8e8',
    '#fcf7ff',
    '#c1f7dc',
    '#fad4d8',
    '#d4bebe',
    '#ceeddb',
    '#eef1bd',
    '#ebfcfb',
    '#eadde1',
    '#83b5d1',
    '#e7e08b',
    '#7be0ad',
    '#e2dbbe',
    '#eafdf8',
    '#d7fdec',
    '#eac8ca',
    '#def2c8',
    '#bce784',
    '#e8f1f2',
    '#e0fbfc',
    '#e0d68a',
    '#ccdad1',
    '#f2d7ee',
    '#f5e6e8',
    '#c5baaf',
    '#e6f9af',
    '#dce1de',
    '#c0dfa1',
    '#f9f4f5',
    '#f6c0d0',
    '#fde8e9',
    '#dbb3b1',
    '#f3e8ee',
    '#c4f1be',
    '#8daa91',
    '#97dffc',
    '#f2e5d7',
    '#e8f1f2',
    '#f1bf98',
    '#f5e3e0',
    '#d9dbf1',
    '#f78764',
    '#d1caa1',
    '#ddca7d',
    '#ff3562',
    '#b1b6a6',
    '#e7e393',
    '#bee7e8',
    '#a1e887',
    '#dad7cd',
    '#b39c4d',
    '#e5ffde',
    '#d0db97',
    '#e2c2c6',
    '#e8ddb5',
    '#beef9e',
  ];

  private readonly colorsMaterialStart: string[] = [
    '#B71C1C',
    '#880E4F',
    '#4A148C',
    '#311B92',
    '#1A237E',
    '#0D47A1',
    '#01579B',
    '#006064',
    '#004D40',
    '#1B5E20',
    '#33691E',
    '#827717',
    '#F57F17',
    '#FF6F00',
    '#E65100',
    '#BF360C',
    '#3E2723',
    '#212121',
    '#263238'
  ];

  private readonly colorsMaterialEnd: string[] = [
    '#EF9A9A',
    '#F48FB1',
    '#CE93D8',
    '#B39DDB',
    '#9FA8DA',
    '#90CAF9',
    '#81D4FA',
    '#80DEEA',
    '#80CBC4',
    '#A5D6A7',
    '#C5E1A5',
    '#E6EE9C',
    '#FFF59D',
    '#FFE082',
    '#FFCC80',
    '#FFAB91',
    '#BCAAA4',
    '#EEEEEE',
    '#B0BEC5'
  ];

  private numberOfSwatches = 5;
  private selectedIndex = 0;

  private numberOfSwatchesMaterial = 5;
  private selectedIndexMaterial = 0;

  palettes: string[][] = this.linearInterpolatedPalettes(this.numberOfSwatches);
  selectedPalette: string[] = this.palettes[this.selectedIndex];

  palettesMaterial: string[][] = this.linearInterpolatedPalettesMaterial(this.numberOfSwatchesMaterial);
  selectedPaletteMaterial: string[] = this.palettesMaterial[this.selectedIndexMaterial];

  readonly linearPalettes: string[][] = this.linearSwatches();

  get paletteLength(): number {
    return this.numberOfSwatches;
  }
  set paletteLength(value: number) {
    this.numberOfSwatches = value;
    this.selectedIndex = 0;
    this.palettes = this.linearInterpolatedPalettes(this.numberOfSwatches);
    this.selectedPalette = this.palettes[this.selectedIndex];
  }

  get paletteLengthMaterial(): number {
    return this.numberOfSwatchesMaterial;
  }
  set paletteLengthMaterial(value: number) {
    this.numberOfSwatchesMaterial = value;
    this.selectedIndexMaterial = 0;
    this.palettesMaterial = this.linearInterpolatedPalettesMaterial(this.numberOfSwatchesMaterial);
    this.selectedPaletteMaterial = this.palettesMaterial[this.selectedIndexMaterial];
  }

  linearInterpolatedPalettes(numberOfSwatches: number): string[][]{
    const numberOfPairs = this.colorsStart.length;
    const palettes: string[][] = [];

    for (let i = 0; i < numberOfPairs; ++i){
      const palette = linearInterpolatedPalette(this.colorsStart[i], this.colorsEnd[i], numberOfSwatches);
      palettes.push(palette);
    }

    return palettes;
  }

  linearInterpolatedPalettesMaterial(numberOfSwatches: number): string[][]{
    const numberOfPairs = this.colorsMaterialStart.length;
    const palettes: string[][] = [];

    for (let i = 0; i < numberOfPairs; ++i){
      const palette = linearInterpolatedPalette(this.colorsMaterialStart[i], this.colorsMaterialEnd[i], numberOfSwatches);
      palettes.push(palette);
    }

    return palettes;
  }

  selectionChanged(selection: string[]) {
    this.selectedIndex = this.palettes.indexOf(selection);
    this.selectedPalette = selection;
  }

  selectionChangedMaterial(selection: string[]) {
    this.selectedIndexMaterial = this.palettesMaterial.indexOf(selection);
    this.selectedPaletteMaterial = selection;
  }

  private linearSwatches(): string[][] {
    const linearPalette: string[][] = [];

    for (let i = 2; i < 20; ++i) {
      linearPalette.push(linearInterpolatedPalette('green', 'yellow', i));
    }

    return linearPalette;
  }
}

import { Component } from '@angular/core';

import { randomPalette } from 'projects/mb/src/lib/colors/random-procedural-palettes';

@Component({
  selector: 'app-sample-swatches-4',
  templateUrl: './sample-swatches-4.component.html',
  styleUrls: ['./sample-swatches-4.component.scss']
})
export class SampleSwatches4Component {

  private randomPaletteSwatches = 8;
  randomPalettes: string[][] = this.generateRandomPalettes();
  selectedRandomPaletteIndex = 0;
  selectedRandomPalette: string[] = this.randomPalettes[this.selectedRandomPaletteIndex];

  get randomPaletteLength(): number {
    return this.randomPaletteSwatches;
  }
  set randomPaletteLength(value: number) {
    this.randomPaletteSwatches = value;
    this.refresh();
  }

  private generateRandomPalettes(): string[][] {
    return [
      randomPalette(this.randomPaletteSwatches),
      randomPalette(this.randomPaletteSwatches),
      randomPalette(this.randomPaletteSwatches),
      randomPalette(this.randomPaletteSwatches),
      randomPalette(this.randomPaletteSwatches),
      randomPalette(this.randomPaletteSwatches),
      randomPalette(this.randomPaletteSwatches),
      randomPalette(this.randomPaletteSwatches),
      randomPalette(this.randomPaletteSwatches),
      randomPalette(this.randomPaletteSwatches),
      randomPalette(this.randomPaletteSwatches),
      randomPalette(this.randomPaletteSwatches),
      randomPalette(this.randomPaletteSwatches),
      randomPalette(this.randomPaletteSwatches),
      randomPalette(this.randomPaletteSwatches),
      randomPalette(this.randomPaletteSwatches)
    ];
  }

  selectionChanged(selection: string[]) {
    this.selectedRandomPaletteIndex = this.randomPalettes.indexOf(selection);
    this.selectedRandomPalette = selection;
  }

  refresh() {
    this.randomPalettes = this.generateRandomPalettes();
    this.selectedRandomPalette = this.randomPalettes[this.selectedRandomPaletteIndex];
  }
}

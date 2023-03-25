import { Component } from '@angular/core';

import { predefinedLinePalettes } from 'projects/mb/src/lib/colors/predefined-line-palettes';

@Component({
  selector: 'app-sample-swatches-11',
  templateUrl: './sample-swatches-11.component.html',
  styleUrls: ['./sample-swatches-11.component.scss']
})
export class SampleSwatches11Component {

  private numberOfSwatches = 5;
  private selectedIndex = 0;

  palettes: string[][] = predefinedLinePalettes(this.numberOfSwatches);
  selectedPalette: string[] = this.palettes[this.selectedIndex];

  get paletteLength(): number {
    return this.numberOfSwatches;
  }
  set paletteLength(value: number) {
    this.numberOfSwatches = value;
    this.selectedIndex = 0;
    this.palettes = predefinedLinePalettes(this.numberOfSwatches);
    this.selectedPalette = this.palettes[this.selectedIndex];
  }

  selectionChanged(selection: string[]) {
    this.selectedIndex = this.palettes.indexOf(selection);
    this.selectedPalette = selection;
  }
}

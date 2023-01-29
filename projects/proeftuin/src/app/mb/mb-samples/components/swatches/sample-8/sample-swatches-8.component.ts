import { Component } from '@angular/core';

import { predefinedInterpolatedPalettes } from 'projects/mb/src/lib/colors/predefined-interpolated-palettes';

@Component({
  selector: 'app-sample-swatches-8',
  templateUrl: './sample-swatches-8.component.html',
  styleUrls: ['./sample-swatches-8.component.scss']
})
export class SampleSwatches8Component {

  private numberOfSwatches = 5;
  private selectedIndex = 0;

  palettes: string[][] = predefinedInterpolatedPalettes(this.numberOfSwatches);
  selectedPalette: string[] = this.palettes[this.selectedIndex];

  get paletteLength(): number {
    return this.numberOfSwatches;
  }
  set paletteLength(value: number) {
    this.numberOfSwatches = value;
    this.selectedIndex = 0;
    this.palettes = predefinedInterpolatedPalettes(this.numberOfSwatches);
    this.selectedPalette = this.palettes[this.selectedIndex];
  }

  selectionChanged(selection: string[]) {
    this.selectedIndex = this.palettes.indexOf(selection);
    this.selectedPalette = selection;
  }
}

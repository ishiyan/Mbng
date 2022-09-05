import { Component, ViewContainerRef } from '@angular/core';
//import { ColorPickerService } from 'dist/mb/lib/colors/picker/color-picker.service';

import { predefinedInterpolatedPalettes } from 'projects/mb/src/lib/colors/predefined-interpolated-palettes';

@Component({
  selector: 'mb-sample-swatches-9',
  templateUrl: './sample-swatches-9.component.html',
  styleUrls: ['./sample-swatches-9.component.scss']
})
export class SampleSwatches9Component {

  private numberOfSwatches = 5;
  private selectedIndex = 0;

  protected  color = '#00ff00';

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

  //constructor(public vcRef: ViewContainerRef, private cpService: ColorPickerService) {}
}

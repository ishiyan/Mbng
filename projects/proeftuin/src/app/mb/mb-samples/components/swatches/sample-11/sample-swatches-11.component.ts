import { Component } from '@angular/core';

import { predefinedLinePalettes } from 'projects/mb/src/lib/colors/predefined-line-palettes';
import { MatCard, MatCardHeader, MatCardTitle, MatCardContent } from '@angular/material/card';
import { MatFormField, MatLabel } from '@angular/material/form-field';
import { MatInput } from '@angular/material/input';
import { FormsModule } from '@angular/forms';

import { MatExpansionPanel, MatExpansionPanelHeader, MatExpansionPanelTitle } from '@angular/material/expansion';
import { NgFor } from '@angular/common';
import { SwatchesComponent } from '../../../../../../../../mb/src/lib/colors/swatches/swatches.component';
import { SwatchesSelectComponent } from '../../../../../../../../mb/src/lib/colors/swatches/swatches-select.component';

@Component({
    selector: 'app-sample-swatches-11',
    templateUrl: './sample-swatches-11.component.html',
    styleUrls: ['./sample-swatches-11.component.scss'],
    imports: [MatCard, MatCardHeader, MatCardTitle, MatCardContent, MatFormField, MatLabel, MatInput, FormsModule, SwatchesComponent, SwatchesSelectComponent, MatExpansionPanel, MatExpansionPanelHeader, MatExpansionPanelTitle, NgFor]
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

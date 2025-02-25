import { Component } from '@angular/core';

import { materialPalettesA } from 'projects/mb/src/lib/colors/material-palettes-a';
import { materialPalettes } from 'projects/mb/src/lib/colors/material-palettes';
import { MatCard, MatCardHeader, MatCardTitle, MatCardSubtitle, MatCardContent } from '@angular/material/card';
import { MatFormField, MatLabel } from '@angular/material/form-field';
import { MatInput } from '@angular/material/input';
import { FormsModule } from '@angular/forms';

import { MatExpansionPanel, MatExpansionPanelHeader, MatExpansionPanelTitle } from '@angular/material/expansion';

import { SwatchesComponent } from '../../../../../../../../mb/src/lib/colors/swatches/swatches.component';
import { SwatchesSelectComponent } from '../../../../../../../../mb/src/lib/colors/swatches/swatches-select.component';

@Component({
    selector: 'app-sample-swatches-2',
    templateUrl: './sample-swatches-2.component.html',
    styleUrls: ['./sample-swatches-2.component.scss'],
    imports: [MatCard, MatCardHeader, MatCardTitle, MatCardSubtitle, MatFormField, MatLabel, MatInput, FormsModule, MatCardContent, SwatchesComponent, SwatchesSelectComponent, MatExpansionPanel, MatExpansionPanelHeader, MatExpansionPanelTitle]
})
export class SampleSwatches2Component {

  private sequenceA = 7241;
  get paletteSequenceA(): number {
    return this.sequenceA;
  }
  set paletteSequenceA(value: number) {
    this.sequenceA = value;
    this.palettesA = materialPalettesA(this.sequenceAToString());
    this.selectedPaletteAIndex = 0;
    this.selectedPaletteA = this.palettesA[this.selectedPaletteAIndex];
  }

  private sequence = 9785634120;
  get paletteSequence(): number {
    return this.sequence;
  }
  set paletteSequence(value: number) {
    this.sequence = value;
    this.palettes = materialPalettes(this.sequenceToString());
    this.selectedPaletteIndex = 0;
    this.selectedPalette = this.palettes[this.selectedPaletteIndex];
  }

  palettesAOrdered: string[][] = materialPalettesA('7421');
  palettesA: string[][] = materialPalettesA(this.sequenceAToString());
  private selectedPaletteAIndex = 0;
  selectedPaletteA: string[] = this.palettesA[this.selectedPaletteAIndex];

  palettesOrdered: string[][] = materialPalettes('9876543210');
  palettes: string[][] = materialPalettes(this.sequenceToString());
  private selectedPaletteIndex = 0;
  selectedPalette: string[] = this.palettes[this.selectedPaletteIndex];

  selectionChangedA(selection: string[]) {
    this.selectedPaletteAIndex = this.palettesA.indexOf(selection);
    this.selectedPaletteA = selection;
  }

  selectionChanged(selection: string[]) {
    this.selectedPaletteIndex = this.palettes.indexOf(selection);
    this.selectedPalette = selection;
  }

  private sequenceAToString(): string | undefined {
    return this.sequenceA === null ? undefined : this.sequenceA.toString();
  }

  private sequenceToString(): string | undefined {
    return this.sequence === null ? undefined : this.sequence.toString();
  }
}

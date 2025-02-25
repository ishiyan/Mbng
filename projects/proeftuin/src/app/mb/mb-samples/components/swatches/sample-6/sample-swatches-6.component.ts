import { Component } from '@angular/core';

import { colorsCoSequential5Palettes } from 'projects/mb/src/lib/colors/colors-co-sequential-5-palettes';
import { colorsCoSequential5PalettesSelection } from 'projects/mb/src/lib/colors/colors-co-sequential-5-palettes-selection';
import { MatCard, MatCardHeader, MatCardTitle, MatCardSubtitle, MatCardContent, MatCardActions } from '@angular/material/card';
import { MatFormField, MatLabel } from '@angular/material/form-field';
import { MatInput } from '@angular/material/input';
import { FormsModule } from '@angular/forms';

import { MatExpansionPanel, MatExpansionPanelHeader, MatExpansionPanelTitle } from '@angular/material/expansion';

import { SwatchesComponent } from '../../../../../../../../mb/src/lib/colors/swatches/swatches.component';
import { SwatchesSelectComponent } from '../../../../../../../../mb/src/lib/colors/swatches/swatches-select.component';

@Component({
    selector: 'app-sample-swatches-6',
    templateUrl: './sample-swatches-6.component.html',
    styleUrls: ['./sample-swatches-6.component.scss'],
    imports: [MatCard, MatCardHeader, MatCardTitle, MatCardSubtitle, MatFormField, MatLabel, MatInput, FormsModule, MatCardContent, SwatchesComponent, SwatchesSelectComponent, MatCardActions, MatExpansionPanel, MatExpansionPanelHeader, MatExpansionPanelTitle]
})
export class SampleSwatches6Component {

  private sequence = 13254;
  get paletteSequenceLength(): number {
    return this.sequence;
  }
  set paletteSequenceLength(value: number) {
    this.sequence = value;
    this.palettesSequence = colorsCoSequential5PalettesSelection(this.sequenceToString());
    this.selectedPaletteIndex = 0;
    this.selectedPaletteSequence = this.palettesSequence[this.selectedPaletteIndex];
  }

  palettesSequence: string[][] = colorsCoSequential5PalettesSelection(this.sequenceToString());
  private selectedPaletteIndex = 0;
  selectedPaletteSequence: string[] = this.palettesSequence[this.selectedPaletteIndex];

  palettesAll: string[][] = colorsCoSequential5Palettes;
  private selectedPalettesAllIndex = 0;
  selectedPalettesAll: string[] = this.palettesAll[this.selectedPalettesAllIndex];

  selectionChanged(selection: string[]) {
    this.selectedPaletteIndex = this.palettesSequence.indexOf(selection);
    this.selectedPaletteSequence = selection;
  }

  selectionAllChanged(selection: string[]) {
    this.selectedPalettesAllIndex = this.palettesAll.indexOf(selection);
    this.selectedPalettesAll = selection;
  }

  private sequenceToString(): string | undefined {
    return this.sequence === null ? undefined : this.sequence.toString();
  }
}

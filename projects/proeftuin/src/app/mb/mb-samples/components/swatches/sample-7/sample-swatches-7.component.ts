import { ChangeDetectionStrategy, Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatFormField, MatLabel } from '@angular/material/form-field';
import { MatInput } from '@angular/material/input';
import { MatCard, MatCardHeader, MatCardTitle, MatCardSubtitle, MatCardContent, MatCardActions } from '@angular/material/card';
import { MatExpansionPanel, MatExpansionPanelHeader, MatExpansionPanelTitle } from '@angular/material/expansion';

import { colorsCoAll5Palettes } from 'projects/mb/src/lib/colors/colors-co-all-5-palettes';
import { colorsCoAll5PalettesSelection } from 'projects/mb/src/lib/colors/colors-co-all-5-palettes-selection';
import { SwatchesComponent } from 'projects/mb/src/lib/colors/swatches/swatches.component';
import { SwatchesSelectComponent } from 'projects/mb/src/lib/colors/swatches/swatches-select.component';

@Component({
  selector: 'app-sample-swatches-7',
  templateUrl: './sample-swatches-7.component.html',
  styleUrls: ['./sample-swatches-7.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [
    FormsModule,
    MatFormField,
    MatLabel,
    MatInput,
    MatCard,
    MatCardHeader,
    MatCardTitle,
    MatCardSubtitle,
    MatCardContent,
    MatCardActions,
    MatExpansionPanel,
    MatExpansionPanelHeader,
    MatExpansionPanelTitle,
    SwatchesComponent,
    SwatchesSelectComponent
  ]
})
export class SampleSwatches7Component {
  private sequence = 13254;
  get paletteSequenceLength(): number {
    return this.sequence;
  }
  set paletteSequenceLength(value: number) {
    this.sequence = value;
    this.palettesSequence = colorsCoAll5PalettesSelection(this.sequence.toString());
    this.selectedPaletteSequence = this.palettesSequence[this.selectedPaletteIndex];
  }

  palettesSequence: string[][] = colorsCoAll5PalettesSelection(this.sequence.toString());
  selectedPaletteIndex = 0;
  selectedPaletteSequence: string[] = this.palettesSequence[this.selectedPaletteIndex];

  palettesAll: string[][] = colorsCoAll5Palettes;
  selectedPalettesAllIndex = 0;
  selectedPalettesAll: string[] = this.palettesAll[this.selectedPalettesAllIndex];

  selectionChanged(selection: string[]) {
    this.selectedPaletteIndex = this.palettesSequence.indexOf(selection);
    this.selectedPaletteSequence = selection;
  }

  selectionAllChanged(selection: string[]) {
    this.selectedPalettesAllIndex = this.palettesAll.indexOf(selection);
    this.selectedPalettesAll = selection;
  }
}

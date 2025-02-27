import { ChangeDetectionStrategy, Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatFormField, MatLabel } from '@angular/material/form-field';
import { MatInput } from '@angular/material/input';
import { MatMiniFabButton } from '@angular/material/button';
import { MatIcon } from '@angular/material/icon';
import { MatCard, MatCardHeader, MatCardTitle, MatCardSubtitle, MatCardContent, MatCardActions } from '@angular/material/card';
import { MatExpansionPanel, MatExpansionPanelHeader, MatExpansionPanelTitle } from '@angular/material/expansion';

import { randomPalette } from 'projects/mb/src/lib/colors/random-procedural-palettes';
import { SwatchesComponent } from 'projects/mb/src/lib/colors/swatches/swatches.component';
import { SwatchesSelectComponent } from 'projects/mb/src/lib/colors/swatches/swatches-select.component';

@Component({
  selector: 'app-sample-swatches-4',
  templateUrl: './sample-swatches-4.component.html',
  styleUrls: ['./sample-swatches-4.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [
    FormsModule,
    MatFormField,
    MatLabel,
    MatInput,
    MatMiniFabButton,
    MatIcon,
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

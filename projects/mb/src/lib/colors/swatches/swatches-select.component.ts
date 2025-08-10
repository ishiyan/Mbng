import { ChangeDetectionStrategy, Component, effect, input, output } from '@angular/core';
import { MatSelectChange, MatSelect, MatSelectTrigger } from '@angular/material/select';
import { MatFormField, MatLabel } from '@angular/material/form-field';
import { NgStyle } from '@angular/common';
import { SwatchesComponent } from './swatches.component';
import { MatOption } from '@angular/material/core';

const SELECT_PADDING_PIXELS = 48;
const TRIGGER_HEIGHT_PIXELS = 24;
const OPTION_HEIGHT_PIXELS = 24;
const MIN_SWATCHES = 1;

class Palette {
  id: number = 0;
  palette: string[] = [];
}

class Palettes {
  id: number = 0;
  palettes: Palette[] = [];

  [Symbol.iterator](): Iterator<Palette> {
    return this.palettes[Symbol.iterator]();
  }
}

function inc(n: number): number {
  return n === 1000 ? 0 : 1000;
}

@Component({
  selector: 'mb-swatches-select',
  templateUrl: './swatches-select.component.html',
  styleUrls: ['./swatches-select.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [
    MatFormField,
    NgStyle,
    MatLabel,
    MatSelect,
    MatSelectTrigger,
    SwatchesComponent,
    MatOption
  ]
})
export class SwatchesSelectComponent {
  /** Specifies a selection index. */
  readonly selected = input<number>(0);

  /** Specifies an array of color palettes. */
  readonly colors = input.required<string[][]>();

  /** A label to display above the selector. */
  readonly label = input('Select colors');

  /** Event emitted when the selected value has been changed by the user. */
  readonly selectionChange = output<string[]>();

  readonly optionHeightPixels = OPTION_HEIGHT_PIXELS;
  readonly triggerHeightPixels = TRIGGER_HEIGHT_PIXELS;

  optionWidthPixels = OPTION_HEIGHT_PIXELS * MIN_SWATCHES;
  triggerWidthPixels = TRIGGER_HEIGHT_PIXELS * MIN_SWATCHES;
  selectWidthPixels = SELECT_PADDING_PIXELS + this.triggerWidthPixels;

  palettes : Palettes = { id: 0, palettes: [], [Symbol.iterator]: function (): Iterator<Palette> { return this.palettes[Symbol.iterator](); }};
  selectedPalette: Palette = { id: 0, palette: [] };
  selectedIndex = 0;

  constructor() {
    effect(() => {
      let value = this.selected();
      this.selectedIndex = value;
      const l = this.palettes.palettes.length;
      if (l > 0) {
        if (value >= l) {
          value = l - 1;
        }
  
        this.selectedIndex = value;
        this.selectedPalette = this.palettes.palettes[this.selectedIndex];
        this.selectionChange.emit(this.selectedPalette.palette);
      }
    });
    effect(() => {
      const newColors = this.colors();
      const startId = inc(this.palettes.id);
      const newPalettes: Palettes = {
        id: startId,
        palettes: [],
        [Symbol.iterator]: function (): Iterator<Palette> {
          return this.palettes[Symbol.iterator]();
        }
      };

      newColors.forEach((paletteArray, index) => {
        newPalettes.palettes.push({
          id: startId + index,
          palette: paletteArray
        });
      });

      const l = newPalettes.palettes.length;
      if (l > 0) {
        let newIndex = this.selectedIndex;
        if (newIndex >= l) {
          newIndex = l - 1;
        }

        let length = 0;
        for (let i = 0; i < l; ++i) {
          const p = newColors[i];
          const pl = p.length;
          if (length < pl) {
            length = pl;
          }
        }
  
        if (length < MIN_SWATCHES) {
          length = MIN_SWATCHES;
        }
  
        this.optionWidthPixels = length * this.optionHeightPixels;
        this.triggerWidthPixels = length * this.triggerHeightPixels;
        this.selectWidthPixels = SELECT_PADDING_PIXELS + this.triggerWidthPixels;
  
        this.palettes = newPalettes;
        this.selectedPalette = newPalettes.palettes[newIndex];
        this.selectedIndex = newIndex;
        this.selectionChange.emit(this.selectedPalette.palette);
      }
    });
  }

  selectionChanged(selection: MatSelectChange) {
    this.selectedIndex = this.palettes.palettes.indexOf(selection.value);
    this.selectionChange.emit(selection.value.palette);
  }

  computeWidthStyle(): any {
    return { width: `${this.selectWidthPixels}px` };
  }
}

import { Component, Input, ViewEncapsulation, Output, EventEmitter } from '@angular/core';
import { MatSelectChange } from '@angular/material/select';

const SELECT_PADDING_PIXELS = 48;
const TRIGGER_HEIGHT_PIXELS = 24;
const OPTION_HEIGHT_PIXELS = 24;
const MIN_SWATCHES = 1;

@Component({
  selector: 'mb-swatches-select',
  templateUrl: './swatches-select.component.html',
  styleUrls: ['./swatches-select.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class SwatchesSelectComponent {

  /** Specifies an array of color palettes. */
  @Input() set colors(newColors: string[][]) {
    if (newColors && newColors.length > 0) {
      const l = newColors.length;
      if (this.selectedIndex >= l) {
        this.selectedIndex = l - 1;
      }

      this.palettes = newColors;
      this.selectedPalette = this.palettes[this.selectedIndex];
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
    }
  }

  /** A label to display above the selector. */
  @Input() label = 'Select colors';

  /** Event emitted when the selected value has been changed by the user. */
  @Output() readonly selectionChange: EventEmitter<string[]> = new EventEmitter<string[]>();

  readonly optionHeightPixels = OPTION_HEIGHT_PIXELS;
  readonly triggerHeightPixels = TRIGGER_HEIGHT_PIXELS;

  optionWidthPixels = OPTION_HEIGHT_PIXELS * MIN_SWATCHES;
  triggerWidthPixels = TRIGGER_HEIGHT_PIXELS * MIN_SWATCHES;
  selectWidthPixels = SELECT_PADDING_PIXELS + this.triggerWidthPixels;

  palettes: string[][] = [];
  selectedPalette: string[] = [];
  selectedIndex = 0;

  selectionChanged(selection: MatSelectChange) {
    this.selectedIndex = this.palettes.indexOf(selection.value);
    this.selectionChange.emit(selection.value);
  }

  computeWidthStyle(): any {
    return { width: `${this.selectWidthPixels}px` };
  }
}

import { Component, Input, ChangeDetectionStrategy, ViewEncapsulation, Output, EventEmitter } from '@angular/core';
import { MatSelectChange } from '@angular/material/select';

const SELECT_PADDING_PIXELS = 20;
const TRIGGER_HEIGHT_PIXELS = 24;
const OPTION_HEIGHT_PIXELS = 32;
const NUMBER_OF_SWATCHES = 3;

@Component({
  selector: 'mb-swatches-select',
  templateUrl: './swatches-select.component.html',
  styleUrls: ['./swatches-select.component.scss'],
  // changeDetection: ChangeDetectionStrategy.OnPush,
  encapsulation: ViewEncapsulation.None
})
export class SwatchesSelectComponent {

  /** Specifies an array of color palettes. */
  @Input() set colors(newColors: string[][]) {
    if (newColors && newColors.length > 0) {
      this.palettes = newColors;
      this.selectedPalette = this.palettes[0];
      let length = 0;
      for (const palette in this.palettes) {
        if (length < palette.length) {
          length = palette.length;
        }
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

  optionWidthPixels = OPTION_HEIGHT_PIXELS * NUMBER_OF_SWATCHES;
  triggerWidthPixels = TRIGGER_HEIGHT_PIXELS * NUMBER_OF_SWATCHES;
  selectWidthPixels = SELECT_PADDING_PIXELS + this.triggerWidthPixels;

  palettes: string[][] = [];
  selectedPalette: string[] = [];

  selectionChanged(selection: MatSelectChange) {
    this.selectionChange.emit(selection.value);
  }

  computeWidthStyle(): any {
    return { width: `${this.selectWidthPixels}px` };
  }
}

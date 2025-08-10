import { ChangeDetectionStrategy, Component, effect, input, output } from '@angular/core';
import { MatLabel } from '@angular/material/form-field';

import { ColorPickerDirective } from '../../../colors/picker/color-picker.directive';

@Component({
  selector: 'mb-color',
  templateUrl: './color.component.html',
  styleUrls: ['./color.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [MatLabel, ColorPickerDirective]
})
export class ColorComponent {
  private value = '#000';
  protected currentLabel = 'Color';

  /** Event emitted when the selected value has been changed by the user. */
  readonly selectionChange = output<string>();

  /** A label to display above the selector. */
  label = input<string>();

  /** Specifies an initial value. */
  initial = input.required<string>();

  protected set color(value: string) {
    if (this.value !== value) {
      this.value = value;
      this.selectionChange.emit(this.value);
    }
  }
  protected get color(): string {
    return this.value;
  }

  constructor(){
    effect(() => {
      const lab = this.label();
      if (lab && this.currentLabel !== lab) {
        this.currentLabel = lab;
      }
    });
    effect(() => {
      this.value = this.initial();
    });
  }
}

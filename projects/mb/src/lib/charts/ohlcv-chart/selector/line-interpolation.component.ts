import { ChangeDetectionStrategy, Component, effect, input, output } from '@angular/core';
import { MatFormField, MatLabel } from '@angular/material/form-field';
import { MatSelectChange, MatSelect } from '@angular/material/select';
import { MatOption } from '@angular/material/core';

interface Elem {
  value: string;
  option: string;
  selected: boolean;
}

@Component({
    selector: 'mb-line-interpolation',
    templateUrl: './line-interpolation.component.html',
    styleUrls: ['./line-interpolation.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush,
    imports: [MatFormField, MatLabel, MatSelect, MatOption]
})
export class LineInterpolationComponent {
  protected elems: Elem[] = [
    { value: 'linear', option: 'linear', selected: true },
    { value: 'natural', option: 'natural', selected: false },
    { value: 'basis', option: 'basis', selected: false },
    { value: 'camullRom', option: 'camullRom', selected: false },
    { value: 'cardinal', option: 'cardinal', selected: false },
    { value: 'step', option: 'step', selected: false },
    { value: 'stepBefore', option: 'stepBefore', selected: false },
    { value: 'stepAfter', option: 'stepAfter', selected: false }
  ];

  protected elemSelected = this.elems[0].value;
  protected currentLabel = 'Interpolation';

  /** Event emitted when the selected value has been changed by the user. */
  readonly selectionChange = output<string>();

  protected selectionChanged(selection: MatSelectChange) {
    this.selectionChange.emit(selection.value);
  }

  /** A label to display above the selector. */
  label = input<string>();

  /** Specifies an initial value. */
  initial = input.required<string>();

  constructor(){
    effect(() => {
      const lab = this.label();
      if (lab && this.currentLabel !== lab) {
        this.currentLabel = lab;
      }
    });
    effect(() => {
      const v = this.initial();
      switch (v) {
        case 'linear':
        case 'natural':
        case 'basis':
        case 'camullRom':
        case 'cardinal':
        case 'step':
        case 'stepBefore':
        case 'stepAfter':
          break;
        default:
          return;
      }

      for (const elem of this.elems) {
        elem.selected = false;
        if (elem.value === v) {
          elem.selected = true;
        }
      }

      this.elemSelected = v;
    });
  }
}

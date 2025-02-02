import { ChangeDetectionStrategy, Component, effect, input, output } from '@angular/core';
import { MatFormField, MatLabel } from '@angular/material/form-field';
import { MatSelectChange, MatSelect, MatSelectTrigger } from '@angular/material/select';
import { MatOption } from '@angular/material/core';

import { WidthSvgComponent } from './width-svg.component';

interface Elem {
  value: number;
  selected: boolean;
}

@Component({
    selector: 'mb-line-width',
    templateUrl: './line-width.component.html',
    styleUrls: ['./line-width.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush,
    imports: [
      MatFormField,
      MatLabel,
      MatSelect,
      MatSelectTrigger,
      MatOption,
      WidthSvgComponent
    ]
})
export class LineWidthComponent {
  protected elems: Elem[] = [
    { value: 0.1, selected: false },
    { value: 0.3, selected: false },
    { value: 0.5, selected: false },
    { value: 1.0, selected: true },
    { value: 1.5, selected: false },
    { value: 2.0, selected: false },
    { value: 2.5, selected: false },
    { value: 3.0, selected: false },
    { value: 3.5, selected: false },
    { value: 4.0, selected: false }
  ];

  protected elemSelected = this.elems[3].value;

  /** Event emitted when the selected value has been changed by the user. */
  readonly selectionChange = output<number>();

  currentLabel = 'Thickness';
  
  /** A label to display above the selector. */
  label = input<string>();

  protected selectionChanged(selection: MatSelectChange) {
    this.selectionChange.emit(selection.value);
  }

  /** Specifies an initial value. */
  initial = input.required<number>();

  constructor() {
    effect(() => {
      const lab = this.label();
      if (lab && this.currentLabel !== lab) {
        this.currentLabel = lab;
      }
    });
    effect(() => {
      const value = this.initial();
      if (value) {
        switch (value) {
          case 0.1:
          case 0.3:
          case 0.5:
          case 1:
          case 1.5:
          case 2:
          case 2.5:
          case 3:
          case 3.5:
          case 4:
            break;
          default:
            return;
        }
    
        for (const elem of this.elems) {
          elem.selected = false;
          if (elem.value === value) {
            elem.selected = true;
          }
        }
    
        this.elemSelected = value;
      }
    });
  }
}

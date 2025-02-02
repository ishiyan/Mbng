import { ChangeDetectionStrategy, Component, effect, input, output } from '@angular/core';
import { MatFormField, MatLabel } from '@angular/material/form-field';
import { MatSelectChange, MatSelect, MatSelectTrigger } from '@angular/material/select';
import { MatOption } from '@angular/material/core';

import { DashSvgComponent } from './dash-svg.component';

interface Elem {
  value: string;
  selected: boolean;
}

@Component({
    selector: 'mb-line-dash',
    templateUrl: './line-dash.component.html',
    styleUrls: ['./line-dash.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush,
    imports: [
      MatFormField,
      MatLabel,
      MatSelect,
      MatSelectTrigger,
      MatOption,
      DashSvgComponent
    ]
})
export class LineDashComponent {
  protected elems: Elem[] = [
    { value: '', selected: true },
    { value: '1,1', selected: false },
    { value: '2,2', selected: false },
    { value: '3,3', selected: false },
    { value: '4,4', selected: false },
    { value: '5,5', selected: false },
    { value: '6,6', selected: false },
    { value: '7,7', selected: false },
    { value: '3,1.5', selected: false },
    { value: '4,2', selected: false },
    { value: '5,2.5', selected: false },
    { value: '6,3', selected: false },
    { value: '7,3.5', selected: false }
  ];

  protected elemSelected = this.elems[0].value;
  protected currentLabel = 'Dash';

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
        case '':
        case '1,1':
        case '2,2':
        case '3,3':
        case '4,4':
        case '5,5':
        case '6,6':
        case '7,7':
        case '3,1.5':
        case '4,2':
        case '5,2.5':
        case '6,3':
        case '7,3.5':
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

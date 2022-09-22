import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { MatSelectChange } from '@angular/material/select';

interface Elem {
  value: string;
  option: string;
  selected: boolean;
}

@Component({
  selector: 'mb-line-interpolation',
  templateUrl: './line-interpolation.component.html',
  styleUrls: ['./line-interpolation.component.scss']
})
export class LineInterpolationComponent implements OnInit {
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

  /** Event emitted when the selected value has been changed by the user. */
  @Output() readonly selectionChange: EventEmitter<string> = new EventEmitter<string>();

  /** A label to display above the selector. */
  @Input() label = 'Interpolation';

  protected selectionChanged(selection: MatSelectChange) {
    this.selectionChange.emit(selection.value);
  }

  /** Specifies an initial value. */
  @Input() set initial(value: string) {
    switch (value) {
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
      if (elem.value === value) {
        elem.selected = true;
      }
    }

    this.elemSelected = value;
  }

  ngOnInit() {
    this.selectionChange.emit(this.elemSelected);
  }
}

import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { MatSelectChange, MatSelect, MatSelectTrigger } from '@angular/material/select';
import { MatFormField, MatLabel } from '@angular/material/form-field';
import { NgIf, NgFor } from '@angular/common';
import { WidthSvgComponent } from './width-svg.component';
import { MatOption } from '@angular/material/core';

interface Elem {
  value: number;
  selected: boolean;
}

@Component({
    selector: 'mb-line-width',
    templateUrl: './line-width.component.html',
    styleUrls: ['./line-width.component.scss'],
    imports: [MatFormField, NgIf, MatLabel, MatSelect, MatSelectTrigger, WidthSvgComponent, NgFor, MatOption]
})
export class LineWidthComponent implements OnInit {
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
  @Output() readonly selectionChange: EventEmitter<number> = new EventEmitter<number>();

  /** A label to display above the selector. */
  @Input() label = 'Thickness';

  protected selectionChanged(selection: MatSelectChange) {
    this.selectionChange.emit(selection.value);
  }

  /** Specifies an initial value. */
  @Input() set initial(value: number) {
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

  ngOnInit() {
    this.selectionChange.emit(this.elemSelected);
  }
}

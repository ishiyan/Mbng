import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { MatSelectChange } from '@angular/material/select';

interface Elem {
  value: string;
  selected: boolean;
}

@Component({
  selector: 'mb-line-dash',
  templateUrl: './line-dash.component.html',
  styleUrls: ['./line-dash.component.scss']
})
export class LineDashComponent implements OnInit {
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

  /** Event emitted when the selected value has been changed by the user. */
  @Output() readonly selectionChange: EventEmitter<string> = new EventEmitter<string>();

  /** A label to display above the selector. */
  @Input() label = '';

  protected selectionChanged(selection: MatSelectChange) {
    this.selectionChange.emit(selection.value);
  }

  /** Specifies an initial value. */
  @Input() set initial(value: string) {
    switch (value) {
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

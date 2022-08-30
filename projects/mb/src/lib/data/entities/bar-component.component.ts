import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { MatSelectChange } from '@angular/material/select';

import { BarComponent } from './bar-component.enum';

interface Comp {
  enumeration: BarComponent;
  option: string;
  trigger: string;
  selected: boolean;
}

@Component({
  selector: 'mb-bar-component',
  templateUrl: './bar-component.component.html',
  styleUrls: ['./bar-component.component.scss']
})
export class BarComponentComponent implements OnInit {
  protected comps: Comp[] = [
    { enumeration: BarComponent.Open, option: 'Opening, o', trigger: 'o', selected: false },
    { enumeration: BarComponent.High, option: 'Highest, h', trigger: 'h', selected: false },
    { enumeration: BarComponent.Low, option: 'Lowest, l', trigger: 'l', selected: false },
    { enumeration: BarComponent.Close, option: 'Closing, c', trigger: 'c', selected: false },
    { enumeration: BarComponent.Median, option: 'Median, hl/2', trigger: 'hl/2', selected: false },
    { enumeration: BarComponent.Typical, option: 'Typical, hlc/3', trigger: 'hlc/3', selected: true },
    { enumeration: BarComponent.Weighted, option: 'Weighted, hlcc/4', trigger: 'hlcc/4', selected: false },
    { enumeration: BarComponent.Average, option: 'Average, ohlc/4', trigger: 'ohlc/4', selected: false }
  ];

  protected compSelected = this.comps[BarComponent.Typical.valueOf()].enumeration;
  //protected barComponent: BarComponent = BarComponent.Typical;

  /** Event emitted when the selected value has been changed by the user. */
  @Output() readonly selectionChange: EventEmitter<BarComponent> = new EventEmitter<BarComponent>();

  /** A label to display above the selector. */
  @Input() label = 'Bar component';

  protected selectionChanged(selection: MatSelectChange) {
    this.selectionChange.emit(selection.value);
  }

  /** Specifies an initial value. */
  @Input() set initial(comp: BarComponent) {
    const idxOld = this.compSelected.valueOf();
    const idxNew = comp.valueOf();
    this.comps[idxOld].selected = false;
    this.comps[idxNew].selected = true;
    this.compSelected = this.comps[idxNew].enumeration;
  }

  ngOnInit() {
    this.selectionChange.emit(this.compSelected);
  }
}

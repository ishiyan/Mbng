import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { MatSelectChange } from '@angular/material/select';

import { BarComponent } from './bar-component.enum';

interface Comp {
  enumeration: BarComponent;
  name: string;
  tex: string;
  selected: boolean;
}

@Component({
    selector: 'mb-bar-component',
    templateUrl: './bar-component.component.html',
    styleUrls: ['./bar-component.component.scss'],
    standalone: false
})
export class BarComponentComponent implements OnInit {
  protected comps: Comp[] = [
    { enumeration: BarComponent.Open, name: 'Opening', tex: 'o', selected: false },
    { enumeration: BarComponent.High, name: 'Highest', tex: 'h', selected: false },
    { enumeration: BarComponent.Low, name: 'Lowest', tex: 'l', selected: false },
    { enumeration: BarComponent.Close, name: 'Closing', tex: 'c', selected: false },
    { enumeration: BarComponent.Median, name: 'Median', tex: '\\frac{h+l}{2}', selected: false },
    { enumeration: BarComponent.Typical, name: 'Typical', tex: '\\frac{h+l+c}{3}', selected: true },
    { enumeration: BarComponent.Weighted, name: 'Weighted', tex: '\\frac{h+l+c+c}{4}', selected: false },
    { enumeration: BarComponent.Average, name: 'Average', tex: '\\frac{o+h+l+c}{4}', selected: false }
  ];

  protected compSelected = this.comps[BarComponent.Typical.valueOf()];

  /** Event emitted when the selected value has been changed by the user. */
  @Output() readonly selectionChange: EventEmitter<BarComponent> = new EventEmitter<BarComponent>();

  /** A label to display above the selector. */
  @Input() label = 'Bar component';

  protected selectionChanged(selection: MatSelectChange) {
    this.selectionChange.emit(selection.value.enumeration);
  }

  /** Specifies an initial value. */
  @Input() set initial(comp: BarComponent) {
    const idxOld = this.compSelected.enumeration.valueOf();
    const idxNew = comp.valueOf();
    this.comps[idxOld].selected = false;
    this.comps[idxNew].selected = true;
    this.compSelected = this.comps[idxNew];
  }

  ngOnInit() {
    this.selectionChange.emit(this.compSelected.enumeration);
  }
}

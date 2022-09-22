import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { MatSelectChange } from '@angular/material/select';

import { QuoteComponent } from './quote-component.enum';

interface Comp {
  enumeration: QuoteComponent;
  name: string;
  tex: string;
  selected: boolean;
}

@Component({
  selector: 'mb-quote-component',
  templateUrl: './quote-component.component.html',
  styleUrls: ['./quote-component.component.scss']
})
export class QuoteComponentComponent implements OnInit {
  protected comps: Comp[] = [
    { enumeration: QuoteComponent.Bid, name: 'Bid', tex: 'b_p', selected: false },
    { enumeration: QuoteComponent.Ask, name: 'Ask', tex: 'a_p', selected: false },
    { enumeration: QuoteComponent.Mid, name: 'Mid', tex: '\\frac{b_p·a_p}{2}', selected: false },
    { enumeration: QuoteComponent.Weighted, name: 'Weighted', tex: '\\frac{b_p·b_s+a_p·a_s}{b_s+a_s}', selected: false },
    { enumeration: QuoteComponent.WeightedMid, name: 'Weighted Mid', tex: '\\frac{b_p·a_s+a_p·b_s}{b_s+a_s}', selected: false },
    { enumeration: QuoteComponent.SpreadBp, name: 'Spread bp', tex: '', selected: true },
  ];

  protected compSelected = this.comps[QuoteComponent.Mid.valueOf()];

  /** Event emitted when the selected value has been changed by the user. */
  @Output() readonly selectionChange: EventEmitter<QuoteComponent> = new EventEmitter<QuoteComponent>();

  /** A label to display above the selector. */
  @Input() label = 'Quote component';

  protected selectionChanged(selection: MatSelectChange) {
    this.selectionChange.emit(selection.value.enumeration);
  }

  /** Specifies an initial value. */
  @Input() set initial(comp: QuoteComponent) {
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

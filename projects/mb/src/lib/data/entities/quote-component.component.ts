import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { MatSelectChange } from '@angular/material/select';

import { QuoteComponent } from './quote-component.enum';

interface Comp {
  enumeration: QuoteComponent;
  option: string;
  trigger: string;
  selected: boolean;
}

@Component({
  selector: 'mb-quote-component',
  templateUrl: './quote-component.component.html',
  styleUrls: ['./quote-component.component.scss']
})
export class QuoteComponentComponent implements OnInit {
  protected comps: Comp[] = [
    { enumeration: QuoteComponent.Bid, option: 'Bid, b', trigger: 'b', selected: false },
    { enumeration: QuoteComponent.Ask, option: 'Ask, a', trigger: 'a', selected: false },
    { enumeration: QuoteComponent.Mid, option: 'Mid, ba/2', trigger: 'ba/2', selected: false },
    { enumeration: QuoteComponent.Weighted, option: 'Weighted, (bbs+aas)/(bs+as)', trigger: '(bbs+aas)/(bs+as)', selected: false },
    { enumeration: QuoteComponent.WeightedMid, option: 'Weighted Mid, (bas+abs)/(bs+as)', trigger: '(bas+abs)/(bs+as)', selected: false },
    { enumeration: QuoteComponent.SpreadBp, option: 'Spread bp', trigger: 'spread bp', selected: true },
  ];

  protected compSelected = this.comps[QuoteComponent.Mid.valueOf()].enumeration;

  /** Event emitted when the selected value has been changed by the user. */
  @Output() readonly selectionChange: EventEmitter<QuoteComponent> = new EventEmitter<QuoteComponent>();

  /** A label to display above the selector. */
  @Input() label = 'Quote component';

  protected selectionChanged(selection: MatSelectChange) {
    this.selectionChange.emit(selection.value);
  }

  /** Specifies an initial value. */
  @Input() set initial(comp: QuoteComponent) {
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

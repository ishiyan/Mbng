import { ChangeDetectionStrategy, Component, OnInit, effect, input, output } from '@angular/core';
import { MatSelectChange, MatSelect, MatSelectTrigger } from '@angular/material/select';
import { MatFormField, MatLabel } from '@angular/material/form-field';
import { MatOption } from '@angular/material/core';

import { QuoteComponent } from './quote-component.enum';
import { KatexDisplayComponent } from '../../katex/katex-display.component';

interface Comp {
  enumeration: QuoteComponent;
  name: string;
  tex: string;
  selected: boolean;
}

@Component({
    selector: 'mb-quote-component',
    templateUrl: './quote-component.component.html',
    styleUrls: ['./quote-component.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush,
    imports: [
      MatFormField,
      MatLabel,
      MatSelect,
      MatSelectTrigger,
      MatOption,
      KatexDisplayComponent
    ]
})
export class QuoteComponentComponent implements OnInit {
  protected comps: Comp[] = [
    { enumeration: QuoteComponent.Bid, name: 'Bid', tex: 'b_p', selected: false },
    { enumeration: QuoteComponent.Ask, name: 'Ask', tex: 'a_p', selected: false },
    { enumeration: QuoteComponent.Mid, name: 'Mid', tex: '\\frac{b_p+a_p}{2}', selected: false },
    { enumeration: QuoteComponent.Weighted, name: 'Weighted', tex: '\\frac{b_p·b_s+a_p·a_s}{b_s+a_s}', selected: false },
    { enumeration: QuoteComponent.WeightedMid, name: 'Weighted Mid', tex: '\\frac{b_p·a_s+a_p·b_s}{b_s+a_s}', selected: false },
    { enumeration: QuoteComponent.SpreadBp, name: 'Spread bp', tex: '10000\\frac{a_p-b_p}{mid}', selected: true },
  ];

  protected compSelected = this.comps[QuoteComponent.Mid.valueOf()];

  /** Event emitted when the selected value has been changed by the user. */
  readonly selectionChange = output<QuoteComponent>();

  /** A label to display above the selector. */
  readonly label = input('Quote price');

  protected selectionChanged(selection: MatSelectChange) {
    this.selectionChange.emit(selection.value.enumeration);
  }

  /** Specifies an initial value. */
  initial = input.required<QuoteComponent>();

  constructor() {
    effect(() => {
      const idxNew = this.initial().valueOf();
      const idxOld = this.compSelected.enumeration.valueOf();
      this.comps[idxOld].selected = false;
      this.comps[idxNew].selected = true;
      this.compSelected = this.comps[idxNew];
    });  
  }

  ngOnInit() {
    this.selectionChange.emit(this.compSelected.enumeration);
  }
}

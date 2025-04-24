import { ChangeDetectionStrategy, Component, OnInit, effect, input, output } from '@angular/core';
import { MatSelectChange, MatSelect, MatSelectTrigger } from '@angular/material/select';
import { MatFormField, MatLabel } from '@angular/material/form-field';
import { MatOption } from '@angular/material/core';

import { BarComponent } from './bar-component.enum';
import { KatexDisplayComponent } from '../../katex/katex-display.component';

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
  readonly selectionChange = output<BarComponent>();

  /** A label to display above the selector. */
  readonly label = input('Bar price');

  protected selectionChanged(selection: MatSelectChange) {
    this.selectionChange.emit(selection.value.enumeration);
  }

  /** Specifies an initial value. */
  initial = input.required<BarComponent>();

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

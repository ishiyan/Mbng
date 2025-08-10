import { ChangeDetectionStrategy, Component, effect, input } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatFormField, MatHint } from '@angular/material/form-field';
import { MatInput } from '@angular/material/input';
import { MatExpansionPanel, MatExpansionPanelHeader, MatExpansionPanelTitle } from '@angular/material/expansion';

import { TradeParameters } from './trade-parameters';

@Component({
  selector: 'mb-data-generators-trade-parameters',
  templateUrl: './trade-parameters.component.html',
  styleUrls: ['./trade-parameters.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [
    FormsModule,
    MatFormField,
    MatHint,
    MatInput,
    MatExpansionPanel,
    MatExpansionPanelHeader,
    MatExpansionPanelTitle
  ]
})
export class TradeParametersComponent {
  //tradeParameters = input.required<TradeParameters>();
  tradeParameters = input<TradeParameters>();
  params: TradeParameters = new TradeParameters();

  constructor() {
    effect(() => {
      this.params = this.tradeParameters() ?? new TradeParameters();
    });  
  }
}

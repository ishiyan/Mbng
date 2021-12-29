import { Component, Input } from '@angular/core';
import { TradeParameters } from './trade-parameters';

@Component({
  selector: 'mb-data-generators-trade-parameters',
  templateUrl: './trade-parameters.component.html',
  styleUrls: ['./trade-parameters.component.scss']
})
export class TradeParametersComponent {
  @Input() tradeParameters!: TradeParameters;
}

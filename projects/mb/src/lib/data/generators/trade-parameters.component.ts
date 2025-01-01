import { Component, Input } from '@angular/core';
import { TradeParameters } from './trade-parameters';

@Component({
    selector: 'mb-data-generators-trade-parameters',
    templateUrl: './trade-parameters.component.html',
    styleUrls: ['./trade-parameters.component.scss'],
    standalone: false
})
export class TradeParametersComponent {
  @Input() tradeParameters!: TradeParameters;
}

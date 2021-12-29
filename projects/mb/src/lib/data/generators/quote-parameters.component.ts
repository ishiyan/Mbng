import { Component, Input } from '@angular/core';
import { QuoteParameters } from './quote-parameters';

@Component({
  selector: 'mb-data-generators-quote-parameters',
  templateUrl: './quote-parameters.component.html',
  styleUrls: ['./quote-parameters.component.scss']
})
export class QuoteParametersComponent {
  @Input() quoteParameters!: QuoteParameters;

  options: any = {throwOnError: false, strict: true};

  eq1 = '(ask, bid)_t=mid_t\\cdot (1 \\pm ρ_s),';
  eq2 = '(ask size, bid size)_t=(α_s, β_s)=const';
}

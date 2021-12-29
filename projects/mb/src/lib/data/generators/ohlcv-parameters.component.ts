import { Component, Input } from '@angular/core';
import { OhlcvParameters } from './ohlcv-parameters';

@Component({
  selector: 'mb-data-generators-ohlcv-parameters',
  templateUrl: './ohlcv-parameters.component.html',
  styleUrls: ['./ohlcv-parameters.component.scss']
})
export class OhlcvParametersComponent {
  @Input() ohlcvParameters!: OhlcvParameters;

  options: any = {throwOnError: false, strict: true};

  eq1 = '(high,low)_t=mid_t\\cdot (1 \\pm ρ_s),';
  eq2 = '(open,close)_t=mid_t\\cdot (1 \\pm ρ_b),';
  eq3 = 'v_t=\\nu=const,';
  eq4 = 'ρ_b\\in [0, ρ_s]';
}

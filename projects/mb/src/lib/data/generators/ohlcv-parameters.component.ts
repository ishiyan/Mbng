import { ChangeDetectionStrategy, Component, effect, input } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatFormField, MatHint } from '@angular/material/form-field';
import { MatInput } from '@angular/material/input';
import { MatExpansionPanel, MatExpansionPanelHeader, MatExpansionPanelTitle } from '@angular/material/expansion';

import { KatexComponent } from '../../katex/katex.component';
import { OhlcvParameters } from './ohlcv-parameters';

@Component({
  selector: 'mb-data-generators-ohlcv-parameters',
  templateUrl: './ohlcv-parameters.component.html',
  styleUrls: ['./ohlcv-parameters.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [
    FormsModule,
    MatFormField,
    MatHint,
    MatInput,
    MatExpansionPanel,
    MatExpansionPanelHeader,
    MatExpansionPanelTitle,
    KatexComponent
  ]
})
export class OhlcvParametersComponent {
  // ohlcvParameters = input.required<OhlcvParameters>();
  ohlcvParameters = input<OhlcvParameters>();
  params: OhlcvParameters = new OhlcvParameters();

  constructor() {
    effect(() => {
      this.params = this.ohlcvParameters() ?? new OhlcvParameters();
    });
  }

  options: any = {throwOnError: false, strict: true};
  eq1 = '(high,low)_t=mid_t\\cdot (1 \\pm ρ_s),';
  eq2 = '(open,close)_t=mid_t\\cdot (1 \\pm ρ_b),';
  eq3 = 'v_t=\\nu=const,';
  eq4 = 'ρ_b\\in [0, ρ_s]';
}

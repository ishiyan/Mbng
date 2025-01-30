import { ChangeDetectionStrategy, Component, effect, input } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatFormField, MatHint } from '@angular/material/form-field';
import { MatInput } from '@angular/material/input';
import { MatExpansionPanel, MatExpansionPanelHeader, MatExpansionPanelTitle } from '@angular/material/expansion';

import { KatexComponent } from '../../katex/katex.component';
import { QuoteParameters } from './quote-parameters';

@Component({
    selector: 'mb-data-generators-quote-parameters',
    templateUrl: './quote-parameters.component.html',
    styleUrls: ['./quote-parameters.component.scss'],
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
export class QuoteParametersComponent {
  // quoteParameters = input.required<QuoteParameters>();
  quoteParameters = input<QuoteParameters>();
  params: QuoteParameters = new QuoteParameters();

  constructor() {
    effect(() => {
      this.params = this.quoteParameters() ?? new QuoteParameters();
    });
  }

  options: any = {throwOnError: false, strict: true};
  eq1 = '(ask, bid)_t=mid_t\\cdot (1 \\pm ρ_s),';
  eq2 = '(ask size, bid size)_t=(α_s, β_s)=const';
}

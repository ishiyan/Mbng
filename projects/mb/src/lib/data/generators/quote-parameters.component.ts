import { Component, Input } from '@angular/core';
import { QuoteParameters } from './quote-parameters';
import { MatExpansionPanel, MatExpansionPanelHeader, MatExpansionPanelTitle } from '@angular/material/expansion';
import { KatexComponent } from '../../katex/katex.component';
import { MatFormField, MatHint } from '@angular/material/form-field';
import { FormsModule } from '@angular/forms';
import { MatInput } from '@angular/material/input';

@Component({
    selector: 'mb-data-generators-quote-parameters',
    templateUrl: './quote-parameters.component.html',
    styleUrls: ['./quote-parameters.component.scss'],
    imports: [MatExpansionPanel, MatExpansionPanelHeader, MatExpansionPanelTitle, KatexComponent, MatFormField, FormsModule, MatInput, MatHint]
})
export class QuoteParametersComponent {
  @Input() quoteParameters!: QuoteParameters;

  options: any = {throwOnError: false, strict: true};

  eq1 = '(ask, bid)_t=mid_t\\cdot (1 \\pm ρ_s),';
  eq2 = '(ask size, bid size)_t=(α_s, β_s)=const';
}

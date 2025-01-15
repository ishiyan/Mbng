import { Component, Input } from '@angular/core';
import { SquareParameters } from './square-parameters';
import { MatExpansionPanel, MatExpansionPanelHeader, MatExpansionPanelTitle } from '@angular/material/expansion';
import { KatexComponent } from '../../../katex/katex.component';
import { MatFormField, MatHint } from '@angular/material/form-field';
import { FormsModule } from '@angular/forms';
import { MatInput } from '@angular/material/input';

@Component({
    selector: 'mb-data-generators-square-parameters',
    templateUrl: './square-parameters.component.html',
    styleUrls: ['./square-parameters.component.scss'],
    imports: [MatExpansionPanel, MatExpansionPanelHeader, MatExpansionPanelTitle, KatexComponent, MatFormField, FormsModule, MatInput, MatHint]
})
export class SquareParametersComponent {
  @Input() squareParameters!: SquareParameters;

  options: any = {throwOnError: false, strict: true};

  // eslint-disable-next-line max-len
  eq1 = 'mid_t=\\left\\{\\begin{array}{rl}\\alpha+\\beta&t\\in [1, \\lambda]\\\\\\beta&t\\in [\\lambda+1, 2\\lambda]\\end{array}\\right.,';
  eq2 = 'sample_t=mid_t+noise_t';
}

import { ChangeDetectionStrategy, Component, effect, input } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatFormField, MatHint } from '@angular/material/form-field';
import { MatInput } from '@angular/material/input';
import { MatExpansionPanel, MatExpansionPanelHeader, MatExpansionPanelTitle } from '@angular/material/expansion';

import { KatexComponent } from '../../../katex/katex.component';
import { SquareParameters } from './square-parameters';

@Component({
    selector: 'mb-data-generators-square-parameters',
    templateUrl: './square-parameters.component.html',
    styleUrls: ['./square-parameters.component.scss'],
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
export class SquareParametersComponent {
  // squareParameters = input.required<SquareParameters>();
  squareParameters = input<SquareParameters>();
  params: SquareParameters = new SquareParameters();

  constructor() {
    effect(() => {
      this.params = this.squareParameters() ?? new SquareParameters();
    });
  }

  options: any = {throwOnError: false, strict: true};

  // eslint-disable-next-line max-len
  eq1 = 'mid_t=\\left\\{\\begin{array}{rl}\\alpha+\\beta&t\\in [1, \\lambda]\\\\\\beta&t\\in [\\lambda+1, 2\\lambda]\\end{array}\\right.,';
  eq2 = 'sample_t=mid_t+noise_t';
}

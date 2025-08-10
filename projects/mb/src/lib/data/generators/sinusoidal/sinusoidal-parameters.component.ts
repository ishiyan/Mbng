import { ChangeDetectionStrategy, Component, effect, input } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatFormField, MatHint } from '@angular/material/form-field';
import { MatInput } from '@angular/material/input';
import { MatExpansionPanel, MatExpansionPanelHeader, MatExpansionPanelTitle } from '@angular/material/expansion';

import { KatexComponent } from '../../../katex/katex.component';
import { SinusoidalParameters } from './sinusoidal-parameters';

@Component({
  selector: 'mb-data-generators-sinusoidal-parameters',
  templateUrl: './sinusoidal-parameters.component.html',
  styleUrls: ['./sinusoidal-parameters.component.scss'],
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
export class SinusoidalParametersComponent {
  // sinusoidalParameters = input.required<SinusoidalParameters>();
  sinusoidalParameters = input<SinusoidalParameters>();
  params: SinusoidalParameters = new SinusoidalParameters();

  constructor() {
    effect(() => {
      this.params = this.sinusoidalParameters() ?? new SinusoidalParameters();
    });
  }

  options: any = {throwOnError: false, strict: true};
  eq1 = 'mid_t=\\alpha\\cdot\\cos(\\frac{2\\pi}{\\lambda}t+\\varphi\\cdot\\pi)+\\beta,';
  eq2 = 'sample_t=mid_t+noise_t';
}

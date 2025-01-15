import { Component, Input } from '@angular/core';
import { SinusoidalParameters } from './sinusoidal-parameters';
import { MatExpansionPanel, MatExpansionPanelHeader, MatExpansionPanelTitle } from '@angular/material/expansion';
import { KatexComponent } from '../../../katex/katex.component';
import { MatFormField, MatHint } from '@angular/material/form-field';
import { FormsModule } from '@angular/forms';
import { MatInput } from '@angular/material/input';

@Component({
    selector: 'mb-data-generators-sinusoidal-parameters',
    templateUrl: './sinusoidal-parameters.component.html',
    styleUrls: ['./sinusoidal-parameters.component.scss'],
    imports: [MatExpansionPanel, MatExpansionPanelHeader, MatExpansionPanelTitle, KatexComponent, MatFormField, FormsModule, MatInput, MatHint]
})
export class SinusoidalParametersComponent {
  @Input() sinusoidalParameters!: SinusoidalParameters;

  options: any = {throwOnError: false, strict: true};

  eq1 = 'mid_t=\\alpha\\cdot\\cos(\\frac{2\\pi}{\\lambda}t+\\varphi\\cdot\\pi)+\\beta,';
  eq2 = 'sample_t=mid_t+noise_t';
}

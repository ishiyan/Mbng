import { Component, Input } from '@angular/core';
import { UniformRandomGeneratorKind } from '../uniform-random-generator-kind.enum';
import { NormalRandomGeneratorKind } from '../normal-random-generator-kind.enum';
import { GeometricBrownianMotionParameters } from './geometric-brownian-motion-parameters';
import { Enums } from '../../../utils/enums';
import { MatExpansionPanel, MatExpansionPanelHeader, MatExpansionPanelTitle } from '@angular/material/expansion';
import { KatexComponent } from '../../../katex/katex.component';
import { MatFormField, MatHint, MatLabel } from '@angular/material/form-field';
import { FormsModule } from '@angular/forms';
import { MatInput } from '@angular/material/input';
import { MatSelect } from '@angular/material/select';
import { NgFor } from '@angular/common';
import { MatOption } from '@angular/material/core';

@Component({
    selector: 'mb-data-generators-geometric-brownian-motion-parameters',
    templateUrl: './geometric-brownian-motion-parameters.component.html',
    styleUrls: ['./geometric-brownian-motion-parameters.component.scss'],
    imports: [MatExpansionPanel, MatExpansionPanelHeader, MatExpansionPanelTitle, KatexComponent, MatFormField, FormsModule, MatInput, MatHint, MatLabel, MatSelect, NgFor, MatOption]
})
export class GeometricBrownianMotionParametersComponent {
  @Input() geometricBrownianMotionParameters!: GeometricBrownianMotionParameters;

  options: any = {throwOnError: false, strict: true};

  eq1 = 'mid_t=mid_0\\exp((\\mu-\\frac{\\sigma^2}{2})t+\\sigma\\sqrt{dt}\\cdot ng),';
  eq2 = 'mid_0=\\beta+\\frac{\\alpha}{2},';
  eq3 = 'dt=\\frac{1}{L - 1},';
  eq4 = 'mid_t\\ is\\ normalized\\ to\\ [\\beta, \\alpha+\\beta],';
  eq5 = 'sample_t=mid_t+noise_t';

  normalRandomGenerators = Object.keys(NormalRandomGeneratorKind);
  uniformRandomGenerators = Object.keys(UniformRandomGeneratorKind);

  compare = Enums.compare;
}

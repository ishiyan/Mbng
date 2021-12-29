import { Component, Input } from '@angular/core';
import { UniformRandomGeneratorKind } from '../uniform-random-generator-kind.enum';
import { NormalRandomGeneratorKind } from '../normal-random-generator-kind.enum';
import { GeometricBrownianMotionParameters } from './geometric-brownian-motion-parameters';
import { Enums } from '../../../utils/enums';

@Component({
  selector: 'mb-data-generators-geometric-brownian-motion-parameters',
  templateUrl: './geometric-brownian-motion-parameters.component.html',
  styleUrls: ['./geometric-brownian-motion-parameters.component.scss']
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

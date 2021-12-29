import { Component, Input } from '@angular/core';
import { UniformRandomGeneratorKind } from '../uniform-random-generator-kind.enum';
import { NormalRandomGeneratorKind } from '../normal-random-generator-kind.enum';
import { FractionalBrownianMotionParameters } from './fractional-brownian-motion-parameters';
import { FractionalBrownianMotionAlgorithm } from './fractional-brownian-motion-algorithm.enum';
import { Enums } from '../../../utils/enums';

@Component({
  selector: 'mb-data-generators-fractional-brownian-motion-parameters',
  templateUrl: './fractional-brownian-motion-parameters.component.html',
  styleUrls: ['./fractional-brownian-motion-parameters.component.scss']
})
export class FractionalBrownianMotionParametersComponent {
  @Input() fractionalBrownianMotionParameters!: FractionalBrownianMotionParameters;

  options: any = {throwOnError: false, strict: true};

  eq1 = 'mid_t=\\alpha\\cdot fBm_t(H, ng, seed)+\\beta,';
  eq2 = 'sample_t=mid_t+noise_t';

  algorithms = Object.keys(FractionalBrownianMotionAlgorithm);
  normalRandomGenerators = Object.keys(NormalRandomGeneratorKind);
  uniformRandomGenerators = Object.keys(UniformRandomGeneratorKind);

  compare = Enums.compare;
}

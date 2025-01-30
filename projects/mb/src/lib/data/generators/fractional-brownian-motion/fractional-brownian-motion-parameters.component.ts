import { ChangeDetectionStrategy, Component, effect, input } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatFormField, MatHint, MatLabel } from '@angular/material/form-field';
import { MatInput } from '@angular/material/input';
import { MatSelect } from '@angular/material/select';
import { MatOption } from '@angular/material/core';
import { MatExpansionPanel, MatExpansionPanelHeader, MatExpansionPanelTitle } from '@angular/material/expansion';

import { KatexComponent } from '../../../katex/katex.component';
import { Enums } from '../../../utils/enums';
import { UniformRandomGeneratorKind } from '../uniform-random-generator-kind.enum';
import { NormalRandomGeneratorKind } from '../normal-random-generator-kind.enum';
import { FractionalBrownianMotionParameters } from './fractional-brownian-motion-parameters';
import { FractionalBrownianMotionAlgorithm } from './fractional-brownian-motion-algorithm.enum';

@Component({
    selector: 'mb-data-generators-fractional-brownian-motion-parameters',
    templateUrl: './fractional-brownian-motion-parameters.component.html',
    styleUrls: ['./fractional-brownian-motion-parameters.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush,
    imports: [
      FormsModule,
      MatFormField,
      MatHint,
      MatLabel,
      MatInput,
      MatSelect,
      MatOption,
      MatExpansionPanel,
      MatExpansionPanelHeader,
      MatExpansionPanelTitle,
      KatexComponent
    ]
})
export class FractionalBrownianMotionParametersComponent {
  // sawtoothParameters = input.required<FractionalBrownianMotionParameters>();
  fractionalBrownianMotionParameters = input<FractionalBrownianMotionParameters>();
  params: FractionalBrownianMotionParameters = new FractionalBrownianMotionParameters();

  constructor() {
    effect(() => {
      this.params = this.fractionalBrownianMotionParameters() ?? new FractionalBrownianMotionParameters();
    });
  }

  options: any = {throwOnError: false, strict: true};

  eq1 = 'mid_t=\\alpha\\cdot fBm_t(H, ng, seed)+\\beta,';
  eq2 = 'sample_t=mid_t+noise_t';

  algorithms = Object.keys(FractionalBrownianMotionAlgorithm);
  normalRandomGenerators = Object.keys(NormalRandomGeneratorKind);
  uniformRandomGenerators = Object.keys(UniformRandomGeneratorKind);

  compare = Enums.compare;
}

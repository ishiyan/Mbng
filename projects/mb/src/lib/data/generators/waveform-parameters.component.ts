import { ChangeDetectionStrategy, Component, effect, input } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatFormField, MatHint, MatLabel } from '@angular/material/form-field';
import { MatInput } from '@angular/material/input';
import { MatSelect } from '@angular/material/select';
import { MatOption } from '@angular/material/core';
import { MatExpansionPanel, MatExpansionPanelHeader, MatExpansionPanelTitle } from '@angular/material/expansion';

import { Enums } from '../../utils/enums';
import { KatexComponent } from '../../katex/katex.component';
import { UniformRandomGeneratorKind } from './uniform-random-generator-kind.enum';
import { WaveformParameters } from './waveform-parameters';

@Component({
    selector: 'mb-data-generators-waveform-parameters',
    templateUrl: './waveform-parameters.component.html',
    styleUrls: ['./waveform-parameters.component.scss'],
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
export class WaveformParametersComponent {
  waveformParameters = input.required<WaveformParameters>();
  params: WaveformParameters = new WaveformParameters();

  constructor() {
    effect(() => {
      this.params = this.waveformParameters();
    });  
  }

  options: any = {throwOnError: false, strict: true};
  eq1 = 'noise_t=mid_t\\cdot ρ_n\\cdot random(seed)';
  uniformRandomGenerators: string[] = Object.keys(UniformRandomGeneratorKind);
  compare = Enums.compare;
}

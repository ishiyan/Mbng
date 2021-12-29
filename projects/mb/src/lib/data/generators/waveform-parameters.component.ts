import { Component, Input } from '@angular/core';
import { UniformRandomGeneratorKind } from './uniform-random-generator-kind.enum';
import { WaveformParameters } from './waveform-parameters';
import { Enums } from '../../utils/enums';

@Component({
  selector: 'mb-data-generators-waveform-parameters',
  templateUrl: './waveform-parameters.component.html',
  styleUrls: ['./waveform-parameters.component.scss']
})
export class WaveformParametersComponent {
  @Input() waveformParameters!: WaveformParameters;

  options: any = {throwOnError: false, strict: true};

  eq1 = 'noise_t=mid_t\\cdot ρ_n\\cdot random(seed)';

  uniformRandomGenerators: string[] = Object.keys(UniformRandomGeneratorKind);

  compare = Enums.compare;
}

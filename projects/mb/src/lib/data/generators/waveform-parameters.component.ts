import { Component, Input } from '@angular/core';
import { UniformRandomGeneratorKind } from './uniform-random-generator-kind.enum';
import { WaveformParameters } from './waveform-parameters';
import { Enums } from '../../utils/enums';
import { MatExpansionPanel, MatExpansionPanelHeader, MatExpansionPanelTitle } from '@angular/material/expansion';
import { KatexComponent } from '../../katex/katex.component';
import { MatFormField, MatHint, MatLabel } from '@angular/material/form-field';
import { FormsModule } from '@angular/forms';
import { MatInput } from '@angular/material/input';
import { MatSelect } from '@angular/material/select';
import { NgFor } from '@angular/common';
import { MatOption } from '@angular/material/core';

@Component({
    selector: 'mb-data-generators-waveform-parameters',
    templateUrl: './waveform-parameters.component.html',
    styleUrls: ['./waveform-parameters.component.scss'],
    imports: [MatExpansionPanel, MatExpansionPanelHeader, MatExpansionPanelTitle, KatexComponent, MatFormField, FormsModule, MatInput, MatHint, MatLabel, MatSelect, NgFor, MatOption]
})
export class WaveformParametersComponent {
  @Input() waveformParameters!: WaveformParameters;

  options: any = {throwOnError: false, strict: true};

  eq1 = 'noise_t=mid_t\\cdot ρ_n\\cdot random(seed)';

  uniformRandomGenerators: string[] = Object.keys(UniformRandomGeneratorKind);

  compare = Enums.compare;
}

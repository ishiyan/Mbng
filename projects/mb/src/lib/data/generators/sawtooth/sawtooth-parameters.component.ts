import { ChangeDetectionStrategy, Component, effect, input } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatFormField, MatHint, MatLabel } from '@angular/material/form-field';
import { MatInput } from '@angular/material/input';
import { MatSelect } from '@angular/material/select';
import { MatOption } from '@angular/material/core';
import { MatExpansionPanel, MatExpansionPanelHeader, MatExpansionPanelTitle } from '@angular/material/expansion';

import { KatexComponent } from '../../../katex/katex.component';
import { Enums } from '../../../utils/enums';
import { SawtoothParameters } from './sawtooth-parameters';
import { SawtoothShape } from './sawtooth-shape.enum';

@Component({
  selector: 'mb-data-generators-sawtooth-parameters',
  templateUrl: './sawtooth-parameters.component.html',
  styleUrls: ['./sawtooth-parameters.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [MatExpansionPanel, MatExpansionPanelHeader, MatExpansionPanelTitle, KatexComponent, MatFormField, FormsModule, MatInput, MatHint, MatLabel, MatSelect, MatOption]
})
export class SawtoothParametersComponent {
  // sawtoothParameters = input.required<SawtoothParameters>();
  sawtoothParameters = input<SawtoothParameters>();
  params: SawtoothParameters = new SawtoothParameters();

  constructor() {
    effect(() => {
      this.params = this.sawtoothParameters() ?? new SawtoothParameters();
    });
  }

  options: any = {throwOnError: false, strict: true};
  eq1 = 'mid_t=\\alpha\\cdot shape_t\\cdot t+\\beta,';
  eq2 = 'sample_t=mid_t+noise_t';
  sawtoothShapes = Object.keys(SawtoothShape);
  compare = Enums.compare;
}

import { Component, Input } from '@angular/core';
import { SawtoothParameters } from './sawtooth-parameters';
import { SawtoothShape } from './sawtooth-shape.enum';
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
    selector: 'mb-data-generators-sawtooth-parameters',
    templateUrl: './sawtooth-parameters.component.html',
    styleUrls: ['./sawtooth-parameters.component.scss'],
    imports: [MatExpansionPanel, MatExpansionPanelHeader, MatExpansionPanelTitle, KatexComponent, MatFormField, FormsModule, MatInput, MatHint, MatLabel, MatSelect, NgFor, MatOption]
})
export class SawtoothParametersComponent {
  @Input() sawtoothParameters!: SawtoothParameters;

  options: any = {throwOnError: false, strict: true};

  eq1 = 'mid_t=\\alpha\\cdot shape_t\\cdot t+\\beta,';
  eq2 = 'sample_t=mid_t+noise_t';

  sawtoothShapes = Object.keys(SawtoothShape);

  compare = Enums.compare;
}

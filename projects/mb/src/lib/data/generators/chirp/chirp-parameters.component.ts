import { ChangeDetectionStrategy, Component, effect, input } from '@angular/core';
import { NgClass } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MatFormField, MatHint, MatLabel } from '@angular/material/form-field';
import { MatInput } from '@angular/material/input';
import { MatSelect } from '@angular/material/select';
import { MatOption } from '@angular/material/core';
import { MatExpansionPanel, MatExpansionPanelHeader, MatExpansionPanelTitle } from '@angular/material/expansion';
import { ExtendedModule } from '@angular/flex-layout/extended';

import { SvgViewerComponent } from '../../../svg-viewer/svg-viewer.component';
import { KatexComponent } from '../../../katex/katex.component';
import { Enums } from '../../../utils/enums';
import { ChirpParameters } from './chirp-parameters';
import { ChirpSweep } from './chirp-sweep.enum';

@Component({
    selector: 'mb-data-generators-chirp-parameters',
    templateUrl: './chirp-parameters.component.html',
    styleUrls: ['./chirp-parameters.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush,
    imports: [
      NgClass,
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
      SvgViewerComponent,
      ExtendedModule,
      KatexComponent
    ]
})
export class ChirpParametersComponent {
  // chirpParameters = input.required<ChirpParameters>();
  chirpParameters = input<ChirpParameters>();
  params: ChirpParameters = new ChirpParameters();

  constructor() {
    effect(() => {
      this.params = this.chirpParameters() ?? new ChirpParameters();
    });
  }

  options: any = {throwOnError: false, strict: true};

  eq1 = 'mid_t=\\alpha\\cdot\\cos(sweep_t\\cdot t+\\varphi\\cdot\\pi)+\\beta,';
  eq2 = 'sweep_1=\\frac{2\\pi}{\\lambda_1},';
  eq3 = 'sweep_L=\\frac{2\\pi}{\\lambda_L},';
  eq4 = 'sample_t=mid_t+noise_t';

  chirpSweeps = Object.keys(ChirpSweep);

  compare = Enums.compare;
}

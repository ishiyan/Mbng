import { Component, Input } from '@angular/core';
import { ChirpParameters } from './chirp-parameters';
import { ChirpSweep } from './chirp-sweep.enum';
import { Enums } from '../../../utils/enums';

@Component({
  selector: 'mb-data-generators-chirp-parameters',
  templateUrl: './chirp-parameters.component.html',
  styleUrls: ['./chirp-parameters.component.scss']
})
export class ChirpParametersComponent {
  @Input() chirpParameters!: ChirpParameters;

  options: any = {throwOnError: false, strict: true};

  eq1 = 'mid_t=\\alpha\\cdot\\cos(sweep_t\\cdot t+\\varphi\\cdot\\pi)+\\beta,';
  eq2 = 'sweep_1=\\frac{2\\pi}{\\lambda_1},';
  eq3 = 'sweep_L=\\frac{2\\pi}{\\lambda_L},';
  eq4 = 'sample_t=mid_t+noise_t';

  chirpSweeps = Object.keys(ChirpSweep);

  compare = Enums.compare;
}

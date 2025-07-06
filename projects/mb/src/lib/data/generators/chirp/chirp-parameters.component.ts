import { ChangeDetectionStrategy, Component, effect, input, output } from '@angular/core';
import { NgClass } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MatFormField, MatHint, MatLabel } from '@angular/material/form-field';
import { MatInput } from '@angular/material/input';
import { MatSelect } from '@angular/material/select';
import { MatOption } from '@angular/material/core';
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
      SvgViewerComponent,
      ExtendedModule,
      KatexComponent
    ]
})
export class ChirpParametersComponent {
  private initialized = false;

  /** Event emitted when the parameters have been changed by the user. */
  readonly parametersChange = output<ChirpParameters>();

  /** The input parameters for the chirp generator. */
  chirpParameters = input<ChirpParameters>();

  protected options: any = {throwOnError: false, strict: true};
  protected eq1 = 'mid_t=\\beta+\\alpha\\cdot\\cos(sweep_t\\cdot t+\\varphi\\cdot\\pi),';
  protected eq2 = 'sweep_1=2\\pi/ \\lambda_1,';
  protected eq3 = 'sweep_L=2\\pi/ \\lambda_L,';
  protected eq4 = 'sample_t=mid_t+noise_t';
  protected chirpSweeps = Object.keys(ChirpSweep);
  protected compare = Enums.compare;

  protected params: ChirpParameters = {
    chirpSweep: ChirpSweep.LinearPeriod, // chirp sweep shape
    chirpSweepSamples: 256, // sweep samples
    initialPeriod: 128, // initial period
    finalPeriod: 16, // final period
    phaseInPi: 0.0, // phase in π
    amplitude: 100.0, // amplitude
    minimalValue: 10.0, // minimal value
    isBiDirectional: false, // is bi-directional
    noiseAmplitudeFraction: 0.0 // noise amplitude fraction
  };

  constructor() {
    effect(() => {
      const p = this.chirpParameters();
      if (p) {
        this.params = p;
        /*this.chirpSweepParam = p.chirpSweep;
        this.chirpSweepSamplesParam = p.chirpSweepSamples;
        this.initialPeriodParam = p.initialPeriod;
        this.finalPeriodParam = p.finalPeriod;
        this.phaseInPiParam = p.phaseInPi;
        this.amplitudeParam = p.amplitude;
        this.minimalValueParam = p.minimalValue;
        this.isBiDirectionalParam = p.isBiDirectional;
        this.noiseAmplitudeFractionParam = p.noiseAmplitudeFraction;*/
      }
    });
  }

  ngAfterContentInit() {
    this.initialized = true;
    this.notify();
  }

  protected get chirpSweepParam(): ChirpSweep {
    return this.params.chirpSweep;
  }
  protected set chirpSweepParam(value: ChirpSweep) {
    if (this.params.chirpSweep === value) {
      return;
    }

    this.params.chirpSweep = value;
    this.params = { ...this.params };

    this.notify();
  }
  protected chirpSweepChanged(value: ChirpSweep) {
    this.chirpSweepParam = value;
  }

  protected get chirpSweepSamplesParam(): number {
    return this.params.chirpSweepSamples;
  }
  protected set chirpSweepSamplesParam(value: number) {
    if (!value || value < 2) {
      value = 2;
    }
    if (this.params.chirpSweepSamples === value) {
      return;
    }

    this.params.chirpSweepSamples = value;
    this.params = { ...this.params };

    this.notify();
  }
  protected chirpSweepSamplesChanged(value: number) {
    this.chirpSweepSamplesParam = value;
  }

  protected get initialPeriodParam(): number {
    return this.params.initialPeriod;
  }
  protected set initialPeriodParam(value: number) {
    if (!value || value < 2) {
      value = 2;
    }
    if (this.params.initialPeriod === value) {
      return;
    }

    this.params.initialPeriod = value;
    this.params = { ...this.params };

    this.notify();
  }
  protected initialPeriodChanged(value: number) {
    this.initialPeriodParam = value;
  }

  protected get finalPeriodParam(): number {
    return this.params.finalPeriod;
  }
  protected set finalPeriodParam(value: number) {
    if (!value || value < 2) {
      value = 2;
    }
    if (this.params.finalPeriod === value) {
      return;
    }

    this.params.finalPeriod = value;
    this.params = { ...this.params };

    this.notify();
  }
  protected finalPeriodChanged(value: number) {
    this.finalPeriodParam = value;
  }

  protected get phaseInPiParam(): number {
    return this.params.phaseInPi;
  }
  protected set phaseInPiParam(value: number) {
    if (!value || value < 0) {
      value = 0;
    }
    if (value > 1) {
      value = 1;
    }
    if (this.params.phaseInPi === value) {
      return;
    }

    this.params.phaseInPi = value;
    this.params = { ...this.params };

    this.notify();
  }
  protected phaseInPiChanged(value: number) {
    this.phaseInPiParam = value;
  }

  protected get amplitudeParam(): number {
    return this.params.amplitude;
  }
  protected set amplitudeParam(value: number) {
    if (this.params.amplitude === value) {
      return;
    }

    this.params.amplitude = value;
    this.params = { ...this.params };

    this.notify();
  }
  protected amplitudeChanged(value: number) {
    this.amplitudeParam = value;
  }

  protected get minimalValueParam(): number {
    return this.params.minimalValue;
  }
  protected set minimalValueParam(value: number) {
    if (this.params.minimalValue === value) {
      return;
    }

    this.params.minimalValue = value;
    this.params = { ...this.params };

    this.notify();
  }
  protected minimalValueChanged(value: number) {
    this.minimalValueParam = value;
  }

  protected get isBiDirectionalParam(): boolean {
    return this.params.isBiDirectional;
  }
  protected set isBiDirectionalParam(value: boolean) {
    if (this.params.isBiDirectional === value) {
      return;
    }

    this.params.isBiDirectional = value;
    this.params = { ...this.params };

    this.notify();
  }
  protected isBiDirectionalChanged(value: boolean) {
    this.isBiDirectionalParam = value;
  }

  protected get noiseAmplitudeFractionParam(): number {
    return this.params.noiseAmplitudeFraction;
  }
  protected set noiseAmplitudeFractionParam(value: number) {
    if (this.params.noiseAmplitudeFraction === value) {
      return;
    }

    this.params.noiseAmplitudeFraction = value;
    this.params = { ...this.params };

    this.notify();
  }
  protected noiseAmplitudeFractionChanged(value: number) {
    this.noiseAmplitudeFractionParam = value;
  }

  private notify() {
    if (this.initialized) {
      this.parametersChange.emit(this.params);
    }
  }
}

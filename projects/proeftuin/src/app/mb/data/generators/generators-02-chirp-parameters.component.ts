import { ChangeDetectionStrategy, Component } from '@angular/core';
import { JsonPipe } from '@angular/common';
import { MatCard, MatCardHeader, MatCardTitle, MatCardContent } from '@angular/material/card';

import { ChirpParameters } from 'projects/mb/src/lib/data/generators/chirp/chirp-parameters';
import { ChirpParametersComponent } from 'projects/mb/src/lib/data/generators/chirp/chirp-parameters.component';
import { Scalar } from 'projects/mb/src/lib/data/entities/scalar';
import { ChirpGenerator, createChirpGenerator } from 'projects/mb/src/lib/data/generators/chirp/chirp-generator';
import { LineConfiguration } from 'projects/mb/src/lib/charts/line-configuration.interface';
import { MultilineComponent } from 'projects/mb/src/lib/charts/multiline/multiline.component';

@Component({
  selector: 'app-mb-data-generators-02-chirp-parameters',
  templateUrl: './generators-02-chirp-parameters.component.html',
  styleUrls: ['./generators-02-chirp-parameters.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [
    JsonPipe,
    MatCard,
    MatCardHeader,
    MatCardTitle,
    MatCardContent,
    ChirpParametersComponent,
    MultilineComponent
  ]
})
export class Generators02ChirpParametersComponent {
  protected current = new ChirpParameters();
  protected initial = new ChirpParameters();

  protected paramsChanged(params: ChirpParameters) {
    this.current = params;
    this.data = this.generate(params);
  }

  protected readonly configLine: LineConfiguration = { fillColor: undefined, strokeColor: 'steelblue', strokeWidth: 1 };
  protected moniker = '';
  protected data: Scalar[] = this.generate(this.initial);

  private generate(p: ChirpParameters): Scalar[] {
    const gen = createChirpGenerator(p);
    this.moniker = gen.moniker;
    return this.generateChirp(gen, 2);
  }
  
  private generateChirp(gen: ChirpGenerator, n: number): Scalar[] {
    const s: Scalar[] = [];
    let t = new Date(2020, 0, 1);
    for (let i = 0; i < gen.sweepSamples * n; i++) {
      t = new Date(t.getTime() + 1000*3600*24); // increment by 1 day

      // Skip weekends: if Saturday (6) or Sunday (0), advance to Monday
      const dow = t.getDay();
      if (dow === 0) { // Sunday
        t = new Date(t.getTime() + 1000*3600*24); // advance 1 more day to Monday
      } else if (dow === 6) { // Saturday
        t = new Date(t.getTime() + 2*1000*3600*24); // advance 2 more days to Monday
      }

      s.push({ time: t, value: gen.nextSample() });
    }

    return s;
  }
}

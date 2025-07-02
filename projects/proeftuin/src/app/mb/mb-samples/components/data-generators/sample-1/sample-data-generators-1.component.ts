import { ChangeDetectionStrategy, Component } from '@angular/core';
import { MatCard, MatCardHeader, MatCardTitle, MatCardContent } from '@angular/material/card';

import { Scalar } from 'projects/mb/src/lib/data/entities/scalar';
import { ChirpGenerator } from 'projects/mb/src/lib/data/generators/chirp/chirp-generator';
import { ChirpSweep } from 'projects/mb/src/lib/data/generators/chirp/chirp-sweep.enum';
import { LineConfiguration } from 'projects/mb/src/lib/charts/line-configuration.interface';
import { MultilineComponent } from 'projects/mb/src/lib/charts/multiline/multiline.component';

@Component({
  selector: 'app-sample-data-generators-1',
  templateUrl: './sample-data-generators-1.component.html',
  styleUrls: ['./sample-data-generators-1.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [
    MatCard,
    MatCardHeader,
    MatCardTitle,
    MatCardContent,
    MultilineComponent
  ]
})
export class SampleDataGenerators1Component {
  protected selected1 = '';
  protected selected2 = '';
  protected selected3 = '';

  protected scalarsMoniker = '';
  protected scalars = [this.generateChirp()];
  protected readonly configLine: LineConfiguration = { fillColor: undefined, strokeColor: 'steelblue', strokeWidth: 1 };

  private generateChirp(): Scalar[] {
    const gen = new ChirpGenerator(
      ChirpSweep.LinearPeriod,
      128, // sweep samples
      128, // initial period
      16, // final period
      0.0, // phase in π
      100.0, // amplitude
      10.0, // minimal value
      false, // is bi-directional
      0.0 // noise amplitude fraction
    );

    this.scalarsMoniker = gen.moniker;
    const s: Scalar[] = [];
    let t = new Date(2020, 0, 1);
    for (let i = 0; i < 512; i++) {
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

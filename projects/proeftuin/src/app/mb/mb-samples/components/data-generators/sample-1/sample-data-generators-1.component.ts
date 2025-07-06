import { ChangeDetectionStrategy, Component } from '@angular/core';
import { MatCard, MatCardHeader, MatCardTitle, MatCardContent } from '@angular/material/card';

import { Scalar } from 'projects/mb/src/lib/data/entities/scalar';
import { ChirpGenerator } from 'projects/mb/src/lib/data/generators/chirp/chirp-generator';
import { ChirpSweep } from 'projects/mb/src/lib/data/generators/chirp/chirp-sweep.enum';
import { LineConfiguration } from 'projects/mb/src/lib/charts/line-configuration.interface';
import { MultilineComponent } from 'projects/mb/src/lib/charts/multiline/multiline.component';

const sweepRepeatCount = 3; // Number of times to repeat the sweep in the generated data

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
  protected readonly configLine: LineConfiguration = { fillColor: undefined, strokeColor: 'steelblue', strokeWidth: 1 };

  protected linPerUniMoniker = '';
  protected linPerUni = [this.linPerUniGen()];

  private linPerUniGen(): Scalar[] {
    const gen = new ChirpGenerator(
      ChirpSweep.LinearPeriod,
      256, // sweep samples
      128, // initial period
      16, // final period
      0.0, // phase in π
      100.0, // amplitude
      10.0, // minimal value
      false, // is bi-directional
      0.0 // noise amplitude fraction
    );

    this.linPerUniMoniker = gen.moniker;
    return this.generateChirp(gen, sweepRepeatCount);
  }

  protected linPerBiMoniker = '';
  protected linPerBi = [this.linPerBiGen()];

  private linPerBiGen(): Scalar[] {
    const gen = new ChirpGenerator(
      ChirpSweep.LinearPeriod,
      256, // sweep samples
      128, // initial period
      16, // final period
      0.0, // phase in π
      100.0, // amplitude
      10.0, // minimal value
      true, // is bi-directional
      0.0 // noise amplitude fraction
    );

    this.linPerBiMoniker = gen.moniker;
    return this.generateChirp(gen, sweepRepeatCount);
  }

  protected quadPerUniMoniker = '';
  protected quadPerUni = [this.quadPerUniGen()];

  private quadPerUniGen(): Scalar[] {
    const gen = new ChirpGenerator(
      ChirpSweep.QuadraticPeriod,
      256, // sweep samples
      128, // initial period
      16, // final period
      0.0, // phase in π
      100.0, // amplitude
      10.0, // minimal value
      false, // is bi-directional
      0.0 // noise amplitude fraction
    );

    this.quadPerUniMoniker = gen.moniker;
    return this.generateChirp(gen, sweepRepeatCount);
  }

  protected quadPerBiMoniker = '';
  protected quadPerBi = [this.quadPerBiGen()];

  private quadPerBiGen(): Scalar[] {
    const gen = new ChirpGenerator(
      ChirpSweep.QuadraticPeriod,
      256, // sweep samples
      128, // initial period
      16, // final period
      0.0, // phase in π
      100.0, // amplitude
      10.0, // minimal value
      true, // is bi-directional
      0.0 // noise amplitude fraction
    );

    this.quadPerBiMoniker = gen.moniker;
    return this.generateChirp(gen, sweepRepeatCount);
  }

  protected logPerUniMoniker = '';
  protected logPerUni = [this.logPerUniGen()];

  private logPerUniGen(): Scalar[] {
    const gen = new ChirpGenerator(
      ChirpSweep.LogarithmicPeriod,
      256, // sweep samples
      128, // initial period
      16, // final period
      0.0, // phase in π
      100.0, // amplitude
      10.0, // minimal value
      false, // is bi-directional
      0.0 // noise amplitude fraction
    );

    this.logPerUniMoniker = gen.moniker;
    return this.generateChirp(gen, sweepRepeatCount);
  }

  protected logPerBiMoniker = '';
  protected logPerBi = [this.logPerBiGen()];

  private logPerBiGen(): Scalar[] {
    const gen = new ChirpGenerator(
      ChirpSweep.LogarithmicPeriod,
      256, // sweep samples
      128, // initial period
      16, // final period
      0.0, // phase in π
      100.0, // amplitude
      10.0, // minimal value
      true, // is bi-directional
      0.0 // noise amplitude fraction
    );

    this.logPerBiMoniker = gen.moniker;
    return this.generateChirp(gen, sweepRepeatCount);
  }
  
  // Frequencies

  protected linFreqUniMoniker = '';
  protected linFreqUni = [this.linFreqUniGen()];

  private linFreqUniGen(): Scalar[] {
    const gen = new ChirpGenerator(
      ChirpSweep.LinearFrequency,
      256, // sweep samples
      128, // initial period
      16, // final period
      0.0, // phase in π
      100.0, // amplitude
      10.0, // minimal value
      false, // is bi-directional
      0.0 // noise amplitude fraction
    );

    this.linFreqUniMoniker = gen.moniker;
    return this.generateChirp(gen, sweepRepeatCount);
  }

  protected linFreqBiMoniker = '';
  protected linFreqBi = [this.linFreqBiGen()];

  private linFreqBiGen(): Scalar[] {
    const gen = new ChirpGenerator(
      ChirpSweep.LinearFrequency,
      256, // sweep samples
      128, // initial period
      16, // final period
      0.0, // phase in π
      100.0, // amplitude
      10.0, // minimal value
      true, // is bi-directional
      0.0 // noise amplitude fraction
    );

    this.linFreqBiMoniker = gen.moniker;
    return this.generateChirp(gen, sweepRepeatCount);
  }
  
  protected quadFreqUniMoniker = '';
  protected quadFreqUni = [this.quadFreqUniGen()];

  private quadFreqUniGen(): Scalar[] {
    const gen = new ChirpGenerator(
      ChirpSweep.QuadraticFrequency,
      256, // sweep samples
      128, // initial period
      16, // final period
      0.0, // phase in π
      100.0, // amplitude
      10.0, // minimal value
      false, // is bi-directional
      0.0 // noise amplitude fraction
    );

    this.quadFreqUniMoniker = gen.moniker;
    return this.generateChirp(gen, sweepRepeatCount);
  }
  
  protected quadFreqBiMoniker = '';
  protected quadFreqBi = [this.quadFreqBiGen()];

  private quadFreqBiGen(): Scalar[] {
    const gen = new ChirpGenerator(
      ChirpSweep.QuadraticFrequency,
      256, // sweep samples
      128, // initial period
      16, // final period
      0.0, // phase in π
      100.0, // amplitude
      10.0, // minimal value
      true, // is bi-directional
      0.0 // noise amplitude fraction
    );

    this.quadFreqBiMoniker = gen.moniker;
    return this.generateChirp(gen, sweepRepeatCount);
  }
  
  protected logFreqUniMoniker = '';
  protected logFreqUni = [this.logFreqUniGen()];

  private logFreqUniGen(): Scalar[] {
    const gen = new ChirpGenerator(
      ChirpSweep.LogarithmicFrequency,
      256, // sweep samples
      128, // initial period
      16, // final period
      0.0, // phase in π
      100.0, // amplitude
      10.0, // minimal value
      false, // is bi-directional
      0.0 // noise amplitude fraction
    );

    this.logFreqUniMoniker = gen.moniker;
    return this.generateChirp(gen, sweepRepeatCount);
  }
  
  protected logFreqBiMoniker = '';
  protected logFreqBi = [this.logFreqBiGen()];

  private logFreqBiGen(): Scalar[] {
    const gen = new ChirpGenerator(
      ChirpSweep.LogarithmicFrequency,
      256, // sweep samples
      128, // initial period
      16, // final period
      0.0, // phase in π
      100.0, // amplitude
      10.0, // minimal value
      true, // is bi-directional
      0.0 // noise amplitude fraction
    );

    this.logFreqBiMoniker = gen.moniker;
    return this.generateChirp(gen, sweepRepeatCount);
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

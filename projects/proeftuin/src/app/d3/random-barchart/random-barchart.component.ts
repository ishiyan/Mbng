import { ChangeDetectionStrategy, ChangeDetectorRef, Component, effect, inject } from '@angular/core';

import { BarchartComponent } from './barchart/barchart.component';

@Component({
  selector: 'app-d3-random-barchart',
  templateUrl: './random-barchart.component.html',
  styleUrls: ['./random-barchart.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [BarchartComponent]
})
export class RandomBarchartComponent {
  private readonly cdr = inject(ChangeDetectorRef);
  public chartData!: Array<any>;

  constructor() {
    effect(() => {
      this.generateData();
    });
  }

  generateData() {
    this.chartData = [];
    for (let i = 0; i < (8 + Math.floor(Math.random() * 50)); ++i) {
      this.chartData.push([
        `${i}`,
        Math.floor(Math.random() * 100)
      ]);
    }
    this.cdr.markForCheck();
    setTimeout(() => {
      this.generateData();
    }, 3000);
  }
}

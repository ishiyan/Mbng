import { ChangeDetectionStrategy, Component } from '@angular/core';
import { MatCard, MatCardHeader, MatCardTitle, MatCardContent, MatCardSubtitle } from '@angular/material/card';
import { MatGridList, MatGridTile } from '@angular/material/grid-list';

import { FrequencyResponse, SimpleMovingAverage } from 'projects/mb/src/public-api';
import { FrequencyResponseChartComponent } from 'projects/mb/src/lib/charts/frequency-response-chart/frequency-response-chart.component';

const sl = 2048;

@Component({
  selector: 'app-mb-frequency-response-01-features',
  templateUrl: './frequency-response-01-features.component.html',
  styleUrls: ['./frequency-response-01-features.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [
    MatCard,
    MatCardHeader,
    MatCardTitle,
    MatCardContent,
    MatCardSubtitle,
    MatGridList,
    MatGridTile,
    FrequencyResponseChartComponent
  ]
})
export class FrequencyResponse01FeaturesComponent {
  protected readonly sma2 = FrequencyResponse.calculate(sl, new SimpleMovingAverage({ length: 2}), 4);
  protected readonly sma3 = FrequencyResponse.calculate(sl, new SimpleMovingAverage({ length: 3}), 6);
  protected readonly sma4 = FrequencyResponse.calculate(sl, new SimpleMovingAverage({ length: 4}), 8);
  protected readonly sma5 = FrequencyResponse.calculate(sl, new SimpleMovingAverage({ length: 5}), 10);
  protected readonly sma6 = FrequencyResponse.calculate(sl, new SimpleMovingAverage({ length: 6}), 12);
  protected readonly sma7 = FrequencyResponse.calculate(sl, new SimpleMovingAverage({ length: 7}), 14);
  protected readonly sma20 = FrequencyResponse.calculate(sl, new SimpleMovingAverage({ length: 20}), 40, 43);
}

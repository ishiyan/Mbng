import { ChangeDetectionStrategy, Component } from '@angular/core';
import { MatCard, MatCardHeader, MatCardTitle, MatCardContent, MatCardSubtitle } from '@angular/material/card';

import { SparklineComponent } from 'projects/mb/src/lib/charts/sparkline/sparkline.component';

import { testDataOhlcv } from '../../../test-data/indicators/test-data-ohlcv';
import { testDataBbBw } from '../../../test-data/indicators/test-data-bb-bw';
import { testDataBbMa } from '../../../test-data/indicators/test-data-bb-ma';

@Component({
  selector: 'app-sample-sparkline-1',
  templateUrl: './sample-sparkline-1.component.html',
  styleUrls: ['./sample-sparkline-1.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [
    MatCard,
    MatCardHeader,
    MatCardTitle,
    MatCardContent,
    MatCardSubtitle,
    SparklineComponent
  ]
})
export class SampleSparkline1Component {
  protected readonly dataOhlcv = testDataOhlcv;
  protected readonly dataScalar = testDataBbBw;
  protected readonly dataScalarWithNaN = testDataBbMa;
}

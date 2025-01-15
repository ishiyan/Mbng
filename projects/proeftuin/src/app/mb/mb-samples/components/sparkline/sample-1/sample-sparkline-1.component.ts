import { Component } from '@angular/core';

import { SparklineConfiguration } from 'projects/mb/src/lib/charts/sparkline/sparkline-configuration.interface';

import { testDataOhlcv } from '../../../test-data/indicators/test-data-ohlcv';
import { testDataBbBw } from '../../../test-data/indicators/test-data-bb-bw';
import { testDataBbMa } from '../../../test-data/indicators/test-data-bb-ma';
import { MatCard, MatCardHeader, MatCardTitle, MatCardContent, MatCardSubtitle } from '@angular/material/card';

import { SparklineComponent } from '../../../../../../../../mb/src/lib/charts/sparkline/sparkline.component';

@Component({
    selector: 'app-sample-sparkline-1',
    templateUrl: './sample-sparkline-1.component.html',
    styleUrls: ['./sample-sparkline-1.component.scss'],
    imports: [MatCard, MatCardHeader, MatCardTitle, MatCardContent, SparklineComponent, MatCardSubtitle]
})
export class SampleSparkline1Component {

  dataOhlcv = testDataOhlcv;
  dataScalar = testDataBbBw;
  dataScalarWithNaN = testDataBbMa;

  readonly configLine: SparklineConfiguration = { fillColor: undefined, strokeColor: 'steelblue', strokeWidth: 1 };
  readonly configFill: SparklineConfiguration = { fillColor: 'steelblue', strokeColor: undefined, strokeWidth: 1 };
}

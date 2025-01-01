import { Component } from '@angular/core';

import { SparklineConfiguration } from 'projects/mb/src/lib/charts/sparkline/sparkline-configuration.interface';

import { testDataOhlcv } from '../../../test-data/indicators/test-data-ohlcv';
import { testDataBbBw } from '../../../test-data/indicators/test-data-bb-bw';
import { testDataBbMa } from '../../../test-data/indicators/test-data-bb-ma';

@Component({
    selector: 'app-sample-sparkline-1',
    templateUrl: './sample-sparkline-1.component.html',
    styleUrls: ['./sample-sparkline-1.component.scss'],
    standalone: false
})
export class SampleSparkline1Component {

  dataOhlcv = testDataOhlcv;
  dataScalar = testDataBbBw;
  dataScalarWithNaN = testDataBbMa;

  readonly configLine: SparklineConfiguration = { fillColor: undefined, strokeColor: 'steelblue', strokeWidth: 1 };
  readonly configFill: SparklineConfiguration = { fillColor: 'steelblue', strokeColor: undefined, strokeWidth: 1 };
}

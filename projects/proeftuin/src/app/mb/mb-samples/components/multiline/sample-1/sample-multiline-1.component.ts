import { Component } from '@angular/core';

import { LineConfiguration } from 'projects/mb/src/lib/charts/line-configuration.interface';

import { testDataOhlcv } from '../../../test-data/indicators/test-data-ohlcv';
import { testDataBbBw } from '../../../test-data/indicators/test-data-bb-bw';
import { testDataBbPercentB } from '../../../test-data/indicators/test-data-bb-percentb';
import { testDataBbMa } from '../../../test-data/indicators/test-data-bb-ma';
import { testDataBbLo } from '../../../test-data/indicators/test-data-bb-lo';
import { testDataBbUp } from '../../../test-data/indicators/test-data-bb-up';

@Component({
  selector: 'app-sample-multiline-1',
  templateUrl: './sample-multiline-1.component.html',
  styleUrls: ['./sample-multiline-1.component.scss']
})
export class SampleMultiline1Component {

  dataOhlcv = testDataOhlcv;
  dataScalarBw = testDataBbBw;
  dataScalarPercentB = testDataBbPercentB;
  dataScalarMa = testDataBbMa;
  dataScalarLo = testDataBbLo;
  dataScalarUp = testDataBbUp;

  readonly priceMa = [this.dataOhlcv, this.dataScalarMa];
  readonly priceMaLoUp = [this.dataOhlcv, this.dataScalarMa, this.dataScalarLo, this.dataScalarUp];
  readonly upMaLoPrice = [this.dataScalarUp, this.dataScalarMa, this.dataScalarLo, this.dataOhlcv];
  readonly bwPercentB = [this.dataScalarBw, this.dataScalarPercentB];

  readonly configLine: LineConfiguration = { fillColor: undefined, strokeColor: 'steelblue', strokeWidth: 1 };
  readonly configFill: LineConfiguration = { fillColor: 'steelblue', strokeColor: undefined, strokeWidth: 1 };

  /** colors from d3.scale-chromatic category10 palette */
  readonly category10Lines: LineConfiguration[] = [
    { fillColor: undefined, strokeColor: '#1f77b4', strokeWidth: 1 },
    { fillColor: undefined, strokeColor: '#ff7f0e', strokeWidth: 1 },
    { fillColor: undefined, strokeColor: '#2ca02c', strokeWidth: 1 },
    { fillColor: undefined, strokeColor: '#d62728', strokeWidth: 1 },
    { fillColor: undefined, strokeColor: '#9467bd', strokeWidth: 1 },
    { fillColor: undefined, strokeColor: '#8c564b', strokeWidth: 1 },
    { fillColor: undefined, strokeColor: '#e377c2', strokeWidth: 1 },
    { fillColor: undefined, strokeColor: '#7f7f7f', strokeWidth: 1 },
    { fillColor: undefined, strokeColor: '#bcbd22', strokeWidth: 1 },
    { fillColor: undefined, strokeColor: '#17becf', strokeWidth: 1 }
  ];

  /** colors from d3.scale-chromatic category10 palette */
  readonly category10Areas: LineConfiguration[] = [
    { fillColor: '#1f77b4', strokeColor: undefined, strokeWidth: 1 },
    { fillColor: '#ff7f0e', strokeColor: undefined, strokeWidth: 1 },
    { fillColor: '#2ca02c', strokeColor: undefined, strokeWidth: 1 },
    { fillColor: '#d62728', strokeColor: undefined, strokeWidth: 1 },
    { fillColor: '#9467bd', strokeColor: undefined, strokeWidth: 1 },
    { fillColor: '#8c564b', strokeColor: undefined, strokeWidth: 1 },
    { fillColor: '#e377c2', strokeColor: undefined, strokeWidth: 1 },
    { fillColor: '#7f7f7f', strokeColor: undefined, strokeWidth: 1 },
    { fillColor: '#bcbd22', strokeColor: undefined, strokeWidth: 1 },
    { fillColor: '#17becf', strokeColor: undefined, strokeWidth: 1 }
  ];
}

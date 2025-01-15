import { Component } from '@angular/core';

import { LineConfiguration } from 'projects/mb/src/lib/charts/line-configuration.interface';

import { testDataOhlcv } from '../../../test-data/indicators/test-data-ohlcv';
import { testDataBbBw } from '../../../test-data/indicators/test-data-bb-bw';
import { testDataBbPercentB } from '../../../test-data/indicators/test-data-bb-percentb';
import { testDataBbMa } from '../../../test-data/indicators/test-data-bb-ma';
import { testDataBbLo } from '../../../test-data/indicators/test-data-bb-lo';
import { testDataBbUp } from '../../../test-data/indicators/test-data-bb-up';
import { MatCard, MatCardHeader, MatCardTitle, MatCardContent, MatCardSubtitle } from '@angular/material/card';

import { StacklineComponent } from '../../../../../../../../mb/src/lib/charts/stackline/stackline.component';

@Component({
    selector: 'app-sample-stackline-1',
    templateUrl: './sample-stackline-1.component.html',
    styleUrls: ['./sample-stackline-1.component.scss'],
    imports: [MatCard, MatCardHeader, MatCardTitle, MatCardContent, StacklineComponent, MatCardSubtitle]
})
export class SampleStackline1Component {

  dataOhlcv = testDataOhlcv;
  dataScalarBw = testDataBbBw;
  dataScalarPercentB = testDataBbPercentB;
  dataScalarMa = testDataBbMa;
  dataScalarLo = testDataBbLo;
  dataScalarUp = testDataBbUp;

  readonly priceMaLoUp = [this.dataOhlcv, this.dataScalarMa, this.dataScalarLo, this.dataScalarUp];
  readonly maLoUp = [this.dataScalarMa, this.dataScalarLo, this.dataScalarUp];
  readonly bwPercentB = [this.dataScalarBw, this.dataScalarPercentB];

  readonly lines2: LineConfiguration[] = [
    { fillColor: undefined, strokeColor: '#5C849F', strokeWidth: 1 },
    { fillColor: undefined, strokeColor: '#93B2C1', strokeWidth: 1 },
    { fillColor: undefined, strokeColor: '#6BAEA7', strokeWidth: 1 },
    { fillColor: undefined, strokeColor: '#78A9BE', strokeWidth: 1 }
  ];

  readonly areas2: LineConfiguration[] = [
    { fillColor: '#5C849F', strokeColor: undefined, strokeWidth: 1 },
    { fillColor: '#93B2C1', strokeColor: undefined, strokeWidth: 1 },
    { fillColor: '#6BAEA7', strokeColor: undefined, strokeWidth: 1 },
    { fillColor: '#73C0DC', strokeColor: undefined, strokeWidth: 1 }
  ];

  readonly lines: LineConfiguration[] = [
    { fillColor: undefined, strokeColor: '#31B9B0', strokeWidth: 1 },
    { fillColor: undefined, strokeColor: '#5AF0BC', strokeWidth: 1 },
    { fillColor: undefined, strokeColor: '#32D2BA', strokeWidth: 1 },
    { fillColor: undefined, strokeColor: '#26BBBE', strokeWidth: 1 },
    { fillColor: undefined, strokeColor: '#32BEA1', strokeWidth: 1 }
  ];

  readonly areas: LineConfiguration[] = [
    { fillColor: '#31B9B0', strokeColor: undefined, strokeWidth: 1 },
    { fillColor: '#5AF0BC', strokeColor: undefined, strokeWidth: 1 },
    { fillColor: '#32D2BA', strokeColor: undefined, strokeWidth: 1 },
    { fillColor: '#26BBBE', strokeColor: undefined, strokeWidth: 1 },
    { fillColor: '#32BEA1', strokeColor: undefined, strokeWidth: 1 }
  ];
}

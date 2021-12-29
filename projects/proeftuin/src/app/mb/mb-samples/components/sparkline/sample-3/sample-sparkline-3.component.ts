import { Component } from '@angular/core';

import { SparklineConfiguration } from 'projects/mb/src/lib/charts/sparkline/sparkline-configuration.interface';

import { Ohlcv } from 'projects/mb/src/lib/data/entities/ohlcv';
import { Quote } from 'projects/mb/src/lib/data/entities/quote';
import { Trade } from 'projects/mb/src/lib/data/entities/trade';
import { Scalar } from 'projects/mb/src/lib/data/entities/scalar';

import { testDataOhlcv } from '../../../test-data/indicators/test-data-ohlcv';
import { testDataBbBw } from '../../../test-data/indicators/test-data-bb-bw';
import { testDataBbMa } from '../../../test-data/indicators/test-data-bb-ma';

interface DataItem {
  data: Ohlcv[] | Quote[] | Trade[] | Scalar[];
  name: string;
}

@Component({
  selector: 'mb-sample-sparkline-3',
  templateUrl: './sample-sparkline-3.component.html',
  styleUrls: ['./sample-sparkline-3.component.scss']
})
export class SampleSparkline3Component {

  dataOhlcv = testDataOhlcv;
  dataScalar = testDataBbBw;
  dataScalarWithNaN = testDataBbMa;

  readonly dataArray: DataItem[] = [
    { data: this.dataOhlcv, name: 'ohlcv data' },
    { data: this.dataScalar, name: 'scalar data' },
    { data: this.dataScalarWithNaN, name: 'scalar data with NaN' }
  ];
  arrayItemsSelected1 = [ {data: this.dataOhlcv, name: 'ohlcv data'} ];
  arrayItemsSelected2 = [ {data: this.dataOhlcv, name: 'ohlcv data'} ];
  arrayItemsSelected3 = [ {data: this.dataOhlcv, name: 'ohlcv data'} ];
  arrayItemsSelected4 = [ {data: this.dataOhlcv, name: 'ohlcv data'} ];
  arrayItemsSelected5 = [ {data: this.dataOhlcv, name: 'ohlcv data'} ];
  arrayItemsSelected6 = [ {data: this.dataOhlcv, name: 'ohlcv data'} ];
  arrayItemsSelected7 = [ {data: this.dataOhlcv, name: 'ohlcv data'} ];

  readonly configLine: SparklineConfiguration = { fillColor: undefined, strokeColor: 'steelblue', strokeWidth: 1 };
  readonly configFill: SparklineConfiguration = { fillColor: 'steelblue', strokeColor: undefined, strokeWidth: 1 };
  arrayItemIsLine1 = false;
  arrayItemIsLine2 = false;
  arrayItemIsLine3 = false;
  arrayItemIsLine4 = false;
  arrayItemIsLine5 = false;
  arrayItemIsLine6 = false;
  arrayItemIsLine7 = false;

  compareFunction = (item1: any, item2: any) => item1.data === item2.data;

  itemIsLineChanged1(event: any) {
    const value = event.value === 'true';
    this.arrayItemIsLine1 = value;
  }

  itemIsLineChanged2(event: any) {
    const value = event.value === 'true';
    this.arrayItemIsLine2 = value;
  }

  itemIsLineChanged3(event: any) {
    const value = event.value === 'true';
    this.arrayItemIsLine3 = value;
  }

  itemIsLineChanged4(event: any) {
    const value = event.value === 'true';
    this.arrayItemIsLine4 = value;
  }

  itemIsLineChanged5(event: any) {
    const value = event.value === 'true';
    this.arrayItemIsLine5 = value;
  }

  itemIsLineChanged6(event: any) {
    const value = event.value === 'true';
    this.arrayItemIsLine6 = value;
  }

  itemIsLineChanged7(event: any) {
    const value = event.value === 'true';
    this.arrayItemIsLine7 = value;
  }
}

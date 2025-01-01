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

interface DataGroup {
  disabled?: boolean;
  name: string;
  items: DataItem[];
}

@Component({
    selector: 'app-sample-sparkline-2',
    templateUrl: './sample-sparkline-2.component.html',
    styleUrls: ['./sample-sparkline-2.component.scss'],
    standalone: false
})
export class SampleSparkline2Component {

  dataOhlcv = testDataOhlcv;
  dataScalar = testDataBbBw;
  dataScalarWithNaN = testDataBbMa;

  readonly dataArray: DataItem[] = [
    { data: this.dataOhlcv, name: 'ohlcv data' },
    { data: this.dataScalar, name: 'scalar data' },
    { data: this.dataScalarWithNaN, name: 'scalar data with NaN' }
  ];
  arrayItemFixed: DataItem = this.dataArray[0];
  arrayItem: DataItem = this.dataArray[0];

  readonly dataGroups: DataGroup[] = [
    {
      name: 'Ohlcv group',
      items: [this.dataArray[0]]
    },
    {
      name: 'Scalar group',
      items: [this.dataArray[1], this.dataArray[2]]
    },
    {
      disabled: true,
      name: 'Quote group',
      items: [{data: [], name: 'some name'}]
    },
  ];
  groupItemFixed: DataItem = this.dataGroups[0].items[0];
  groupItem: DataItem = this.dataGroups[0].items[0];

  readonly configLine: SparklineConfiguration = { fillColor: undefined, strokeColor: 'steelblue', strokeWidth: 1 };
  readonly configFill: SparklineConfiguration = { fillColor: 'steelblue', strokeColor: undefined, strokeWidth: 1 };
  arrayItemIsLineFixed = false;
  groupItemIsLineFixed = false;
  arrayItemIsLine = false;
  groupItemIsLine = false;

  itemIsLineChangedFixed(isGroup: boolean, event: any) {
    const value = event.value === 'true';
    if (isGroup) {
      this.groupItemIsLineFixed = value;
    } else {
      this.arrayItemIsLineFixed = value;
    }
  }

  itemIsLineChanged(isGroup: boolean, event: any) {
    const value = event.value === 'true';
    if (isGroup) {
      this.groupItemIsLine = value;
    } else {
      this.arrayItemIsLine = value;
    }
  }
}

import { Component } from '@angular/core';

import { Bar } from 'mb';
import { Scalar } from 'mb';
import { Configuration } from 'mb';
import { LineData } from 'mb';
import { SimpleMovingAverage } from 'mb';

import { BarSeries } from '../../../shared/data/bar-series/bar-series.interface';
import { simpleMovingAverage } from '../../../notes';

const deepCopy = (obj: any): any => {
  // Handle the 3 simple types, and null or undefined.
  if (null == obj || 'object' !== typeof obj) {
    return obj;
  }
  // Handle Date.
  if (obj instanceof Date) {
    const copy = new Date();
    copy.setTime(obj.getTime());
    return copy;
  }
  // Handle Array.
  if (obj instanceof Array) {
    const copy = [];
    for (let i = 0, len = obj.length; i < len; i++) {
      copy[i] = deepCopy(obj[i]);
    }
    return copy;
  }
  // Handle Object.
  if (obj instanceof Object) {
    const copy: any = {};
    for (const attr of Object.keys(obj)) {
      copy[attr] = deepCopy(obj[attr]);
    }
    return copy;
  }
  throw new Error('Unable to copy obj! Its type isn\'t supported.');
}

const calculateSma = (bars: Bar[], sma: SimpleMovingAverage): Scalar[]  => {  
  const scalars: Scalar[] = [];
  for (let i =0; i < bars.length; i++) {
    const bar = bars[i];
    scalars.push({time: bar.time, value: sma.update(bar.close)});
  }

  return scalars;
}

@Component({
  selector: 'app-ind-sma',
  templateUrl: './sma.component.html',
  styleUrls: ['./sma.component.scss']
})
export class SmaComponent {
  protected sma = simpleMovingAverage;
  protected dataSelection!: BarSeries;
  protected configuration!: Configuration;

  protected dataSelectionChanged(barSeries: BarSeries) {
    const cloned = deepCopy(this.configTemplate) as Configuration;
    const indicator = new SimpleMovingAverage(5);
    cloned.ohlcv.name = barSeries.mnemonic;
    cloned.ohlcv.data = barSeries.data;

    const lineData = new LineData();
    lineData.name = indicator.getName();
    lineData.data = calculateSma(barSeries.data, indicator);
    lineData.color = 'steelblue';
    lineData.width = 2;
    cloned.pricePane.lines.push(lineData);
    this.configuration = cloned;
    this.dataSelection = barSeries;
  }

  private configTemplate: Configuration = {
    width: '100%', widthMin: 360, // widthMax: 700,
    navigationPane: {
      height: 30, heightMin: 30, heightMax: 30, // timeTicksFormat: '%Y-%m-%d',
      hasLine: false, hasArea: true, hasTimeAxis: false, timeTicks: 0,
      // hasLine: true, hasArea: false, hasTimeAxis: true, timeTicks: 0,
    },
    heightNavigationPane: 30,
    timeAnnotationFormat: '%Y-%m-%d', // timeTicks: 5, timeTicksFormat: '%Y-%m-%d',
    axisLeft: true,
    axisRight: false,
    margin: { left: 0, top: 10, right: 20, bottom: 0 },
    ohlcv: { name: '', data: [], candlesticks: false },
    pricePane: {
      height: '30%', heightMin: 300, heightMax: 800,
      valueMarginPercentageFactor: 0.01, valueFormat: ',.2f', // valueTicks: 10, 
      bands: [],
      lineAreas: [],
      horizontals: [],
      arrows: [],
      lines: []
    },
    indicatorPanes: [],
    crosshair: false,
    volumeInPricePane: false,
    menuVisible: true, downloadSvgVisible: true
  };


}

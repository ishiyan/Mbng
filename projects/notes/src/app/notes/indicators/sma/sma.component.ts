import { Component } from '@angular/core';

import { Bar } from 'mb';
import { Scalar } from 'mb';
import { Configuration } from 'mb';
import { LineData } from 'mb';
import { SimpleMovingAverage } from 'mb';
import { predefinedInterpolatedPalettes } from 'mb';

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
};

const calculateSma = (bars: Bar[], sma: SimpleMovingAverage): Scalar[]  => {
  const scalars: Scalar[] = [];
  for (const bar of bars) {
    scalars.push({time: bar.time, value: sma.update(bar.close)});
  }

  return scalars;
};

@Component({
  selector: 'app-ind-sma',
  templateUrl: './sma.component.html',
  styleUrls: ['./sma.component.scss']
})
export class SmaComponent {

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

  protected indicators = [
    new SimpleMovingAverage({length: 5}),
    new SimpleMovingAverage({length: 15}),
    new SimpleMovingAverage({length: 25}),
    new SimpleMovingAverage({length: 35}),
    new SimpleMovingAverage({length: 45}),
    new SimpleMovingAverage({length: 55}),
    new SimpleMovingAverage({length: 65})
  ];

  private selectedIndex = 0;
  protected palettes: string[][] = predefinedInterpolatedPalettes(this.indicators.length);
  protected selectedPalette: string[] = this.palettes[this.selectedIndex];
  protected sma = simpleMovingAverage;
  protected dataSelection!: BarSeries;
  protected configuration!: Configuration;

  protected selectionChanged(selection: string[]) {
    this.selectedIndex = this.palettes.indexOf(selection);
    this.selectedPalette = selection;
    this.render();
  }

  protected dataSelectionChanged(barSeries: BarSeries) {
    this.dataSelection = barSeries;
    this.render();
  }

  private render() {
    const cloned = deepCopy(this.configTemplate) as Configuration;
    cloned.ohlcv.name = this.dataSelection.mnemonic;
    cloned.ohlcv.data = this.dataSelection.data;

    for (let i = 0; i < this.indicators.length; ++i) {
      const indicator = this.indicators[i];
      const lineData = new LineData();
      lineData.name = indicator.getMnemonic();
      lineData.data = calculateSma(this.dataSelection.data, indicator);
      lineData.color = this.selectedPalette[i];
      lineData.width = 1.5;
      lineData.dash ='';
      lineData.interpolation = 'stepAfter';
      cloned.pricePane.lines.push(lineData);
    }

    this.configuration = cloned;
  }

}

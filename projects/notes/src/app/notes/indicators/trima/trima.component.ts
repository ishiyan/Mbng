import { AfterViewInit, ChangeDetectionStrategy, Component } from '@angular/core';

import { Bar } from 'mb';
import { Scalar } from 'mb';
import { Configuration } from 'mb';
import { LineData } from 'mb';
import { TriangularMovingAverage } from 'mb';
import { predefinedLinePalettes } from 'mb';

import { BarSeries } from '../../../shared/data/bar-series/bar-series.interface';
import { triangularMovingAverage } from '../../../notes';
import { TrimaInput } from './trima-input.interface';
import { FrequencyResponse, FrequencyResponseResult, BarComponent, barComponentValue } from 'projects/mb/src/public-api';
import { Trima } from './trima.interface';

const isUnlocked = false;
const sl = 4096;

const calculateTrima = (bars: Bar[], trima: TriangularMovingAverage, barComponent: BarComponent): Scalar[]  => {
  const scalars: Scalar[] = [];
  const f = barComponentValue(barComponent);
  for (const bar of bars) {
    scalars.push({time: bar.time, value: trima.update(f(bar))});
  }

  return scalars;
};

const getConfigTemplate = (): Configuration => ({
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
  });

@Component({
  selector: 'app-ind-trima',
  templateUrl: './trima.component.html',
  styleUrls: ['./trima.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class TrimaComponent implements AfterViewInit {

  private indicators: Trima[] = [];
  private initialized = false;
  protected selectedIndex = 0; // 20

  protected readonly initialIndicators: TrimaInput = {
    length: [5,10,20], barComponent: BarComponent.Median, showStyle: true
  };

  protected readonly initialFreqs: TrimaInput = {
    length: [5,10,20], showStyle: false
  };

  protected get maxPeriod(): number {
    return this.freqsMaxPeriod;
  }
  protected set maxPeriod(value: number) {
    if (!value || value < 2) {
      value = 2;
    }
    this.freqsMaxPeriod = value;
    if (this.freqs.length > 0) {
      this.freqs = [...this.freqs];
    }
  }

  protected get freqsH(): number {
    return this.freqsHeight;
  }
  protected set freqsH(value: number) {
    this.freqsHeight = value;
    if (this.freqs.length > 0) {
      this.freqs = [...this.freqs];
    }
  }

  protected get unLocked(): boolean {
    return this.unlocked;
  }
  protected set unLocked(value: boolean) {
    this.unlocked = value;
    this.render();
  }

  protected palettes: string[][] = predefinedLinePalettes(this.initialIndicators.length.length);
  protected selectedPalette: string[] = this.palettes[this.selectedIndex];
  protected trimaNote = triangularMovingAverage;
  protected dataSelection!: BarSeries;
  protected configuration!: Configuration;
  protected freqs: FrequencyResponseResult[] = [];
  protected freqsMaxPeriod = 40;
  protected freqsHeight = 300;
  protected unlocked = true;

  protected trima2 = FrequencyResponse.calculate(sl, new TriangularMovingAverage({length: 2}), 4);
  protected trima3 = FrequencyResponse.calculate(sl, new TriangularMovingAverage({length: 3}), 6);
  protected trima4 = FrequencyResponse.calculate(sl, new TriangularMovingAverage({length: 4}), 8);
  protected trima5 = FrequencyResponse.calculate(sl, new TriangularMovingAverage({length: 5}), 10);
  protected trima6 = FrequencyResponse.calculate(sl, new TriangularMovingAverage({length: 6}), 12);
  protected trima7 = FrequencyResponse.calculate(sl, new TriangularMovingAverage({length: 7}), 14);
  protected trima10 = FrequencyResponse.calculate(sl, new TriangularMovingAverage({length: 10}), 20);
  protected trima20 = FrequencyResponse.calculate(sl, new TriangularMovingAverage({length: 20}), 40);

  ngAfterViewInit() {
    this.initialized = true;
    this.unlocked = isUnlocked;
    this.render();
  }

  protected indicatorPaletteChanged(palette: string[]) {
    this.selectedIndex = this.palettes.indexOf(palette);
    this.selectedPalette = palette;
  }

  protected indicatorsChanged(arr: Trima[]) {
    const n = arr.length > 2 ? arr.length : 2;
    if (n !== this.selectedPalette.length) {
      this.palettes = predefinedLinePalettes(n);
      if (this.selectedIndex >= n) {
        this.selectedIndex = 0;
      }

      this.selectedPalette = this.palettes[this.selectedIndex];
    }

    this.indicators = arr;
    this.render();
  }

  protected freqsChanged(arr: Trima[]) {
    const frrs: FrequencyResponseResult[] = [];
    for (const el of arr) {
      const l = el.params.length;
      const frr = FrequencyResponse.calculate(sl, new TriangularMovingAverage({length: l}), l*2);
      frrs.push(frr);
    }

    this.freqs = frrs;
  }

  protected dataSelectionChanged(barSeries: BarSeries) {
    this.dataSelection = barSeries;
    this.render();
  }

  private render() {
    if (!this.initialized) {
      return;
    }

    const cloned = getConfigTemplate();
    cloned.menuVisible = this.unlocked;
    cloned.ohlcv.name = this.dataSelection.mnemonic;
    cloned.ohlcv.data = this.dataSelection.data;

    for (const el of this.indicators) {
      const component = el.params.barComponent ? el.params.barComponent : BarComponent.Close;
      const indicator = new TriangularMovingAverage(el.params);
      const lineData = new LineData();
      lineData.name = indicator.getMnemonic();
      lineData.data = calculateTrima(this.dataSelection.data, indicator, component);
      const s = el.style;
      lineData.color = s.color;
      lineData.width = s.width;
      lineData.dash = s.dash;
      lineData.interpolation = s.interpolation;
      cloned.pricePane.lines.push(lineData);
    }

    this.configuration = cloned;
  }

}

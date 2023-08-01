import { AfterViewInit, ChangeDetectionStrategy, Component } from '@angular/core';

import { Bar, generateStep } from 'mb';
import { Scalar } from 'mb';
import { Configuration } from 'mb';
import { LineData } from 'mb';
import { T2ExponentialMovingAverage } from 'mb';
import { predefinedLinePalettes } from 'mb';
import { T2ExponentialMovingAverageLengthParams, T2ExponentialMovingAverageSmoothingFactorParams } from 'mb';
import { FrequencyResponse, FrequencyResponseResult, BarComponent, barComponentValue } from 'mb';

import { BarSeries } from '../../../../shared/data/bar-series/bar-series.interface';
import { exponentialMovingAverageNote, t2ExponentialMovingAverageNote } from '../../../../notes';
import { T2emaLengthInput } from './t2ema-input.interface';
import { T2ema } from './t2ema.interface';

const isUnlocked = false;
const sl = 4096;
const stepMin = 10;
const stepMax = 90;
const stepSpread = 1;
const stepCount = 32;

const guardLength = (object: any): object is T2ExponentialMovingAverageLengthParams => 'length' in object;

const calculateT2ema = (bars: Bar[], t2ema: T2ExponentialMovingAverage, barComponent: BarComponent): Scalar[]  => {
  const scalars: Scalar[] = [];
  const f = barComponentValue(barComponent);
  for (const bar of bars) {
    scalars.push({time: bar.time, value: t2ema.update(f(bar))});
  }

  return scalars;
};

const calculateStep = (bars: Bar[], t2ema: T2ExponentialMovingAverage, barComponent: BarComponent): Scalar[]  => {
  const f = barComponentValue(barComponent);
  const val = f(bars[0]);
  while (!t2ema.isPrimed) {
    t2ema.update(val);
  }

  const scalars: Scalar[] = [];
  for (const bar of bars) {
    scalars.push({time: bar.time, value: t2ema.update(f(bar))});
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
  selector: 'app-ind-t2ema',
  templateUrl: './t2ema.component.html',
  styleUrls: ['./t2ema.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class T2emaComponent implements AfterViewInit {

  private indicators: T2ema[] = [];
  private initialized = false;
  protected selectedIndex = 0; // 20

  protected readonly initialIndicators: T2emaLengthInput = {
    length: [5,10,20], vFactor: 0.7, firstIsAverage: false, barComponent: BarComponent.Median, showStyle: true
  };

  protected readonly initialFreqs: T2emaLengthInput = {
    length: [5,10,20], vFactor: 0.7, firstIsAverage: false, showStyle: false
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
  protected emaNote = exponentialMovingAverageNote;
  protected t2emaNote = t2ExponentialMovingAverageNote;
  protected dataSelection!: BarSeries;
  protected configuration!: Configuration;
  protected freqs: FrequencyResponseResult[] = [];
  protected freqsMaxPeriod = 40;
  protected freqsHeight = 300;
  protected unlocked = true;

  protected configurationStepUp!: Configuration;
  protected configurationStepDn!: Configuration;
  protected dataStepUp = generateStep(stepMin, stepCount, stepMax, stepCount * 3, stepSpread);
  protected dataStepDn = generateStep(stepMax, stepCount, stepMin, stepCount * 3, stepSpread);

  protected t2ema2 = FrequencyResponse.calculate(sl, new T2ExponentialMovingAverage({length: 2, vFactor: 0.7, firstIsAverage: false}), 4);
  protected t2ema5 = FrequencyResponse.calculate(sl, new T2ExponentialMovingAverage({length: 5, vFactor: 0.7, firstIsAverage: false}), 10);
  protected t2ema10 = FrequencyResponse.calculate(sl, new T2ExponentialMovingAverage({length: 10, vFactor: 0.7, firstIsAverage: false}), 20);
  protected t2ema20 = FrequencyResponse.calculate(sl, new T2ExponentialMovingAverage({length: 20, vFactor: 0.7, firstIsAverage: false}), 40);

  ngAfterViewInit() {
    this.initialized = true;
    this.unlocked = isUnlocked;
    this.render();
  }

  protected indicatorPaletteChanged(palette: string[]) {
    this.selectedIndex = this.palettes.indexOf(palette);
    this.selectedPalette = palette;
  }

  protected indicatorsChanged(arr: T2ema[]) {
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

  protected freqsChanged(arr: T2ema[]) {
    const frrs: FrequencyResponseResult[] = [];
    for (const el of arr) {
      if (guardLength(el.params)) {
         const p = el.params as T2ExponentialMovingAverageLengthParams;
         const frr = FrequencyResponse.calculate(sl,
           new T2ExponentialMovingAverage({length: p.length, vFactor: p.vFactor, firstIsAverage: p.firstIsAverage}), p.length*2);
         frrs.push(frr);
      } else {
         const p = el.params as T2ExponentialMovingAverageSmoothingFactorParams;
         const l = Math.ceil(2 / p.smoothingFactor - 1);
         const frr = FrequencyResponse.calculate(sl, new T2ExponentialMovingAverage({smoothingFactor: p.smoothingFactor, vFactor: p.vFactor}), l*2);
         frrs.push(frr);
      }
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

    this.configuration = this.prepareConfig(this.dataSelection.mnemonic, this.dataSelection.data, false);
    this.configurationStepUp = this.prepareConfig('', this.dataStepUp, true);
    this.configurationStepDn = this.prepareConfig('', this.dataStepDn, true);
  }

  private prepareConfig(mnemonic: string, bars: Bar[], doStep: boolean): Configuration {
    const cloned = getConfigTemplate();
    cloned.menuVisible = this.unlocked;
    cloned.ohlcv.name = mnemonic;
    cloned.ohlcv.data = bars;

    for (const el of this.indicators) {
      const component = el.params.barComponent ? el.params.barComponent : BarComponent.Close;
      const indicator = new T2ExponentialMovingAverage(el.params);
      const lineData = new LineData();
      lineData.name = indicator.getMnemonic();
      lineData.data = doStep ? calculateStep(bars, indicator, component) : calculateT2ema(bars, indicator, component);
      const s = el.style;
      lineData.color = s.color;
      lineData.width = s.width;
      lineData.dash = s.dash;
      lineData.interpolation = s.interpolation;
      cloned.pricePane.lines.push(lineData);
    }

    return cloned;
  }
}

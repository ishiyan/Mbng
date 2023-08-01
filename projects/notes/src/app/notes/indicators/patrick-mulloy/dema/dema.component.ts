import { AfterViewInit, ChangeDetectionStrategy, Component } from '@angular/core';

import { Bar, generateStep } from 'mb';
import { Scalar } from 'mb';
import { Configuration } from 'mb';
import { LineData } from 'mb';
import { DoubleExponentialMovingAverage } from 'mb';
import { predefinedLinePalettes } from 'mb';
import { DoubleExponentialMovingAverageLengthParams, DoubleExponentialMovingAverageSmoothingFactorParams } from 'mb';
import { FrequencyResponse, FrequencyResponseResult, BarComponent, barComponentValue } from 'mb';

import { BarSeries } from '../../../../shared/data/bar-series/bar-series.interface';
import { exponentialMovingAverageNote, doubleExponentialMovingAverageNote } from '../../../../notes';
import { DemaLengthInput } from './dema-input.interface';
import { Dema } from './dema.interface';

const isUnlocked = false;
const sl = 4096;
const stepMin = 10;
const stepMax = 90;
const stepSpread = 1;
const stepCount = 32;

const guardLength = (object: any): object is DoubleExponentialMovingAverageLengthParams => 'length' in object;

const calculateDema = (bars: Bar[], dema: DoubleExponentialMovingAverage, barComponent: BarComponent): Scalar[]  => {
  const scalars: Scalar[] = [];
  const f = barComponentValue(barComponent);
  for (const bar of bars) {
    scalars.push({time: bar.time, value: dema.update(f(bar))});
  }

  return scalars;
};

const calculateStep = (bars: Bar[], dema: DoubleExponentialMovingAverage, barComponent: BarComponent): Scalar[]  => {
  const f = barComponentValue(barComponent);
  const val = f(bars[0]);
  while (!dema.isPrimed) {
    dema.update(val);
  }

  const scalars: Scalar[] = [];
  for (const bar of bars) {
    scalars.push({time: bar.time, value: dema.update(f(bar))});
  }

  return scalars;
};

const calculateFrequencyResponse = (dema: DoubleExponentialMovingAverage): FrequencyResponseResult => {
  while (!dema.isPrimed) {
    dema.update(0);
  }

  const fr = FrequencyResponse.calculate(sl, dema, 64);
  return fr;
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
  selector: 'app-ind-dema',
  templateUrl: './dema.component.html',
  styleUrls: ['./dema.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class DemaComponent implements AfterViewInit {

  private indicators: Dema[] = [];
  private initialized = false;
  protected selectedIndex = 0; // 20

  protected readonly initialIndicators: DemaLengthInput = {
    length: [5,10,20], firstIsAverage: false, barComponent: BarComponent.Median, showStyle: true
  };

  protected readonly initialFreqs: DemaLengthInput = {
    length: [5,10,20], firstIsAverage: false, showStyle: false
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
  protected demaNote = doubleExponentialMovingAverageNote;
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

  protected dema2 = calculateFrequencyResponse(new DoubleExponentialMovingAverage({length: 2, firstIsAverage: true}));
  protected dema5 = calculateFrequencyResponse(new DoubleExponentialMovingAverage({length: 5, firstIsAverage: false}));
  protected dema10 = calculateFrequencyResponse(new DoubleExponentialMovingAverage({length: 10, firstIsAverage: false}));
  protected dema20 = calculateFrequencyResponse(new DoubleExponentialMovingAverage({length: 20, firstIsAverage: false}));

  ngAfterViewInit() {
    this.initialized = true;
    this.unlocked = isUnlocked;
    this.render();
  }

  protected indicatorPaletteChanged(palette: string[]) {
    this.selectedIndex = this.palettes.indexOf(palette);
    this.selectedPalette = palette;
  }

  protected indicatorsChanged(arr: Dema[]) {
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

  protected freqsChanged(arr: Dema[]) {
    const frrs: FrequencyResponseResult[] = [];
    for (const el of arr) {
      if (guardLength(el.params)) {
         const p = el.params as DoubleExponentialMovingAverageLengthParams;
         const frr = calculateFrequencyResponse(new DoubleExponentialMovingAverage({length: p.length, firstIsAverage: p.firstIsAverage}));
         frrs.push(frr);
      } else {
         const p = el.params as DoubleExponentialMovingAverageSmoothingFactorParams;
         const frr = calculateFrequencyResponse(new DoubleExponentialMovingAverage({smoothingFactor: p.smoothingFactor}));
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
      const indicator = new DoubleExponentialMovingAverage(el.params);
      const lineData = new LineData();
      lineData.name = indicator.getMnemonic();
      lineData.data = doStep ? calculateStep(bars, indicator, component) : calculateDema(bars, indicator, component);
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

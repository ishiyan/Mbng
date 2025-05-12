import { AfterViewInit, ChangeDetectionStrategy, Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatFormField, MatLabel } from '@angular/material/form-field';
import { MatInput } from '@angular/material/input';
import { MatIcon } from '@angular/material/icon';
import { MatSlideToggle } from '@angular/material/slide-toggle';
import { MatExpansionPanel, MatExpansionPanelHeader, MatExpansionPanelTitle } from '@angular/material/expansion';

import { Bar, generateStep, /*generateStepWithNoise,*/ OhlcvChartComponent, SwatchesSelectComponent, FrequencyResponseChartComponent } from 'mb';
import { KatexInlineComponent, KatexDisplayComponent, SvgViewerComponent } from 'mb';
import { Scalar } from 'mb';
import { Configuration } from 'mb';
import { LineData } from 'mb';
import { FractalAdaptiveMovingAverage } from 'mb';
import { predefinedLinePalettes } from 'mb';
import { FrequencyResponse, FrequencyResponseResult, BarComponent, barComponentValue } from 'mb';

import { BarSeries } from '../../../../shared/data/bar-series/bar-series.interface';
import { BarSeriesSelectComponent } from '../../../../shared/data/bar-series/bar-series-select/bar-series-select.component';
import { ehlersFractalAdaptiveMovingAverageNote, exponentialMovingAverageNote } from '../../../../notes';
import { frequencyResponseOfAnIndicatorNote } from '../../../../notes';
import { FramaInput } from './frama-input.interface';
import { Frama } from './frama.interface';
import { FramaListComponent } from './frama-list.component';

const isUnlocked = false;
const sl = 4096;
const stepMin = 10;
const stepMax = 90;
//const stepMinNoise = 0.05;
//const stepMaxNoise = 0.01;
const stepSpread = 0.1;
const stepCount = 32;

const calculateFrama = (bars: Bar[], frama: FractalAdaptiveMovingAverage, barComponent: BarComponent): [Scalar[], Scalar[]] => {
  const scalarsFrama: Scalar[] = [];
  const scalarsFdim: Scalar[] = [];
  const f = barComponentValue(barComponent);
  for (const bar of bars) {
    scalarsFrama.push({ time: bar.time, value: frama.updateWithHighLow(f(bar), bar.high, bar.low) });
    scalarsFdim.push({ time: bar.time, value: frama.getFdim() });
  }

  return [scalarsFrama, scalarsFdim];
};

const calculateStep = (bars: Bar[], frama: FractalAdaptiveMovingAverage, barComponent: BarComponent): [Scalar[], Scalar[]] => {
  const f = barComponentValue(barComponent);
  const val = f(bars[0]);
  const high = bars[0].high;
  const low = bars[0].low;
  for (let i = 0; i < bars.length; i++) {
    frama.updateWithHighLow(val, high, low);
  }

  const scalarsFrama: Scalar[] = [];
  const scalarsFdim: Scalar[] = [];
  for (const bar of bars) {
    scalarsFrama.push({ time: bar.time, value: frama.updateWithHighLow(f(bar), bar.high, bar.low) });
    scalarsFdim.push({ time: bar.time, value: frama.getFdim() });
  }

  return [scalarsFrama, scalarsFdim];
};

const prepareFilteredSignal = (len: number, filter: FractalAdaptiveMovingAverage,
  warmup: number, random: boolean): number[] => {
  const zero = 0.01;
  const zeroDelta = 0.01;
  const peak = 1000;
  const peakDelta = 0.1;

  if (random) {
    for (let i = 0; i < warmup; ++i) {
      const z = Math.random() * zero;
      filter.updateWithHighLow(z, z + zeroDelta, 0);
    }
  } else {
    for (let i = 0; i < warmup; ++i) {
      filter.updateWithHighLow(zero, zero + zeroDelta, 0);
    }
  }

  const signal = new Array<number>(len);
  signal[0] = filter.updateWithHighLow(peak, peak + peakDelta, peak - peakDelta);

  if (random) {
    for (let i = 1; i < len; ++i) {
      const z = Math.random() * zero;
      signal[i] = filter.updateWithHighLow(z, z + zeroDelta, 0);
    }
  } else {
    for (let i = 1; i < len; ++i) {
      signal[i] = filter.updateWithHighLow(zero, zero + zeroDelta, 0);
    }
  }

  return signal;
}

const calculateFfr = (len: number, alpha: number): FrequencyResponseResult => {
  const flt = new FractalAdaptiveMovingAverage({
    length: len, slowestSmoothingFactor: alpha
  });

  return FrequencyResponse.calculate(sl, flt, len * 2, 179,
    prepareFilteredSignal(sl, flt, len * 2, false));
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
  indicatorPanes: [
    {
      height: '120', valueFormat: ',.2f', /*valueTicks: 5,*/ valueMarginPercentageFactor: 0.01,
      bands: [], lineAreas: [], horizontals: [
        { value: 1.5, color: 'red', width: 0.5, dash: '' }
      ], lines: [], arrows: []
    }
  ],
  crosshair: false,
  volumeInPricePane: false,
  menuVisible: true, downloadSvgVisible: true
});

@Component({
  selector: 'app-ind-frama',
  templateUrl: './frama.component.html',
  styleUrls: ['./frama.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [
    FormsModule,
    MatFormField,
    MatLabel,
    MatInput,
    MatIcon,
    MatSlideToggle,
    MatExpansionPanel,
    MatExpansionPanelHeader,
    MatExpansionPanelTitle,
    BarSeriesSelectComponent,
    OhlcvChartComponent,
    SwatchesSelectComponent,
    SvgViewerComponent,
    KatexInlineComponent,
    KatexDisplayComponent,
    FrequencyResponseChartComponent,
    FramaListComponent
  ]
})
export class FramaComponent implements AfterViewInit {

  private indicators: Frama[] = [];
  private initialized = false;
  protected selectedIndex = 0;

  private readonly indicatorsLen: Frama[] = [
    {
      id: 551,
      params: { length: 58, slowestSmoothingFactor: 0.01 },
      style: { color: 'red', width: 1, dash: 'solid', interpolation: 'linear' },
      showStyle: true
    },
    {
      id: 552,
      params: { length: 64, slowestSmoothingFactor: 0.01 },
      style: { color: 'green', width: 1, dash: 'solid', interpolation: 'linear' },
      showStyle: true
    },
    {
      id: 553,
      params: { length: 72, slowestSmoothingFactor: 0.01 },
      style: { color: 'blue', width: 1, dash: 'solid', interpolation: 'linear' },
      showStyle: true
    }
  ];

  private readonly indicatorsAlpha: Frama[] = [
    {
      id: 561,
      params: { length: 16, slowestSmoothingFactor: 0.01 },
      style: { color: 'red', width: 1, dash: 'solid', interpolation: 'linear' },
      showStyle: true
    },
    {
      id: 562,
      params: { length: 16, slowestSmoothingFactor: 0.05 },
      style: { color: 'green', width: 1, dash: 'solid', interpolation: 'linear' },
      showStyle: true
    },
    {
      id: 563,
      params: { length: 16, slowestSmoothingFactor: 0.4 },
      style: { color: 'blue', width: 1, dash: 'solid', interpolation: 'linear' },
      showStyle: true
    }
  ];

  protected readonly initialIndicators: FramaInput = {
    length: [8, 16, 32], slowestSmoothingFactor: 0.01,
    barComponent: BarComponent.Median, showStyle: true
  };

  protected readonly initialFreqs: FramaInput = {
    length: [8, 16, 32], slowestSmoothingFactor: 0.01,
    showStyle: false
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
  protected framaNote = ehlersFractalAdaptiveMovingAverageNote;
  protected emaNote = exponentialMovingAverageNote;
  protected froaiNote = frequencyResponseOfAnIndicatorNote;
  protected dataSelection!: BarSeries;
  protected configuration!: Configuration;
  protected freqs: FrequencyResponseResult[] = [];
  protected freqsMaxPeriod = 40;
  protected freqsHeight = 300;
  protected unlocked = true;

  protected configurationParamsLen!: Configuration;
  protected configurationParamsAlpha!: Configuration;

  protected configurationStepUpLen!: Configuration;
  protected configurationStepDnLen!: Configuration;
  protected configurationStepUpAlpha!: Configuration;
  protected configurationStepDnAlpha!: Configuration;

  protected dataStepUp = generateStep(stepMin, stepCount, stepMax, stepCount * 3, stepSpread);
  protected dataStepDn = generateStep(stepMax, stepCount, stepMin, stepCount * 3, stepSpread);
  /*protected dataStepUp = generateStepWithNoise(stepMin, stepMinNoise, stepCount,
    stepMax, stepMaxNoise, stepCount * 3, stepSpread);
  protected dataStepDn = generateStepWithNoise(stepMax, stepMaxNoise, stepCount,
    stepMin, stepMinNoise, stepCount * 3, stepSpread);*/

  protected framaLen4 = calculateFfr(4, 0.01);
  protected framaLen8 = calculateFfr(8, 0.01);
  protected framaLen16 = calculateFfr(16, 0.01);
  protected framaLen32 = calculateFfr(32, 0.01);

  protected framaAlpha005 = calculateFfr(16, 0.005);
  protected framaAlpha01 = calculateFfr(16, 0.01);
  protected framaAlpha05 = calculateFfr(16, 0.05);
  protected framaAlpha1 = calculateFfr(16, 0.1);

  ngAfterViewInit() {
    this.initialized = true;
    this.unlocked = isUnlocked;
    this.render();
  }

  protected indicatorPaletteChanged(palette: string[]) {
    this.selectedIndex = this.palettes.indexOf(palette);
    this.selectedPalette = palette;
  }

  protected indicatorsChanged(arr: Frama[]) {
    const n = arr.length > 3 ? arr.length : 3;
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

  protected freqsChanged(arr: Frama[]) {
    const frrs: FrequencyResponseResult[] = [];
    for (const el of arr) {
      const p = el.params;
      const warmup = p.length * 2;
      const filter = new FractalAdaptiveMovingAverage({
        length: p.length, slowestSmoothingFactor: p.slowestSmoothingFactor
      })
      const frr = FrequencyResponse.calculate(sl,
        filter, warmup, 179, prepareFilteredSignal(sl, filter, warmup, false));
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

    this.configuration = this.prepareConfig(this.dataSelection.mnemonic, this.dataSelection.data, false, this.indicators);
    this.fixColors(this.indicatorsLen);
    this.fixColors(this.indicatorsAlpha);
    this.configurationParamsLen = this.prepareConfig(this.dataSelection.mnemonic, this.dataSelection.data, false, this.indicatorsLen);
    this.configurationParamsAlpha = this.prepareConfig(this.dataSelection.mnemonic, this.dataSelection.data, false, this.indicatorsAlpha);
    this.configurationStepUpLen = this.prepareConfig('', this.dataStepUp, true, this.indicatorsLen);
    this.configurationStepDnLen = this.prepareConfig('', this.dataStepDn, true, this.indicatorsLen);
    this.configurationStepUpAlpha = this.prepareConfig('', this.dataStepUp, true, this.indicatorsAlpha);
    this.configurationStepDnAlpha = this.prepareConfig('', this.dataStepDn, true, this.indicatorsAlpha);
  }

  private prepareConfig(mnemonic: string, bars: Bar[], doStep: boolean, indicators: Frama[]): Configuration {
    const cloned = getConfigTemplate();
    cloned.menuVisible = this.unlocked;
    cloned.ohlcv.name = mnemonic;
    cloned.ohlcv.data = bars;

    for (const el of indicators) {
      const component = el.params.barComponent ? el.params.barComponent : BarComponent.Close;
      const indicator = new FractalAdaptiveMovingAverage(el.params);
      const lineData = new LineData();
      const lineData1 = new LineData();
      lineData.name = indicator.getMnemonic();
      lineData1.name = indicator.getMnemonicFdim();
      const output = doStep ? calculateStep(bars, indicator, component) : calculateFrama(bars, indicator, component);
      lineData.data = output[0];
      lineData1.data = output[1];
      const s = el.style;
      lineData.color = s.color;
      lineData.width = s.width;
      lineData.dash = s.dash;
      lineData.interpolation = s.interpolation;
      lineData1.color = s.color;
      lineData1.width = s.width;
      lineData1.dash = s.dash;
      lineData1.interpolation = s.interpolation;
      cloned.pricePane.lines.push(lineData);
      cloned.indicatorPanes[0].lines.push(lineData1);
    }

    return cloned;
  }

  private fixColors(indicators: Frama[]): void {
    const lenPal = this.selectedPalette.length;
    const lenInd = indicators.length;
    const len = Math.min(lenPal, lenInd);
    for (let i = 0; i < len; i++) {
      const el = indicators[i];
      const s = el.style;
      s.color = this.selectedPalette[i];
      el.style = s;
    }
  }
}

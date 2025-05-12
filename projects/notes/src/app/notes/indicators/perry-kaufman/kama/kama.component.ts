import { AfterViewInit, ChangeDetectionStrategy, Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatFormField, MatLabel } from '@angular/material/form-field';
import { MatInput } from '@angular/material/input';
import { MatIcon } from '@angular/material/icon';
import { MatSlideToggle } from '@angular/material/slide-toggle';
import { MatExpansionPanel, MatExpansionPanelHeader, MatExpansionPanelTitle } from '@angular/material/expansion';

import { Bar, generateStep, OhlcvChartComponent, SwatchesSelectComponent, FrequencyResponseChartComponent } from 'mb';
import { KatexInlineComponent, KatexDisplayComponent } from 'mb';
import { Scalar } from 'mb';
import { Configuration } from 'mb';
import { LineData } from 'mb';
import { KaufmanAdaptiveMovingAverage } from 'mb';
import { predefinedLinePalettes } from 'mb';
import { KaufmanAdaptiveMovingAverageLengthParams, KaufmanAdaptiveMovingAverageSmoothingFactorParams } from 'mb';
import { FrequencyResponse, FrequencyResponseResult, BarComponent, barComponentValue } from 'mb';

import { BarSeries } from '../../../../shared/data/bar-series/bar-series.interface';
import { BarSeriesSelectComponent } from '../../../../shared/data/bar-series/bar-series-select/bar-series-select.component';
import { kaufmanAdaptiveMovingAverageNote, exponentialMovingAverageNote } from '../../../../notes';
import { frequencyResponseOfAnIndicatorNote } from '../../../../notes';
import { KamaLengthInput } from './kama-input.interface';
import { Kama } from './kama.interface';
import { KamaListComponent } from './kama-list.component';

const isUnlocked = false;
const sl = 4096;
const stepMin = 10;
const stepMax = 90;
const stepSpread = 1;
const stepCount = 32;

const guardLength = (object: any): object is KaufmanAdaptiveMovingAverageLengthParams => 'fastestLength' in object;

const calculateKama = (bars: Bar[], kama: KaufmanAdaptiveMovingAverage, barComponent: BarComponent): [Scalar[], Scalar[]]  => {
  const scalarsKama: Scalar[] = [];
  const scalarsEr: Scalar[] = [];
  const f = barComponentValue(barComponent);
  for (const bar of bars) {
    scalarsKama.push({time: bar.time, value: kama.update(f(bar))});
    scalarsEr.push({ time: bar.time, value: kama.getEfficiencyRatio() });
  }

  return [scalarsKama, scalarsEr];
};

const calculateStep = (bars: Bar[], kama: KaufmanAdaptiveMovingAverage, barComponent: BarComponent): [Scalar[], Scalar[]]  => {
  const f = barComponentValue(barComponent);
  const val = f(bars[0]);
  while (!kama.isPrimed) {
    kama.update(val);
  }

  const scalarsKama: Scalar[] = [];
  const scalarsEr: Scalar[] = [];
  for (const bar of bars) {
    scalarsKama.push({time: bar.time, value: kama.update(f(bar))});
    scalarsEr.push({ time: bar.time, value: kama.getEfficiencyRatio() });
  }

  return [scalarsKama, scalarsEr];
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
        { value: 0.5, color: 'red', width: 0.5, dash: '' }
      ], lines: [], arrows: []
    }
  ],
  crosshair: false,
  volumeInPricePane: false,
  menuVisible: true, downloadSvgVisible: true
});

@Component({
  selector: 'app-ind-kama',
  templateUrl: './kama.component.html',
  styleUrls: ['./kama.component.scss'],
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
    KatexInlineComponent,
    KatexDisplayComponent,
    FrequencyResponseChartComponent,
    KamaListComponent
  ]
})
export class KamaComponent implements AfterViewInit {

  private indicators: Kama[] = [];
  private initialized = false;
  protected selectedIndex = 0;

  private readonly indicatorsEr: Kama[] = [
    {
      id: 551,
      params: { efficiencyRatioLength: 5, fastestLength: 2, slowestLength: 30},
      style: { color: 'red', width: 1, dash: 'solid', interpolation: 'linear' },
      showStyle: true
    },
    {
      id: 552,
      params: { efficiencyRatioLength: 10, fastestLength: 2, slowestLength: 30},
      style: { color: 'green', width: 1, dash: 'solid', interpolation: 'linear' },
      showStyle: true
    },
    {
      id: 553,
      params: { efficiencyRatioLength: 15, fastestLength: 2, slowestLength: 30},
      style: { color: 'blue', width: 1, dash: 'solid', interpolation: 'linear' },
      showStyle: true
    }
  ];

  private readonly indicatorsFast: Kama[] = [
    {
      id: 561,
      params: { efficiencyRatioLength: 10, fastestLength: 2, slowestLength: 30},
      style: { color: 'red', width: 1, dash: 'solid', interpolation: 'linear' },
      showStyle: true
    },
    {
      id: 562,
      params: { efficiencyRatioLength: 10, fastestLength: 5, slowestLength: 30},
      style: { color: 'green', width: 1, dash: 'solid', interpolation: 'linear' },
      showStyle: true
    },
    {
      id: 563,
      params: { efficiencyRatioLength: 10, fastestLength: 8, slowestLength: 30},
      style: { color: 'blue', width: 1, dash: 'solid', interpolation: 'linear' },
      showStyle: true
    }
  ];

  private readonly indicatorsSlow: Kama[] = [
    {
      id: 571,
      params: { efficiencyRatioLength: 10, fastestLength: 2, slowestLength: 10},
      style: { color: 'red', width: 1, dash: 'solid', interpolation: 'linear' },
      showStyle: true
    },
    {
      id: 572,
      params: { efficiencyRatioLength: 10, fastestLength: 2, slowestLength: 30},
      style: { color: 'green', width: 1, dash: 'solid', interpolation: 'linear' },
      showStyle: true
    },
    {
      id: 573,
      params: { efficiencyRatioLength: 10, fastestLength: 2, slowestLength: 300},
      style: { color: 'blue', width: 1, dash: 'solid', interpolation: 'linear' },
      showStyle: true
    }
  ];
  
  protected readonly initialIndicators: KamaLengthInput = {
    efficiencyRatioLength: [5,10,20], fastestLength: 2, slowestLength: 30,
    barComponent: BarComponent.Median, showStyle: true
  };

  protected readonly initialFreqs: KamaLengthInput = {
    efficiencyRatioLength: [5,10,20], fastestLength: 2, slowestLength: 30,
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

  protected palettes: string[][] = predefinedLinePalettes(this.initialIndicators.efficiencyRatioLength.length);
  protected selectedPalette: string[] = this.palettes[this.selectedIndex];
  protected kamaNote = kaufmanAdaptiveMovingAverageNote;
  protected emaNote = exponentialMovingAverageNote;
  protected froaiNote = frequencyResponseOfAnIndicatorNote;
  protected dataSelection!: BarSeries;
  protected configuration!: Configuration;
  protected freqs: FrequencyResponseResult[] = [];
  protected freqsMaxPeriod = 40;
  protected freqsHeight = 300;
  protected unlocked = true;

  protected configurationParamsEr!: Configuration;
  protected configurationParamsFast!: Configuration;
  protected configurationParamsSlow!: Configuration;

  protected configurationStepUpEr!: Configuration;
  protected configurationStepDnEr!: Configuration;
  protected configurationStepUpFast!: Configuration;
  protected configurationStepDnFast!: Configuration;
  protected dataStepUp = generateStep(stepMin, stepCount, stepMax, stepCount * 3, stepSpread);
  protected dataStepDn = generateStep(stepMax, stepCount, stepMin, stepCount * 3, stepSpread);

  protected kamaEr2 = FrequencyResponse.calculate(sl, new KaufmanAdaptiveMovingAverage({
    efficiencyRatioLength: 2, fastestLength: 2, slowestLength: 30}), 4);
  protected kamaEr5 = FrequencyResponse.calculate(sl, new KaufmanAdaptiveMovingAverage({
    efficiencyRatioLength: 5, fastestLength: 2, slowestLength: 30}), 10);
  protected kamaEr10 = FrequencyResponse.calculate(sl, new KaufmanAdaptiveMovingAverage({
    efficiencyRatioLength: 10, fastestLength: 2, slowestLength: 30}), 20);
  protected kamaEr20 = FrequencyResponse.calculate(sl, new KaufmanAdaptiveMovingAverage({
    efficiencyRatioLength: 20, fastestLength: 2, slowestLength: 30}), 40);

  protected kamaFast2 = FrequencyResponse.calculate(sl, new KaufmanAdaptiveMovingAverage({
    efficiencyRatioLength: 10, fastestLength: 2, slowestLength: 30}), 10*2);
  protected kamaFast3 = FrequencyResponse.calculate(sl, new KaufmanAdaptiveMovingAverage({
    efficiencyRatioLength: 10, fastestLength: 3, slowestLength: 30}), 10*2);
  protected kamaFast5 = FrequencyResponse.calculate(sl, new KaufmanAdaptiveMovingAverage({
    efficiencyRatioLength: 10, fastestLength: 5, slowestLength: 30}), 10*2);
  protected kamaFast10 = FrequencyResponse.calculate(sl, new KaufmanAdaptiveMovingAverage({
    efficiencyRatioLength: 10, fastestLength: 10, slowestLength: 30}), 10*2);

  protected kamaSlow10 = FrequencyResponse.calculate(sl, new KaufmanAdaptiveMovingAverage({
    efficiencyRatioLength: 10, fastestLength: 2, slowestLength: 10}), 10*2);
  protected kamaSlow30 = FrequencyResponse.calculate(sl, new KaufmanAdaptiveMovingAverage({
    efficiencyRatioLength: 10, fastestLength: 2, slowestLength: 30}), 10*2);
  protected kamaSlow300 = FrequencyResponse.calculate(sl, new KaufmanAdaptiveMovingAverage({
    efficiencyRatioLength: 10, fastestLength: 2, slowestLength: 300}), 10*2);
    
  ngAfterViewInit() {
    this.initialized = true;
    this.unlocked = isUnlocked;
    this.render();
  }

  protected indicatorPaletteChanged(palette: string[]) {
    this.selectedIndex = this.palettes.indexOf(palette);
    this.selectedPalette = palette;
  }

  protected indicatorsChanged(arr: Kama[]) {
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

  protected freqsChanged(arr: Kama[]) {
    const frrs: FrequencyResponseResult[] = [];
    for (const el of arr) {
      if (guardLength(el.params)) {
         const p = el.params as KaufmanAdaptiveMovingAverageLengthParams;
         const frr = FrequencyResponse.calculate(sl,
           new KaufmanAdaptiveMovingAverage({
             efficiencyRatioLength: p.efficiencyRatioLength, fastestLength: p.fastestLength, slowestLength: p.slowestLength
           }), p.efficiencyRatioLength*2);
         frrs.push(frr);
      } else {
         const p = el.params as KaufmanAdaptiveMovingAverageSmoothingFactorParams;
         const frr = FrequencyResponse.calculate(sl, new KaufmanAdaptiveMovingAverage({
          efficiencyRatioLength: p.efficiencyRatioLength,
          fastestSmoothingFactor: p.fastestSmoothingFactor,
          slowestSmoothingFactor: p.slowestSmoothingFactor
        }), p.efficiencyRatioLength*2);
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

    this.configuration = this.prepareConfig(this.dataSelection.mnemonic, this.dataSelection.data, false, this.indicators);
    this.fixColors(this.indicatorsEr);
    this.fixColors(this.indicatorsFast);
    this.fixColors(this.indicatorsSlow);
    this.configurationParamsEr = this.prepareConfig(this.dataSelection.mnemonic, this.dataSelection.data, false, this.indicatorsEr);
    this.configurationParamsFast = this.prepareConfig(this.dataSelection.mnemonic, this.dataSelection.data, false, this.indicatorsFast);
    this.configurationParamsSlow = this.prepareConfig(this.dataSelection.mnemonic, this.dataSelection.data, false, this.indicatorsSlow);
    this.configurationStepUpEr = this.prepareConfig('', this.dataStepUp, true, this.indicatorsEr);
    this.configurationStepDnEr = this.prepareConfig('', this.dataStepDn, true, this.indicatorsEr);
    this.configurationStepUpFast = this.prepareConfig('', this.dataStepUp, true, this.indicatorsFast);
    this.configurationStepDnFast = this.prepareConfig('', this.dataStepDn, true, this.indicatorsFast);
  }

  private prepareConfig(mnemonic: string, bars: Bar[], doStep: boolean, indicators: Kama[]): Configuration {
    const cloned = getConfigTemplate();
    cloned.menuVisible = this.unlocked;
    cloned.ohlcv.name = mnemonic;
    cloned.ohlcv.data = bars;

    for (const el of indicators) {
      const component = el.params.barComponent ? el.params.barComponent : BarComponent.Close;
      const indicator = new KaufmanAdaptiveMovingAverage(el.params);
      const lineData = new LineData();
      const lineData1 = new LineData();
      lineData.name = indicator.getMnemonic();
      lineData1.name = indicator.getMnemonicEfficiencyRatio();
      const output = doStep ? calculateStep(bars, indicator, component) : calculateKama(bars, indicator, component);
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

  private fixColors(indicators: Kama[]): void {
    const lenPal = this.selectedPalette.length;
    const lenInd = indicators.length;
    const len = Math.min( lenPal, lenInd);
    for (let i = 0; i < len; i++) {
      const el = indicators[i];
      const s = el.style;
      s.color = this.selectedPalette[i];
      el.style = s;
    }
  }
}

import { AfterViewInit, ChangeDetectionStrategy, Component, effect, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatFormField, MatLabel } from '@angular/material/form-field';
import { MatInput } from '@angular/material/input';
import { MatIcon } from '@angular/material/icon';
import { MatExpansionPanel, MatExpansionPanelHeader, MatExpansionPanelTitle } from '@angular/material/expansion';

import { Bar, generateStep, OhlcvChartComponent, SwatchesSelectComponent, FrequencyResponseChartComponent } from 'mb';
import { KatexInlineComponent, KatexDisplayComponent } from 'mb';
import { Scalar } from 'mb';
import { Configuration } from 'mb';
import { LineData } from 'mb';
import { T3ExponentialMovingAverage } from 'mb';
import { predefinedLinePalettes } from 'mb';
import { T3ExponentialMovingAverageLengthParams, T3ExponentialMovingAverageSmoothingFactorParams } from 'mb';
import { FrequencyResponse, FrequencyResponseResult, BarComponent, barComponentValue } from 'mb';

import { ContentSettingsService } from '../../../../shared/content-settings/content-settings.service';
import { BarSeriesService } from '../../../../shared/data/bar-series/bar-series.service';
import { BarSeries } from '../../../../shared/data/bar-series/bar-series.interface';
import { BarSeriesSelectComponent } from '../../../../shared/data/bar-series/bar-series-select/bar-series-select.component';
import { simpleMovingAverageNote, exponentialMovingAverageNote } from '../../../../notes';
import { doubleExponentialMovingAverageNote, tripleExponentialMovingAverageNote } from '../../../../notes';
import { t2ExponentialMovingAverageNote, t3ExponentialMovingAverageNote } from '../../../../notes';
import { T3emaLengthInput } from './t3ema-input.interface';
import { T3ema } from './t3ema.interface';
import { T3emaListComponent } from './t3ema-list.component';

const sl = 4096;
const stepMin = 10;
const stepMax = 90;
const stepSpread = 1;
const stepCount = 32;

const guardLength = (object: any): object is T3ExponentialMovingAverageLengthParams => 'length' in object;

const calculateT3ema = (bars: Bar[], t3ema: T3ExponentialMovingAverage, barComponent: BarComponent): Scalar[]  => {
  const scalars: Scalar[] = [];
  const f = barComponentValue(barComponent);
  for (const bar of bars) {
    scalars.push({time: bar.time, value: t3ema.update(f(bar))});
  }

  return scalars;
};

const calculateStep = (bars: Bar[], t3ema: T3ExponentialMovingAverage, barComponent: BarComponent): Scalar[]  => {
  const f = barComponentValue(barComponent);
  const val = f(bars[0]);
  while (!t3ema.isPrimed) {
    t3ema.update(val);
  }

  const scalars: Scalar[] = [];
  for (const bar of bars) {
    scalars.push({time: bar.time, value: t3ema.update(f(bar))});
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
  selector: 'app-ind-t3ema',
  templateUrl: './t3ema.component.html',
  styleUrls: ['./t3ema.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [
    FormsModule,
    MatFormField,
    MatLabel,
    MatInput,
    MatIcon,
    MatExpansionPanel,
    MatExpansionPanelHeader,
    MatExpansionPanelTitle,
    BarSeriesSelectComponent,
    OhlcvChartComponent,
    SwatchesSelectComponent,
    KatexInlineComponent,
    KatexDisplayComponent,
    FrequencyResponseChartComponent,
    T3emaListComponent
  ]
})
export class T3emaComponent implements AfterViewInit {
  private readonly barSeriesService = inject(BarSeriesService);
  protected dataSelection: BarSeries = this.barSeriesService.series()[0] as BarSeries;
  protected readonly csvc = inject(ContentSettingsService);

  private indicators: T3ema[] = [];
  protected initialized = false;
  protected selectedIndex = 0; // 20

  protected readonly initialIndicators: T3emaLengthInput = {
    length: [2,4,6], vFactor: 0.7, firstIsAverage: false, barComponent: BarComponent.Median, showStyle: true
  };

  protected readonly initialFreqs: T3emaLengthInput = {
    length: [2,4,6], vFactor: 0.7, firstIsAverage: false, showStyle: false
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

  protected palettes: string[][] = predefinedLinePalettes(this.initialIndicators.length.length);
  protected selectedPalette: string[] = this.palettes[this.selectedIndex];
  protected smaNote = simpleMovingAverageNote;
  protected emaNote = exponentialMovingAverageNote;
  protected demaNote = doubleExponentialMovingAverageNote;
  protected temaNote = tripleExponentialMovingAverageNote;
  protected t2emaNote = t2ExponentialMovingAverageNote;
  protected t3emaNote = t3ExponentialMovingAverageNote;
  protected configuration!: Configuration;
  protected freqs: FrequencyResponseResult[] = [];
  protected freqsMaxPeriod = 40;
  protected freqsHeight = 300;

  protected configurationStepUp!: Configuration;
  protected configurationStepDn!: Configuration;
  protected dataStepUp = generateStep(stepMin, stepCount, stepMax, stepCount * 3, stepSpread);
  protected dataStepDn = generateStep(stepMax, stepCount, stepMin, stepCount * 3, stepSpread);

  protected t3ema1l = FrequencyResponse.calculate(sl, new T3ExponentialMovingAverage({length: 2, vFactor: 0.7, firstIsAverage: false}), 2*6);
  protected t3ema2l = FrequencyResponse.calculate(sl, new T3ExponentialMovingAverage({length: 6, vFactor: 0.7, firstIsAverage: false}), 5*6);
  protected t3ema3l = FrequencyResponse.calculate(sl, new T3ExponentialMovingAverage({length: 10, vFactor: 0.7, firstIsAverage: false}), 10*6);
  protected t3ema1v = FrequencyResponse.calculate(sl, new T3ExponentialMovingAverage({length: 6, vFactor: 0.2, firstIsAverage: false}), 6*6);
  protected t3ema2v = FrequencyResponse.calculate(sl, new T3ExponentialMovingAverage({length: 6, vFactor: 0.5, firstIsAverage: false}), 6*6);
  protected t3ema3v = FrequencyResponse.calculate(sl, new T3ExponentialMovingAverage({length: 6, vFactor: 0.9, firstIsAverage: false}), 6*6);

  constructor() {
    effect(() => {
      void this.csvc.enableChartEditing(); // Read signal to make effect reactive
      this.indicatorPaletteChanged(this.selectedPalette);
      if (this.initialized) {
        this.render();
      }
    });
  }

  ngAfterViewInit() {
    this.initialized = true;
    this.render();
  }

  protected indicatorPaletteChanged(palette: string[]) {
    this.selectedIndex = this.palettes.indexOf(palette);
    this.selectedPalette = palette;
  }

  protected indicatorsChanged(arr: T3ema[]) {
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

  protected freqsChanged(arr: T3ema[]) {
    const frrs: FrequencyResponseResult[] = [];
    for (const el of arr) {
      if (guardLength(el.params)) {
         const p = el.params as T3ExponentialMovingAverageLengthParams;
         const frr = FrequencyResponse.calculate(sl,
           new T3ExponentialMovingAverage({length: p.length, vFactor: p.vFactor, firstIsAverage: p.firstIsAverage}), p.length*6);
         frrs.push(frr);
      } else {
         const p = el.params as T3ExponentialMovingAverageSmoothingFactorParams;
         const l = Math.ceil(2 / p.smoothingFactor - 1);
         const frr = FrequencyResponse.calculate(sl, new T3ExponentialMovingAverage({smoothingFactor: p.smoothingFactor, vFactor: p.vFactor}), l*2);
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
    this.configurationStepUp = this.prepareConfig('', this.dataStepUp, true, this.indicators);
    this.configurationStepDn = this.prepareConfig('', this.dataStepDn, true, this.indicators);
    this.lengthComparisonUpCofig = this.prepareComparisonConfig('', this.dataStepUp, true, this.lengthComparison);
    this.lengthComparisonDnCofig = this.prepareComparisonConfig('', this.dataStepDn, true, this.lengthComparison);
    this.volumeFactorComparisonUpCofig = this.prepareComparisonConfig('', this.dataStepUp, true, this.volumeFactorComparison);
    this.volumeFactorComparisonDnCofig = this.prepareComparisonConfig('', this.dataStepDn, true, this.volumeFactorComparison);
  }

  private prepareConfig(mnemonic: string, bars: Bar[], doStep: boolean, indicators: T3ema[]): Configuration {
    const cloned = getConfigTemplate();
    cloned.menuVisible = this.csvc.enableChartEditing();
    cloned.ohlcv.name = mnemonic;
    cloned.ohlcv.data = bars;

    for (const el of indicators) {
      const component = el.params.barComponent ? el.params.barComponent : BarComponent.Close;
      const indicator = new T3ExponentialMovingAverage(el.params);
      const lineData = new LineData();
      lineData.name = indicator.getMnemonic();
      lineData.data = doStep ? calculateStep(bars, indicator, component) : calculateT3ema(bars, indicator, component);
      const s = el.style;
      lineData.color = s.color;
      lineData.width = s.width;
      lineData.dash = s.dash;
      lineData.interpolation = s.interpolation;
      cloned.pricePane.lines.push(lineData);
    }

    return cloned;
  }

  protected lengthComparisonUpCofig!: Configuration;
  protected lengthComparisonDnCofig!: Configuration;
  protected volumeFactorComparisonUpCofig!: Configuration;
  protected volumeFactorComparisonDnCofig!: Configuration;
  private readonly lengthComparison: T3ExponentialMovingAverageLengthParams[] = [
    {length: 2, vFactor: 0.7, firstIsAverage: false, barComponent: BarComponent.Close},
    {length: 4, vFactor: 0.7, firstIsAverage: false, barComponent: BarComponent.Close},
    {length: 6, vFactor: 0.7, firstIsAverage: false, barComponent: BarComponent.Close},
  ];
  private readonly volumeFactorComparison: T3ExponentialMovingAverageLengthParams[] = [
    {length: 4, vFactor: 0.3, firstIsAverage: false, barComponent: BarComponent.Close},
    {length: 4, vFactor: 0.6, firstIsAverage: false, barComponent: BarComponent.Close},
    {length: 4, vFactor: 0.9, firstIsAverage: false, barComponent: BarComponent.Close},
  ];

  private prepareComparisonConfig(mnemonic: string, bars: Bar[], doStep: boolean, indicators: T3ExponentialMovingAverageLengthParams[]): Configuration {
    const cloned = getConfigTemplate();
    cloned.menuVisible = this.csvc.enableChartEditing();
    cloned.ohlcv.name = mnemonic;
    cloned.ohlcv.data = bars;

    const n = indicators.length > 2 ? indicators.length : 2;
    let selectedPalette = this.palettes[this.selectedIndex];
    if (n !== this.selectedPalette.length) {
      const palettes = predefinedLinePalettes(n);
      selectedPalette = palettes[this.selectedIndex];
    }

    let i = 0;
    for (const el of indicators) {
      const indicator = new T3ExponentialMovingAverage(el);
      const lineData = new LineData();
      lineData.name = indicator.getMnemonic();
      lineData.data = doStep ? calculateStep(bars, indicator, BarComponent.Close) : calculateT3ema(bars, indicator, BarComponent.Close);
      lineData.color = selectedPalette[i];
      lineData.width = 1.5;
      lineData.dash = '';
      lineData.interpolation = 'linear';
      cloned.pricePane.lines.push(lineData);
      i++;
    }

    return cloned;
  }
}

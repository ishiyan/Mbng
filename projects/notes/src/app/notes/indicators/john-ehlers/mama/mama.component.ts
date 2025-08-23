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
import { MesaAdaptiveMovingAverage } from 'mb';
import { predefinedLinePalettes } from 'mb';
import { MesaAdaptiveMovingAverageLengthParams, MesaAdaptiveMovingAverageSmoothingFactorParams } from 'mb';
import { FrequencyResponse, FrequencyResponseResult, BarComponent, barComponentValue } from 'mb';

import { ContentSettingsService } from '../../../../shared/content-settings/content-settings.service';
import { BarSeriesService } from '../../../../shared/data/bar-series/bar-series.service';
import { BarSeries } from '../../../../shared/data/bar-series/bar-series.interface';
import { BarSeriesSelectComponent } from '../../../../shared/data/bar-series/bar-series-select/bar-series-select.component';
import { ehlersMesaAdaptiveMovingAverageNote, exponentialMovingAverageNote } from '../../../../notes';
import { frequencyResponseOfAnIndicatorNote } from '../../../../notes';
import { MamaLengthInput } from './mama-input.interface';
import { Mama } from './mama.interface';
import { MamaListComponent } from './mama-list.component';

const sl = 4096;
const stepMin = 10;
const stepMax = 90;
const stepSpread = 1;
const stepCount = 32;

const guardLength = (object: any): object is MesaAdaptiveMovingAverageLengthParams => 'fastLimitLength' in object;

const calculateMama = (bars: Bar[], mama: MesaAdaptiveMovingAverage, barComponent: BarComponent): [Scalar[], Scalar[]] => {
  const scalarsMama: Scalar[] = [];
  const scalarsFama: Scalar[] = [];
  const f = barComponentValue(barComponent);
  for (const bar of bars) {
    scalarsMama.push({ time: bar.time, value: mama.update(f(bar)) });
    scalarsFama.push({ time: bar.time, value: mama.getFama() });
  }

  return [scalarsMama, scalarsFama];
};

const calculateStep = (bars: Bar[], mama: MesaAdaptiveMovingAverage, barComponent: BarComponent): [Scalar[], Scalar[]] => {
  const f = barComponentValue(barComponent);
  const val = f(bars[0]);
  while (!mama.isPrimed) {
    mama.update(val);
  }

  const scalarsMama: Scalar[] = [];
  const scalarsFama: Scalar[] = [];
  for (const bar of bars) {
    scalarsMama.push({ time: bar.time, value: mama.update(f(bar)) });
    scalarsFama.push({ time: bar.time, value: mama.getFama() });
  }

  return [scalarsMama, scalarsFama];
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
  selector: 'app-ind-mama',
  templateUrl: './mama.component.html',
  styleUrls: ['./mama.component.scss'],
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
    MamaListComponent
  ]
})
export class MamaComponent implements AfterViewInit {
  private readonly barSeriesService = inject(BarSeriesService);
  protected dataSelection: BarSeries = this.barSeriesService.series()[0] as BarSeries;
  protected readonly csvc = inject(ContentSettingsService);

  private indicators: Mama[] = [];
  protected initialized = false;
  protected selectedIndex = 0;

  private readonly indicatorsLen: Mama[] = [
    {
      id: 551,
      params: {
        estimatorParams: {
          smoothingLength: 2, alphaEmaQuadratureInPhase: 0.2, alphaEmaPeriod: 0.2
        }, fastLimitLength: 2, slowLimitLength: 30
      },
      style: { color: 'red', width: 1, dash: 'solid', interpolation: 'linear' },
      showStyle: true
    },
    {
      id: 552,
      params: {
        estimatorParams: {
          smoothingLength: 3, alphaEmaQuadratureInPhase: 0.2, alphaEmaPeriod: 0.2
        }, fastLimitLength: 2, slowLimitLength: 30
      },
      style: { color: 'green', width: 1, dash: 'solid', interpolation: 'linear' },
      showStyle: true
    },
    {
      id: 553,
      params: {
        estimatorParams: {
          smoothingLength: 4, alphaEmaQuadratureInPhase: 0.2, alphaEmaPeriod: 0.2
        }, fastLimitLength: 2, slowLimitLength: 30
      },
      style: { color: 'blue', width: 1, dash: 'solid', interpolation: 'linear' },
      showStyle: true
    }
  ];

  private readonly indicatorsFast: Mama[] = [
    {
      id: 561,
      params: { fastLimitLength: 2, slowLimitLength: 30 },
      style: { color: 'red', width: 1, dash: 'solid', interpolation: 'linear' },
      showStyle: true
    },
    {
      id: 562,
      params: { fastLimitLength: 5, slowLimitLength: 30 },
      style: { color: 'green', width: 1, dash: 'solid', interpolation: 'linear' },
      showStyle: true
    },
    {
      id: 563,
      params: { fastLimitLength: 8, slowLimitLength: 30 },
      style: { color: 'blue', width: 1, dash: 'solid', interpolation: 'linear' },
      showStyle: true
    }
  ];

  private readonly indicatorsSlow: Mama[] = [
    {
      id: 571,
      params: { fastLimitLength: 2, slowLimitLength: 10 },
      style: { color: 'red', width: 1, dash: 'solid', interpolation: 'linear' },
      showStyle: true
    },
    {
      id: 572,
      params: { fastLimitLength: 2, slowLimitLength: 30 },
      style: { color: 'green', width: 1, dash: 'solid', interpolation: 'linear' },
      showStyle: true
    },
    {
      id: 573,
      params: { fastLimitLength: 2, slowLimitLength: 300 },
      style: { color: 'blue', width: 1, dash: 'solid', interpolation: 'linear' },
      showStyle: true
    }
  ];

  protected readonly initialIndicators: MamaLengthInput = {
    estimatorParams: [
      {
        smoothingLength: 2, alphaEmaQuadratureInPhase: 0.2, alphaEmaPeriod: 0.2
      }, {
        smoothingLength: 3, alphaEmaQuadratureInPhase: 0.2, alphaEmaPeriod: 0.2
      }, {
        smoothingLength: 4, alphaEmaQuadratureInPhase: 0.2, alphaEmaPeriod: 0.2
      }
    ],
    fastLimitLength: 2, slowLimitLength: 30,
    barComponent: BarComponent.Median, showStyle: true
  };

  protected readonly initialFreqs: MamaLengthInput = {
    estimatorParams: [
      {
        smoothingLength: 2, alphaEmaQuadratureInPhase: 0.2, alphaEmaPeriod: 0.2
      }, {
        smoothingLength: 3, alphaEmaQuadratureInPhase: 0.2, alphaEmaPeriod: 0.2
      }, {
        smoothingLength: 4, alphaEmaQuadratureInPhase: 0.2, alphaEmaPeriod: 0.2
      }
    ],
    fastLimitLength: 2, slowLimitLength: 30,
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

  protected palettes: string[][] = predefinedLinePalettes(
    this.initialIndicators.estimatorParams === undefined ?
      3 : this.initialIndicators.estimatorParams.length);
  protected selectedPalette: string[] = this.palettes[this.selectedIndex];
  protected mamaNote = ehlersMesaAdaptiveMovingAverageNote;
  protected emaNote = exponentialMovingAverageNote;
  protected froaiNote = frequencyResponseOfAnIndicatorNote;
  protected configuration!: Configuration;
  protected freqs: FrequencyResponseResult[] = [];
  protected freqsMaxPeriod = 40;
  protected freqsHeight = 300;

  protected configurationParamsLen!: Configuration;
  protected configurationParamsFast!: Configuration;
  protected configurationParamsSlow!: Configuration;

  protected configurationStepUpLen!: Configuration;
  protected configurationStepDnLen!: Configuration;
  protected configurationStepUpFast!: Configuration;
  protected configurationStepDnFast!: Configuration;
  protected dataStepUp = generateStep(stepMin, stepCount, stepMax, stepCount * 3, stepSpread);
  protected dataStepDn = generateStep(stepMax, stepCount, stepMin, stepCount * 3, stepSpread);

  protected mamaLen2 = FrequencyResponse.calculate(sl, new MesaAdaptiveMovingAverage({
    estimatorParams: { smoothingLength: 2, alphaEmaQuadratureInPhase: 0.2, alphaEmaPeriod: 0.2 },
    fastLimitLength: 2, slowLimitLength: 30
  }), 4);
  protected mamaLen5 = FrequencyResponse.calculate(sl, new MesaAdaptiveMovingAverage({
    estimatorParams: { smoothingLength: 3, alphaEmaQuadratureInPhase: 0.2, alphaEmaPeriod: 0.2 },
    fastLimitLength: 2, slowLimitLength: 30
  }), 10);
  protected mamaLen10 = FrequencyResponse.calculate(sl, new MesaAdaptiveMovingAverage({
    estimatorParams: { smoothingLength: 4, alphaEmaQuadratureInPhase: 0.2, alphaEmaPeriod: 0.2 },
    fastLimitLength: 2, slowLimitLength: 30
  }), 20);
  protected mamaLen20 = FrequencyResponse.calculate(sl, new MesaAdaptiveMovingAverage({
    estimatorParams: { smoothingLength: 4, alphaEmaQuadratureInPhase: 0.2, alphaEmaPeriod: 0.2 },
    fastLimitLength: 2, slowLimitLength: 30
  }), 40);

  protected mamaFast2 = FrequencyResponse.calculate(sl, new MesaAdaptiveMovingAverage({
    estimatorParams: { smoothingLength: 4, alphaEmaQuadratureInPhase: 0.2, alphaEmaPeriod: 0.2 },
    fastLimitLength: 2, slowLimitLength: 30
  }), 10 * 2);
  protected mamaFast3 = FrequencyResponse.calculate(sl, new MesaAdaptiveMovingAverage({
    estimatorParams: { smoothingLength: 4, alphaEmaQuadratureInPhase: 0.2, alphaEmaPeriod: 0.2 },
    fastLimitLength: 3, slowLimitLength: 30
  }), 10 * 2);
  protected mamaFast5 = FrequencyResponse.calculate(sl, new MesaAdaptiveMovingAverage({
    estimatorParams: { smoothingLength: 4, alphaEmaQuadratureInPhase: 0.2, alphaEmaPeriod: 0.2 },
    fastLimitLength: 5, slowLimitLength: 30
  }), 10 * 2);
  protected mamaFast10 = FrequencyResponse.calculate(sl, new MesaAdaptiveMovingAverage({
    estimatorParams: { smoothingLength: 4, alphaEmaQuadratureInPhase: 0.2, alphaEmaPeriod: 0.2 },
    fastLimitLength: 10, slowLimitLength: 30
  }), 10 * 2);

  protected mamaSlow10 = FrequencyResponse.calculate(sl, new MesaAdaptiveMovingAverage({
    estimatorParams: { smoothingLength: 4, alphaEmaQuadratureInPhase: 0.2, alphaEmaPeriod: 0.2 },
    fastLimitLength: 4, slowLimitLength: 10
  }), 10 * 2);
  protected mamaSlow30 = FrequencyResponse.calculate(sl, new MesaAdaptiveMovingAverage({
    estimatorParams: { smoothingLength: 4, alphaEmaQuadratureInPhase: 0.2, alphaEmaPeriod: 0.2 },
    fastLimitLength: 4, slowLimitLength: 30
  }), 10 * 2);
  protected mamaSlow300 = FrequencyResponse.calculate(sl, new MesaAdaptiveMovingAverage({
    estimatorParams: { smoothingLength: 4, alphaEmaQuadratureInPhase: 0.2, alphaEmaPeriod: 0.2 },
    fastLimitLength: 4, slowLimitLength: 300
  }), 10 * 2);

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

  protected indicatorsChanged(arr: Mama[]) {
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

  protected freqsChanged(arr: Mama[]) {
    const frrs: FrequencyResponseResult[] = [];
    for (const el of arr) {
      if (guardLength(el.params)) {
        const p = el.params as MesaAdaptiveMovingAverageLengthParams;
        const frr = FrequencyResponse.calculate(sl,
          new MesaAdaptiveMovingAverage({
            estimatorParams: {
              smoothingLength: p.estimatorParams!.smoothingLength,
              alphaEmaQuadratureInPhase: p.estimatorParams!.alphaEmaQuadratureInPhase,
              alphaEmaPeriod: p.estimatorParams!.alphaEmaPeriod
            },
            fastLimitLength: p.fastLimitLength, slowLimitLength: p.slowLimitLength
          }), p.estimatorParams!.smoothingLength * 2);
        frrs.push(frr);
      } else {
        const p = el.params as MesaAdaptiveMovingAverageSmoothingFactorParams;
        const frr = FrequencyResponse.calculate(sl,
          new MesaAdaptiveMovingAverage({
            estimatorParams: {
              smoothingLength: p.estimatorParams!.smoothingLength,
              alphaEmaQuadratureInPhase: p.estimatorParams!.alphaEmaQuadratureInPhase,
              alphaEmaPeriod: p.estimatorParams!.alphaEmaPeriod
            },
            fastLimitSmoothingFactor: p.fastLimitSmoothingFactor,
            slowLimitSmoothingFactor: p.slowLimitSmoothingFactor
          }), p.estimatorParams!.smoothingLength * 2);
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
    this.fixColors(this.indicatorsLen);
    this.fixColors(this.indicatorsFast);
    this.fixColors(this.indicatorsSlow);
    this.configurationParamsLen = this.prepareConfig(this.dataSelection.mnemonic, this.dataSelection.data, false, this.indicatorsLen);
    this.configurationParamsFast = this.prepareConfig(this.dataSelection.mnemonic, this.dataSelection.data, false, this.indicatorsFast);
    this.configurationParamsSlow = this.prepareConfig(this.dataSelection.mnemonic, this.dataSelection.data, false, this.indicatorsSlow);
    this.configurationStepUpLen = this.prepareConfig('', this.dataStepUp, true, this.indicatorsLen);
    this.configurationStepDnLen = this.prepareConfig('', this.dataStepDn, true, this.indicatorsLen);
    this.configurationStepUpFast = this.prepareConfig('', this.dataStepUp, true, this.indicatorsFast);
    this.configurationStepDnFast = this.prepareConfig('', this.dataStepDn, true, this.indicatorsFast);
  }

  private prepareConfig(mnemonic: string, bars: Bar[], doStep: boolean, indicators: Mama[]): Configuration {
    const cloned = getConfigTemplate();
    cloned.menuVisible = this.csvc.enableChartEditing();
    cloned.ohlcv.name = mnemonic;
    cloned.ohlcv.data = bars;

    for (const el of indicators) {
      const component = el.params.barComponent ? el.params.barComponent : BarComponent.Close;
      const indicator = new MesaAdaptiveMovingAverage(el.params);
      const lineData = new LineData();
      const lineData1 = new LineData();
      lineData.name = indicator.getMnemonic();
      lineData1.name = indicator.getMnemonicFama();
      const output = doStep ? calculateStep(bars, indicator, component) : calculateMama(bars, indicator, component);
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

  private fixColors(indicators: Mama[]): void {
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

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
import { JurikMovingAverage } from 'mb';
import { predefinedLinePalettes } from 'mb';
import { JurikMovingAverageParams } from 'mb';
import { FrequencyResponse, FrequencyResponseResult, BarComponent, barComponentValue } from 'mb';

import { BarSeries } from '../../../../shared/data/bar-series/bar-series.interface';
import { BarSeriesSelectComponent } from '../../../../shared/data/bar-series/bar-series-select/bar-series-select.component';
import { jurikMovingAverageNote } from '../../../../notes';
import { frequencyResponseOfAnIndicatorNote } from '../../../../notes';
import { JmaInput } from './jma-input.interface';
import { Jma } from './jma.interface';
import { JmaListComponent } from './jma-list.component';

const isUnlocked = false;
const sl = 4096;
const stepMin = 10;
const stepMax = 90;
const stepSpread = 1;
const stepCount = 32;

const calculateJma = (bars: Bar[], jma: JurikMovingAverage, barComponent: BarComponent): Scalar[]  => {
  const scalars: Scalar[] = [];
  const f = barComponentValue(barComponent);
  for (const bar of bars) {
    scalars.push({time: bar.time, value: jma.update(f(bar))});
  }

  return scalars;
};

const calculateStep = (bars: Bar[], jma: JurikMovingAverage, barComponent: BarComponent): Scalar[]  => {
  const f = barComponentValue(barComponent);
  const val = f(bars[0]);
  while (!jma.isPrimed) {
    jma.update(val);
  }

  const scalars: Scalar[] = [];
  for (const bar of bars) {
    scalars.push({time: bar.time, value: jma.update(f(bar))});
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
  selector: 'app-ind-jma',
  templateUrl: './jma.component.html',
  styleUrls: ['./jma.component.scss'],
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
    JmaListComponent
  ]
})
export class JmaComponent implements AfterViewInit {

  private indicators: Jma[] = [];
  private initialized = false;
  protected selectedIndex = 0;

  private readonly indicatorsLe: Jma[] = [
    {
      id: 551,
      params: { length: 5, phase: 0},
      style: { color: 'red', width: 1, dash: 'solid', interpolation: 'linear' },
      showStyle: true
    },
    {
      id: 552,
      params: { length: 10, phase: 0},
      style: { color: 'green', width: 1, dash: 'solid', interpolation: 'linear' },
      showStyle: true
    },
    {
      id: 553,
      params: { length: 15, phase: 0},
      style: { color: 'blue', width: 1, dash: 'solid', interpolation: 'linear' },
      showStyle: true
    }
  ];

  private readonly indicatorsPh: Jma[] = [
    {
      id: 561,
      params: { length: 10, phase: -50},
      style: { color: 'red', width: 1, dash: 'solid', interpolation: 'linear' },
      showStyle: true
    },
    {
      id: 562,
      params: { length: 10, phase: 0},
      style: { color: 'green', width: 1, dash: 'solid', interpolation: 'linear' },
      showStyle: true
    },
    {
      id: 563,
      params: { length: 10, phase: 50},
      style: { color: 'blue', width: 1, dash: 'solid', interpolation: 'linear' },
      showStyle: true
    }
  ];
  
  protected readonly initialIndicators: JmaInput = {
    length: [5,10,20], phase: [0],
    barComponent: BarComponent.Median, showStyle: true
  };

  protected readonly initialFreqs: JmaInput = {
    length: [5,10,20], phase: [0],
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
  protected jmaNote = jurikMovingAverageNote;
  protected froaiNote = frequencyResponseOfAnIndicatorNote;
  protected dataSelection!: BarSeries;
  protected configuration!: Configuration;
  protected freqs: FrequencyResponseResult[] = [];
  protected freqsMaxPeriod = 40;
  protected freqsHeight = 300;
  protected unlocked = true;

  protected configurationParamsLe!: Configuration;
  protected configurationParamsPh!: Configuration;

  protected configurationStepUpLe!: Configuration;
  protected configurationStepDnLe!: Configuration;
  protected configurationStepUpPh!: Configuration;
  protected configurationStepDnPh!: Configuration;
  protected dataStepUp = generateStep(stepMin, stepCount, stepMax, stepCount * 3, stepSpread);
  protected dataStepDn = generateStep(stepMax, stepCount, stepMin, stepCount * 3, stepSpread);

  protected jmaLe2 = FrequencyResponse.calculate(sl, new JurikMovingAverage({ length: 2, phase: 0}), 2*30);
  protected jmaLe5 = FrequencyResponse.calculate(sl, new JurikMovingAverage({ length: 5, phase: 0}), 2*30);
  protected jmaLe10 = FrequencyResponse.calculate(sl, new JurikMovingAverage({ length: 10, phase: 20}), 2*30);
  protected jmaLe20 = FrequencyResponse.calculate(sl, new JurikMovingAverage({ length: 20, phase: 0}), 2*30);

  protected jmaPhMin50 = FrequencyResponse.calculate(sl, new JurikMovingAverage({ length: 10, phase: -50}), 2*30);
  protected jmaPh0 = FrequencyResponse.calculate(sl, new JurikMovingAverage({ length: 10, phase: 0}), 2*30);
  protected jmaPh10 = FrequencyResponse.calculate(sl, new JurikMovingAverage({ length: 10, phase: 10}), 2*30);
  protected jmaPh50 = FrequencyResponse.calculate(sl, new JurikMovingAverage({ length: 10, phase: 50}), 2*30);
    
  ngAfterViewInit() {
    this.initialized = true;
    this.unlocked = isUnlocked;
    this.render();
  }

  protected indicatorPaletteChanged(palette: string[]) {
    this.selectedIndex = this.palettes.indexOf(palette);
    this.selectedPalette = palette;
  }

  protected indicatorsChanged(arr: Jma[]) {
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

  protected freqsChanged(arr: Jma[]) {
    const frrs: FrequencyResponseResult[] = [];
    for (const el of arr) {
      const p = el.params as JurikMovingAverageParams;
      const frr = FrequencyResponse.calculate(sl,
        new JurikMovingAverage({
          length: p.length, phase: p.phase
        }), 2*30);
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
    this.fixColors(this.indicatorsLe);
    this.fixColors(this.indicatorsPh);
    this.configurationParamsLe = this.prepareConfig(this.dataSelection.mnemonic, this.dataSelection.data, false, this.indicatorsLe);
    this.configurationParamsPh = this.prepareConfig(this.dataSelection.mnemonic, this.dataSelection.data, false, this.indicatorsPh);
    this.configurationStepUpLe = this.prepareConfig('', this.dataStepUp, true, this.indicatorsLe);
    this.configurationStepDnLe = this.prepareConfig('', this.dataStepDn, true, this.indicatorsLe);
    this.configurationStepUpPh = this.prepareConfig('', this.dataStepUp, true, this.indicatorsPh);
    this.configurationStepDnPh = this.prepareConfig('', this.dataStepDn, true, this.indicatorsPh);
  }

  private prepareConfig(mnemonic: string, bars: Bar[], doStep: boolean, indicators: Jma[]): Configuration {
    const cloned = getConfigTemplate();
    cloned.menuVisible = this.unlocked;
    cloned.ohlcv.name = mnemonic;
    cloned.ohlcv.data = bars;

    for (const el of indicators) {
      const component = el.params.barComponent ? el.params.barComponent : BarComponent.Close;
      const indicator = new JurikMovingAverage(el.params);
      const lineData = new LineData();
      lineData.name = indicator.getMnemonic();
      lineData.data = doStep ? calculateStep(bars, indicator, component) : calculateJma(bars, indicator, component);
      const s = el.style;
      lineData.color = s.color;
      lineData.width = s.width;
      lineData.dash = s.dash;
      lineData.interpolation = s.interpolation;
      cloned.pricePane.lines.push(lineData);
    }

    return cloned;
  }

  private fixColors(indicators: Jma[]): void {
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

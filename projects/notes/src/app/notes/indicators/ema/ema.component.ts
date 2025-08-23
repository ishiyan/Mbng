import { AfterViewInit, ChangeDetectionStrategy, Component, inject } from '@angular/core';
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
import { ExponentialMovingAverage } from 'mb';
import { predefinedLinePalettes } from 'mb';
import { ExponentialMovingAverageLengthParams, ExponentialMovingAverageSmoothingFactorParams } from 'mb';
import { FrequencyResponse, FrequencyResponseResult, BarComponent, barComponentValue } from 'mb';

import { BarSeriesService } from '../../../shared/data/bar-series/bar-series.service';
import { BarSeries } from '../../../shared/data/bar-series/bar-series.interface';
import { BarSeriesSelectComponent } from '../../../shared/data/bar-series/bar-series-select/bar-series-select.component';
import { simpleMovingAverageNote, exponentialMovingAverageNote, frequencyResponseOfAnIndicatorNote } from '../../../notes';
import { EmaLengthInput } from './ema-input.interface';
import { Ema } from './ema.interface';
import { EmaListComponent } from './ema-list.component';

const isUnlocked = false;
const sl = 4096;
const stepMin = 10;
const stepMax = 90;
const stepSpread = 1;
const stepCount = 32;

const guardLength = (object: any): object is ExponentialMovingAverageLengthParams => 'length' in object;

const calculateEma = (bars: Bar[], ema: ExponentialMovingAverage, barComponent: BarComponent): Scalar[]  => {
  const scalars: Scalar[] = [];
  const f = barComponentValue(barComponent);
  for (const bar of bars) {
    scalars.push({time: bar.time, value: ema.update(f(bar))});
  }

  return scalars;
};

const calculateStep = (bars: Bar[], ema: ExponentialMovingAverage, barComponent: BarComponent): Scalar[]  => {
  const f = barComponentValue(barComponent);
  const val = f(bars[0]);
  while (!ema.isPrimed) {
    ema.update(val);
  }

  const scalars: Scalar[] = [];
  for (const bar of bars) {
    scalars.push({time: bar.time, value: ema.update(f(bar))});
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
  selector: 'app-ind-ema',
  templateUrl: './ema.component.html',
  styleUrls: ['./ema.component.scss'],
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
    EmaListComponent
  ]
})
export class EmaComponent implements AfterViewInit {
  private readonly barSeriesService = inject(BarSeriesService);
  protected dataSelection: BarSeries = this.barSeriesService.series()[0] as BarSeries;

  private indicators: Ema[] = [];
  private initialized = false;
  protected selectedIndex = 0; // 20

  protected readonly initialIndicators: EmaLengthInput = {
    length: [5,10,20], firstIsAverage: false, barComponent: BarComponent.Median, showStyle: true
  };

  protected readonly initialFreqs: EmaLengthInput = {
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
  protected smaNote = simpleMovingAverageNote;
  protected emaNote = exponentialMovingAverageNote;
  protected froaiNote = frequencyResponseOfAnIndicatorNote;
  protected configuration!: Configuration;
  protected freqs: FrequencyResponseResult[] = [];
  protected freqsMaxPeriod = 40;
  protected freqsHeight = 300;
  protected unlocked = true;

  protected configurationStepUp!: Configuration;
  protected configurationStepDn!: Configuration;
  protected dataStepUp = generateStep(stepMin, stepCount, stepMax, stepCount * 3, stepSpread);
  protected dataStepDn = generateStep(stepMax, stepCount, stepMin, stepCount * 3, stepSpread);

  protected ema2 = FrequencyResponse.calculate(sl, new ExponentialMovingAverage({length: 2, firstIsAverage: false}), 4);
  protected ema5 = FrequencyResponse.calculate(sl, new ExponentialMovingAverage({length: 5, firstIsAverage: false}), 10);
  protected ema10 = FrequencyResponse.calculate(sl, new ExponentialMovingAverage({length: 10, firstIsAverage: false}), 20);
  protected ema20 = FrequencyResponse.calculate(sl, new ExponentialMovingAverage({length: 20, firstIsAverage: false}), 40);

  ngAfterViewInit() {
    this.initialized = true;
    this.unlocked = isUnlocked;
    this.render();
  }

  protected indicatorPaletteChanged(palette: string[]) {
    this.selectedIndex = this.palettes.indexOf(palette);
    this.selectedPalette = palette;
  }

  protected indicatorsChanged(arr: Ema[]) {
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

  protected freqsChanged(arr: Ema[]) {
    const frrs: FrequencyResponseResult[] = [];
    for (const el of arr) {
      if (guardLength(el.params)) {
         const p = el.params as ExponentialMovingAverageLengthParams;
         const frr = FrequencyResponse.calculate(sl,
           new ExponentialMovingAverage({length: p.length, firstIsAverage: p.firstIsAverage}), p.length*2);
         frrs.push(frr);
      } else {
         const p = el.params as ExponentialMovingAverageSmoothingFactorParams;
         const l = Math.ceil(2 / p.smoothingFactor - 1);
         const frr = FrequencyResponse.calculate(sl, new ExponentialMovingAverage({smoothingFactor: p.smoothingFactor}), l*2);
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
      const indicator = new ExponentialMovingAverage(el.params);
      const lineData = new LineData();
      lineData.name = indicator.getMnemonic();
      lineData.data = doStep ? calculateStep(bars, indicator, component) : calculateEma(bars, indicator, component);
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

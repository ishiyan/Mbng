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
import { TripleExponentialMovingAverage } from 'mb';
import { predefinedLinePalettes } from 'mb';
import { TripleExponentialMovingAverageLengthParams, TripleExponentialMovingAverageSmoothingFactorParams } from 'mb';
import { FrequencyResponse, FrequencyResponseResult, BarComponent, barComponentValue } from 'mb';

import { BarSeries } from '../../../../shared/data/bar-series/bar-series.interface';
import { BarSeriesSelectComponent } from '../../../../shared/data/bar-series/bar-series-select/bar-series-select.component';
import { simpleMovingAverageNote, exponentialMovingAverageNote } from '../../../../notes';
import { doubleExponentialMovingAverageNote, tripleExponentialMovingAverageNote } from '../../../../notes';
import { frequencyResponseOfAnIndicatorNote } from '../../../../notes';
import { TemaLengthInput } from './tema-input.interface';
import { Tema } from './tema.interface';
import { TemaListComponent } from './tema-list.component';

const isUnlocked = false;
const sl = 4096;
const stepMin = 10;
const stepMax = 90;
const stepSpread = 1;
const stepCount = 60;

const guardLength = (object: any): object is TripleExponentialMovingAverageLengthParams => 'length' in object;

const calculateTema = (bars: Bar[], tema: TripleExponentialMovingAverage, barComponent: BarComponent): Scalar[] => {
  const scalars: Scalar[] = [];
  const f = barComponentValue(barComponent);
  for (const bar of bars) {
    scalars.push({time: bar.time, value: tema.update(f(bar))});
  }

  return scalars;
};

const calculateStep = (bars: Bar[], tema: TripleExponentialMovingAverage, barComponent: BarComponent): Scalar[] => {
  const f = barComponentValue(barComponent);
  const val = f(bars[0]);
  while (!tema.isPrimed) {
    tema.update(val);
  }

  const scalars: Scalar[] = [];
  for (const bar of bars) {
    scalars.push({time: bar.time, value: tema.update(f(bar))});
  }

  return scalars;
};

const calculateFrequencyResponse = (tema: TripleExponentialMovingAverage): FrequencyResponseResult => {
  while (!tema.isPrimed) {
    tema.update(0);
  }

  const fr = FrequencyResponse.calculate(sl, tema, 64);
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
  selector: 'app-ind-tema',
  templateUrl: './tema.component.html',
  styleUrls: ['./tema.component.scss'],
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
    TemaListComponent
  ]
})
export class TemaComponent implements AfterViewInit {

  private indicators: Tema[] = [];
  private initialized = false;
  protected selectedIndex = 0; // 20

  protected readonly initialIndicators: TemaLengthInput = {
    length: [5,10,20], firstIsAverage: false, barComponent: BarComponent.Median, showStyle: true
  };

  protected readonly initialFreqs: TemaLengthInput = {
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
  protected demaNote = doubleExponentialMovingAverageNote;
  protected temaNote = tripleExponentialMovingAverageNote;
  protected froaiNote = frequencyResponseOfAnIndicatorNote;
  protected dataSelection!: BarSeries;
  protected configuration!: Configuration;
  protected freqs: FrequencyResponseResult[] = [];
  protected freqsMaxPeriod = 40;
  protected freqsHeight = 300;
  protected unlocked = true;

  protected configurationStepUp!: Configuration;
  protected configurationStepDn!: Configuration;
  protected dataStepUp = generateStep(stepMin, stepCount, stepMax, stepCount * 2, stepSpread);
  protected dataStepDn = generateStep(stepMax, stepCount, stepMin, stepCount * 2, stepSpread);

  protected tema2 = calculateFrequencyResponse(new TripleExponentialMovingAverage({length: 2, firstIsAverage: true}));
  protected tema5 = calculateFrequencyResponse(new TripleExponentialMovingAverage({length: 5, firstIsAverage: false}));
  protected tema10 = calculateFrequencyResponse(new TripleExponentialMovingAverage({length: 10, firstIsAverage: false}));
  protected tema20 = calculateFrequencyResponse(new TripleExponentialMovingAverage({length: 20, firstIsAverage: false}));

  ngAfterViewInit() {
    this.initialized = true;
    this.unlocked = isUnlocked;
    this.render();
  }

  protected indicatorPaletteChanged(palette: string[]) {
    this.selectedIndex = this.palettes.indexOf(palette);
    this.selectedPalette = palette;
  }

  protected indicatorsChanged(arr: Tema[]) {
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

  protected freqsChanged(arr: Tema[]) {
    const frrs: FrequencyResponseResult[] = [];
    for (const el of arr) {
      if (guardLength(el.params)) {
         const p = el.params as TripleExponentialMovingAverageLengthParams;
         const frr = calculateFrequencyResponse(new TripleExponentialMovingAverage({length: p.length, firstIsAverage: p.firstIsAverage}));
         frrs.push(frr);
      } else {
         const p = el.params as TripleExponentialMovingAverageSmoothingFactorParams;
         const frr = calculateFrequencyResponse(new TripleExponentialMovingAverage({smoothingFactor: p.smoothingFactor}));
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
      const indicator = new TripleExponentialMovingAverage(el.params);
      const lineData = new LineData();
      lineData.name = indicator.getMnemonic();
      lineData.data = doStep ? calculateStep(bars, indicator, component) : calculateTema(bars, indicator, component);
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

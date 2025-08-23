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
import { DoubleExponentialMovingAverage } from 'mb';
import { predefinedLinePalettes } from 'mb';
import { DoubleExponentialMovingAverageLengthParams, DoubleExponentialMovingAverageSmoothingFactorParams } from 'mb';
import { FrequencyResponse, FrequencyResponseResult, BarComponent, barComponentValue } from 'mb';

import { ContentSettingsService } from '../../../../shared/content-settings/content-settings.service';
import { BarSeriesService } from '../../../../shared/data/bar-series/bar-series.service';
import { BarSeries } from '../../../../shared/data/bar-series/bar-series.interface';
import { BarSeriesSelectComponent } from '../../../../shared/data/bar-series/bar-series-select/bar-series-select.component';
import { simpleMovingAverageNote, exponentialMovingAverageNote } from '../../../../notes';
import { doubleExponentialMovingAverageNote, frequencyResponseOfAnIndicatorNote } from '../../../../notes';
import { DemaLengthInput } from './dema-input.interface';
import { Dema } from './dema.interface';
import { DemaListComponent } from './dema-list.component';

const sl = 4096;
const stepMin = 10;
const stepMax = 90;
const stepSpread = 1;
const stepCount = 40;

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
    DemaListComponent
  ]
})
export class DemaComponent implements AfterViewInit {
  private readonly barSeriesService = inject(BarSeriesService);
  protected dataSelection: BarSeries = this.barSeriesService.series()[0] as BarSeries;
  protected readonly csvc = inject(ContentSettingsService);

  private indicators: Dema[] = [];
  protected initialized = false;
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

  protected palettes: string[][] = predefinedLinePalettes(this.initialIndicators.length.length);
  protected selectedPalette: string[] = this.palettes[this.selectedIndex];
  protected smaNote = simpleMovingAverageNote;
  protected emaNote = exponentialMovingAverageNote;
  protected demaNote = doubleExponentialMovingAverageNote;
  protected froaiNote = frequencyResponseOfAnIndicatorNote;
  protected configuration!: Configuration;
  protected freqs: FrequencyResponseResult[] = [];
  protected freqsMaxPeriod = 40;
  protected freqsHeight = 300;

  protected configurationStepUp!: Configuration;
  protected configurationStepDn!: Configuration;
  protected dataStepUp = generateStep(stepMin, stepCount, stepMax, stepCount * 2, stepSpread);
  protected dataStepDn = generateStep(stepMax, stepCount, stepMin, stepCount * 2, stepSpread);

  protected dema2 = calculateFrequencyResponse(new DoubleExponentialMovingAverage({length: 2, firstIsAverage: false}));
  protected dema5 = calculateFrequencyResponse(new DoubleExponentialMovingAverage({length: 5, firstIsAverage: false}));
  protected dema10 = calculateFrequencyResponse(new DoubleExponentialMovingAverage({length: 10, firstIsAverage: false}));
  protected dema20 = calculateFrequencyResponse(new DoubleExponentialMovingAverage({length: 20, firstIsAverage: false}));

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
    cloned.menuVisible = this.csvc.enableChartEditing();
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

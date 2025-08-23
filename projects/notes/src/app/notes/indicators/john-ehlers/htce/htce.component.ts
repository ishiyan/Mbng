import { AfterViewInit, ChangeDetectionStrategy, Component, effect, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatIcon } from '@angular/material/icon';
import { MatExpansionPanel, MatExpansionPanelHeader, MatExpansionPanelTitle } from '@angular/material/expansion';

import { Bar, OhlcvChartComponent, SwatchesSelectComponent } from 'mb';
import { KatexInlineComponent, KatexDisplayComponent, SvgViewerComponent } from 'mb';
import { Scalar } from 'mb';
import { Configuration } from 'mb';
import { LineData } from 'mb';
import { HilbertTransformerCycleEstimator, createEstimator } from 'mb';
import { predefinedLinePalettes } from 'mb';
import { HilbertTransformerCycleEstimatorType, HilbertTransformerCycleEstimatorParams } from 'mb';
import { BarComponent, barComponentValue } from 'mb';

import { ContentSettingsService } from '../../../../shared/content-settings/content-settings.service';
import { BarSeriesService } from '../../../../shared/data/bar-series/bar-series.service';
import { BarSeries } from '../../../../shared/data/bar-series/bar-series.interface';
import { BarSeriesSelectComponent } from '../../../../shared/data/bar-series/bar-series-select/bar-series-select.component';
import { ehlersHilbertTransformerCycleEstimatorNote, exponentialMovingAverageNote } from '../../../../notes';
import { frequencyResponseOfAnIndicatorNote } from '../../../../notes';
import { HtceInput } from './htce-input.interface';
import { Htce } from './htce.interface';
import { HtceListComponent } from './htce-list.component';

const calculateHtce = (bars: Bar[], htce: HilbertTransformerCycleEstimator, barComponent: BarComponent): Scalar[] => {
  const scalars: Scalar[] = [];
  const f = barComponentValue(barComponent);
  for (const bar of bars) {
    htce.update(f(bar));
    scalars.push({ time: bar.time, value: htce.periodValue });
  }

  return scalars;
};

const estimatorMnemonic = (
  estimatorType: HilbertTransformerCycleEstimatorType,
  estimatorParams: HilbertTransformerCycleEstimatorParams): string => {
  let mnem = "hd";
  switch (estimatorType) {
    case HilbertTransformerCycleEstimatorType.HomodyneDiscriminator:
      mnem = "hd";
      break;
    case HilbertTransformerCycleEstimatorType.HomodyneDiscriminatorUnrolled:
      mnem = "hdu";
      break;
    case HilbertTransformerCycleEstimatorType.PhaseAccumulator:
      mnem = "pa";
      break;
    case HilbertTransformerCycleEstimatorType.DualDifferentiator:
      mnem = "dd";
      break;
  }

  mnem = mnem.concat("(",
    Math.floor(estimatorParams.smoothingLength).toString(), ", ",
    estimatorParams.alphaEmaQuadratureInPhase.toFixed(2), ", ",
    estimatorParams.alphaEmaPeriod.toFixed(2), ")");

  return mnem;
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
      bands: [], lineAreas: [], horizontals: [], lines: [], arrows: []
    }
  ],
  crosshair: false,
  volumeInPricePane: false,
  menuVisible: true, downloadSvgVisible: true
});

@Component({
  selector: 'app-ind-htce',
  templateUrl: './htce.component.html',
  styleUrls: ['./htce.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [
    FormsModule,
    MatIcon,
    MatExpansionPanel,
    MatExpansionPanelHeader,
    MatExpansionPanelTitle,
    BarSeriesSelectComponent,
    OhlcvChartComponent,
    SwatchesSelectComponent,
    KatexInlineComponent,
    KatexDisplayComponent,
    SvgViewerComponent,
    HtceListComponent
  ]
})
export class HtceComponent implements AfterViewInit {
  private readonly barSeriesService = inject(BarSeriesService);
  protected dataSelection: BarSeries = this.barSeriesService.series()[0] as BarSeries;
  protected readonly csvc = inject(ContentSettingsService);

  private indicators: Htce[] = [];
  protected initialized = false;
  protected selectedIndex = 0;

  private readonly indicatorsLen: Htce[] = [
    {
      id: 551,
      estimatorType: HilbertTransformerCycleEstimatorType.HomodyneDiscriminator,
      params: {
        smoothingLength: 2, alphaEmaQuadratureInPhase: 0.2, alphaEmaPeriod: 0.2
      },
      barComponent: BarComponent.Median,
      style: { color: 'red', width: 1, dash: 'solid', interpolation: 'linear' },
      showStyle: true
    },
    {
      id: 552,
      estimatorType: HilbertTransformerCycleEstimatorType.HomodyneDiscriminator,
      params: {
        smoothingLength: 3, alphaEmaQuadratureInPhase: 0.2, alphaEmaPeriod: 0.2
      },
      barComponent: BarComponent.Median,
      style: { color: 'green', width: 1, dash: 'solid', interpolation: 'linear' },
      showStyle: true
    },
    {
      id: 553,
      estimatorType: HilbertTransformerCycleEstimatorType.HomodyneDiscriminator,
      params: {
        smoothingLength: 4, alphaEmaQuadratureInPhase: 0.2, alphaEmaPeriod: 0.2
      },
      barComponent: BarComponent.Median,
      style: { color: 'blue', width: 1, dash: 'solid', interpolation: 'linear' },
      showStyle: true
    }
  ];

  private readonly indicatorsAlphaQuad: Htce[] = [
    {
      id: 561,
      estimatorType: HilbertTransformerCycleEstimatorType.HomodyneDiscriminator,
      params: {
        smoothingLength: 4, alphaEmaQuadratureInPhase: 0.02, alphaEmaPeriod: 0.2
      },
      barComponent: BarComponent.Median,
      style: { color: 'red', width: 1, dash: 'solid', interpolation: 'linear' },
      showStyle: true
    },
    {
      id: 562,
      estimatorType: HilbertTransformerCycleEstimatorType.HomodyneDiscriminator,
      params: {
        smoothingLength: 4, alphaEmaQuadratureInPhase: 0.2, alphaEmaPeriod: 0.2
      },
      barComponent: BarComponent.Median,
      style: { color: 'green', width: 1, dash: 'solid', interpolation: 'linear' },
      showStyle: true
    },
    {
      id: 563,
      estimatorType: HilbertTransformerCycleEstimatorType.HomodyneDiscriminator,
      params: {
        smoothingLength: 4, alphaEmaQuadratureInPhase: 0.4, alphaEmaPeriod: 0.2
      },
      barComponent: BarComponent.Median,
      style: { color: 'blue', width: 1, dash: 'solid', interpolation: 'linear' },
      showStyle: true
    }
  ];

  private readonly indicatorsAlphaPer: Htce[] = [
    {
      id: 571,
      estimatorType: HilbertTransformerCycleEstimatorType.HomodyneDiscriminator,
      params: {
        smoothingLength: 4, alphaEmaQuadratureInPhase: 0.2, alphaEmaPeriod: 0.02
      },
      barComponent: BarComponent.Median,
      style: { color: 'red', width: 1, dash: 'solid', interpolation: 'linear' },
      showStyle: true
    },
    {
      id: 572,
      estimatorType: HilbertTransformerCycleEstimatorType.HomodyneDiscriminator,
      params: {
        smoothingLength: 4, alphaEmaQuadratureInPhase: 0.2, alphaEmaPeriod: 0.2
      },
      barComponent: BarComponent.Median,
      style: { color: 'green', width: 1, dash: 'solid', interpolation: 'linear' },
      showStyle: true
    },
    {
      id: 573,
      estimatorType: HilbertTransformerCycleEstimatorType.HomodyneDiscriminator,
      params: {
        smoothingLength: 4, alphaEmaQuadratureInPhase: 0.2, alphaEmaPeriod: 0.4
      },
      barComponent: BarComponent.Median,
      style: { color: 'blue', width: 1, dash: 'solid', interpolation: 'linear' },
      showStyle: true
    }
  ];

  protected readonly initialIndicators: HtceInput = {
    estimatorType: [
      HilbertTransformerCycleEstimatorType.HomodyneDiscriminator,
      HilbertTransformerCycleEstimatorType.DualDifferentiator,
      HilbertTransformerCycleEstimatorType.PhaseAccumulator
    ],
    params: [
      {smoothingLength: 4, alphaEmaQuadratureInPhase: 0.2, alphaEmaPeriod: 0.2},
      {smoothingLength: 4, alphaEmaQuadratureInPhase: 0.15, alphaEmaPeriod: 0.15},
      {smoothingLength: 4, alphaEmaQuadratureInPhase: 0.15, alphaEmaPeriod: 0.25},
    ],
    barComponent: BarComponent.Median, showStyle: true
  };

  protected palettes: string[][] = predefinedLinePalettes(
    Math.max(3, this.initialIndicators.params.length));
  protected selectedPalette: string[] = this.palettes[this.selectedIndex];
  protected htceNote = ehlersHilbertTransformerCycleEstimatorNote;
  protected emaNote = exponentialMovingAverageNote;
  protected froaiNote = frequencyResponseOfAnIndicatorNote;
  protected configuration!: Configuration;

  protected configurationParamsLen!: Configuration;
  protected configurationParamsAlphaQuad!: Configuration;
  protected configurationParamsAlphaPer!: Configuration;

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

  protected indicatorsChanged(arr: Htce[]) {
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

  protected dataSelectionChanged(barSeries: BarSeries) {
    this.dataSelection = barSeries;
    this.render();
  }

  private render() {
    if (!this.initialized) {
      return;
    }

    this.configuration = this.prepareConfig(this.dataSelection.mnemonic, this.dataSelection.data, this.indicators);
    this.fixColors(this.indicatorsLen);
    this.fixColors(this.indicatorsAlphaQuad);
    this.fixColors(this.indicatorsAlphaPer);
    this.configurationParamsLen =
      this.prepareConfig(this.dataSelection.mnemonic, this.dataSelection.data, this.indicatorsLen);
    this.configurationParamsAlphaQuad =
      this.prepareConfig(this.dataSelection.mnemonic, this.dataSelection.data, this.indicatorsAlphaQuad);
    this.configurationParamsAlphaPer =
      this.prepareConfig(this.dataSelection.mnemonic, this.dataSelection.data, this.indicatorsAlphaPer);
  }

  private prepareConfig(mnemonic: string, bars: Bar[], indicators: Htce[]): Configuration {
    const cloned = getConfigTemplate();
    cloned.menuVisible = this.csvc.enableChartEditing();
    cloned.ohlcv.name = mnemonic;
    cloned.ohlcv.data = bars;

    for (const el of indicators) {
      const component = el.barComponent ? el.barComponent : BarComponent.Close;
      const indicator = createEstimator(el.estimatorType, el.params);
      const lineData = new LineData();
      lineData.name = estimatorMnemonic(el.estimatorType, el.params);
      lineData.data = calculateHtce(bars, indicator, component);
      const s = el.style;
      lineData.color = s.color;
      lineData.width = s.width;
      lineData.dash = s.dash;
      lineData.interpolation = s.interpolation;
      cloned.indicatorPanes[0].lines.push(lineData);
    }

    return cloned;
  }

  private fixColors(indicators: Htce[]): void {
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

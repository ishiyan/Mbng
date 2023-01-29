import { Component } from '@angular/core';

import { Scalar } from 'projects/mb/src/lib/data/entities/scalar';
import { SparklineConfiguration } from 'projects/mb/src/lib/charts/sparkline/sparkline-configuration.interface';
// import { colorsCoSequential5PalettesSelection } from 'projects/mb/src/lib/colors/colors-co-sequential-5-palettes-selection';

import { TestInstrument } from '../../test-data/test-instrument.interface';
import { alexDefensive } from '../../test-data/alex-defensive';
import { alexCautious } from '../../test-data/alex-cautious';
// import { alexOffensive } from '../../test-data/alex-offensive';
import { alexSpeculative } from '../../test-data/alex-speculative';
import { alexVerySpeculative } from '../../test-data/alex-very-speculative';
import { bamEuroBondSicav } from '../../test-data/bam-euro-bond-sicav';
import { bamGlDevMarketsEqSicav } from '../../test-data/bam-gl-dev-markets-eq-sicav';
import { bamWeightedLowRiskBenchmark } from '../../test-data/bam-weighted-low-risk-benchmark';
import { stoxxGlobal3000Nr } from '../../test-data/stoxx-global-3000-nr';
import { crudeOilFuture } from '../../test-data/crude-oil-future';
import { barclays15YearEuroCorpBond } from '../../test-data/barclays-1-5-year-euro-corp-bond';
import { barclays35YearEuroTreasuryBond } from '../../test-data/barclays-3-5-year-euro-treasury-bond';
import { dowMiniFuture } from '../../test-data/dow-mini-future';
import { luxorDowJonesIndustrialAverageEtf } from '../../test-data/luxor-dow-jones-industrial-average-etf';
import { sp500MiniFuture } from '../../test-data/sp-500-mini-future';
import { nasdaq100MiniFuture } from '../../test-data/nasdaq-100-mini-future';
import { russell2000MiniFuture } from '../../test-data/russell-2000-mini-future';
import { djEuroStoxxTotalMarketTr } from '../../test-data/dj-euro-stoxx-total-market-tr';
import { stoxxGlobal1800ExApacNr } from '../../test-data/stoxx-global-1800-ex-asia-pacific-nr';
import { stoxx1800Nr } from '../../test-data/stoxx-1800-nr';

@Component({
  selector: 'app-fixed-single',
  templateUrl: './single.component.html',
  styleUrls: ['./single.component.scss']
})
export class SingleComponent {

  palettes: string[][] = this.combinePalettes();
  selectedPalette: string[] = this.palettes[0];

  readonly hrInstruments: TestInstrument[] = [
    bamGlDevMarketsEqSicav, alexSpeculative, alexVerySpeculative,
    crudeOilFuture, dowMiniFuture, luxorDowJonesIndustrialAverageEtf, sp500MiniFuture, nasdaq100MiniFuture,
    russell2000MiniFuture, djEuroStoxxTotalMarketTr, stoxxGlobal3000Nr, stoxx1800Nr, stoxxGlobal1800ExApacNr
  ];
  readonly lrInstruments: TestInstrument[] = [
    barclays15YearEuroCorpBond, barclays35YearEuroTreasuryBond,
    bamEuroBondSicav, bamWeightedLowRiskBenchmark, alexDefensive, alexCautious
  ];

  cashFill: SparklineConfiguration = { fillColor: this.selectedPalette[0], strokeColor: undefined, strokeWidth: 1 };
  hrFill: SparklineConfiguration = { fillColor: this.selectedPalette[1], strokeColor: undefined, strokeWidth: 1 };
  lrFill: SparklineConfiguration = { fillColor: this.selectedPalette[2], strokeColor: undefined, strokeWidth: 1 };
  hrPercentageLine: SparklineConfiguration = { fillColor: undefined, strokeColor: this.selectedPalette[1], strokeWidth: 1 };

  private hrInstr: TestInstrument = this.hrInstruments[0];
  private lrInstr: TestInstrument = this.lrInstruments[0];

  hrCalculated: Scalar[] = [];
  lrCalculated: Scalar[] = [];
  cashCalculated: Scalar[] = [];
  percentageCalculated: Scalar[] = [];
  hrPercentageMin!: number;
  hrPercentageMax!: number;

  initialAmount = 5000;
  hrIdeal = 65;
  hrThreshold = 1;
  fractionalPositionsValue = false;

  private constructor() {
    this.calculate();
  }

  get hrInstrument(): TestInstrument {
    return this.hrInstr;
  }
  set hrInstrument(value: TestInstrument) {
    this.hrInstr = value;
    this.calculate();
  }

  get lrInstrument(): TestInstrument {
    return this.lrInstr;
  }
  set lrInstrument(value: TestInstrument) {
    this.lrInstr = value;
    this.calculate();
  }

  get fractionalPositions(): boolean {
    return this.fractionalPositionsValue;
  }
  set fractionalPositions(value: boolean) {
    this.fractionalPositionsValue = value;
    this.calculate();
  }

  private combinePalettes(): string[][] {
    return [
      ['#4d7298', '#7a9cc6', '#9fbbcc'], // blue-grey
      ['#7a9cc6', '#a0c4e2', '#c6dbf0'], // pale-blue
      ['#4d7298', '#77a6b6', '#9dc3c2'], // blue-grey-darker
      ['#7a918d', '#93b1a7', '#b3d2b2'], // brown-grey
      ['#717c89', '#8aa2a9', '#b3d2b2'], // blue-grey-dark
      ['#50808e', '#69a297', '#a3c9a8'], // pale-green-brownish
      ['#586994', '#7d869c', '#b4c4ae'], // brown-green-pale
      ['#545775', '#718f94', '#bfc8ad'], // greish-greenish
      ['#957fef', '#8e94f2', '#bbadff'], // violet
      ['#957fef', '#b79ced', '#dec0f1'], // violet-light
      ['#735d78', '#b392ac', '#e8c2ca'], // rosy
      ['#3b3b58', '#7a5980', '#bc7c9c'], // brick
      ['#cc5803', '#e2711d', '#ffb627'], // orange not so bright
      ['#587291', '#2f97c1', '#15e6cd'] // sea-green-bright
    ];
    // return colorsCoSequential5PalettesSelection('12');
  }

  paletteSelectionChanged(selection: string[]) {
    // console.log(selection);
    this.selectedPalette = selection;
    this.cashFill = { fillColor: this.selectedPalette[0], strokeColor: undefined, strokeWidth: 1 };
    this.hrFill = { fillColor: this.selectedPalette[1], strokeColor: undefined, strokeWidth: 1 };
    this.lrFill = { fillColor: this.selectedPalette[2], strokeColor: undefined, strokeWidth: 1 };
    this.hrPercentageLine = { fillColor: undefined, strokeColor: this.selectedPalette[0], strokeWidth: 1 };
  }

  initialAmountChanged(event: any) {
    this.initialAmount = event.value;
    this.calculate();
  }

  hrIdealChanged(event: any) {
    this.hrIdeal = event.value;
    this.calculate();
  }

  hrThresholdChanged(event: any) {
    this.hrThreshold = event.value;
    this.calculate();
  }

  private calculate() {
    const hrCalculated: Scalar[] = [];
    const lrCalculated: Scalar[] = [];
    const cashCalculated: Scalar[] = [];
    const percentageCalculated: Scalar[] = [];

    const hrPrices = this.hrInstr.data;
    const lrPrices = this.lrInstr.data;
    const length = hrPrices.length;
    const minAllocation = Math.max(0, (this.hrIdeal - this.hrThreshold) / 100);
    const maxAllocation = Math.min(1, (this.hrIdeal + this.hrThreshold) / 100);
    const idealAllocation = this.hrIdeal / 100;

    let cash = this.initialAmount;
    let hrPos = 0;
    let lrPos = 0;

    for (let i = 0; i < length; ++i) {
      const time = hrPrices[i].time;
      const hrPrice = hrPrices[i].value;
      const lrPrice = lrPrices[i].value;
      let hrAmount = hrPos * hrPrice;
      let lrAmount = lrPos * lrPrice;
      const aum = cash + hrAmount + lrAmount;
      const currentAllocation = hrAmount / aum;
      if (i === 0 || currentAllocation < minAllocation || currentAllocation > maxAllocation) {
        hrAmount = aum * idealAllocation;
        lrAmount = aum - hrAmount;
        hrPos = hrAmount / hrPrice;
        lrPos = lrAmount / lrPrice;
        if (!this.fractionalPositionsValue) {
          hrPos = Math.max(0, Math.round(hrPos - 0.5));
          lrPos = Math.max(0, Math.round(lrPos - 0.5));
          hrAmount = hrPos * hrPrice;
          lrAmount = lrPos * lrPrice;
        }
        cash = aum - hrAmount - lrAmount;
      } else {
        // cash, hrPos and lrPos stay the same
      }
      hrCalculated.push({time, value: hrAmount});
      lrCalculated.push({time, value: lrAmount});
      cashCalculated.push({time, value: cash});
      percentageCalculated.push({time, value: hrAmount * 100 / aum});
    }
    this.cashCalculated = cashCalculated;
    this.hrCalculated = hrCalculated;
    this.lrCalculated = lrCalculated;
    this.percentageCalculated = percentageCalculated;
    this.hrPercentageMin = Math.max(0, this.hrIdeal - this.hrThreshold - 1);
    this.hrPercentageMax = Math.min(100, this.hrIdeal + this.hrThreshold + 1);
  }

  get hrPercentage(): Scalar[] {
    return this.percentageCalculated;
  }

}

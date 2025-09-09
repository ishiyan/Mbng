import { ChangeDetectionStrategy, Component } from '@angular/core';
import { JsonPipe } from '@angular/common';
import { MatCard, MatCardHeader, MatCardTitle, MatCardContent } from '@angular/material/card';

import { BarComponent } from 'projects/mb/src/lib/data/entities/bar-component.enum';
import { QuoteComponent } from 'projects/mb/src/lib/data/entities/quote-component.enum';
import { KaufmanAdaptiveMovingAverageLengthParams, KaufmanAdaptiveMovingAverageSmoothingFactorParams }
  from 'projects/mb/src/lib/trading/indicators/perry-kaufman/kaufman-adaptive-moving-average/kaufman-adaptive-moving-average-params.interface';
import { KaufmanAdaptiveMovingAverageParamsComponent }
  from 'projects/mb/src/lib/trading/indicators/perry-kaufman/kaufman-adaptive-moving-average/kaufman-adaptive-moving-average-params.component';

@Component({
  selector: 'app-mb-kaufman-adaptive-moving-average-02-selector',
  templateUrl: './kaufman-adaptive-moving-average-02-selector.component.html',
  styleUrls: ['./kaufman-adaptive-moving-average-02-selector.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [
    JsonPipe,
    MatCard,
    MatCardHeader,
    MatCardTitle,
    MatCardContent,
    KaufmanAdaptiveMovingAverageParamsComponent
  ]
})
export class KaufmanAdaptiveMovingAverage02SelectorComponent {
  protected selected1: KaufmanAdaptiveMovingAverageLengthParams | KaufmanAdaptiveMovingAverageSmoothingFactorParams = {
    efficiencyRatioLength: 6, fastestLength: 2, slowestLength: 30, barComponent: BarComponent.Close, quoteComponent: QuoteComponent.Mid
  };
  protected selectedL2: KaufmanAdaptiveMovingAverageLengthParams | KaufmanAdaptiveMovingAverageSmoothingFactorParams = {
    efficiencyRatioLength: 5, fastestLength: 3, slowestLength: 25, barComponent: BarComponent.Close, quoteComponent: QuoteComponent.Mid
  };
  protected initialL2: KaufmanAdaptiveMovingAverageLengthParams | KaufmanAdaptiveMovingAverageSmoothingFactorParams = {
    efficiencyRatioLength: 7, fastestLength: 4, slowestLength: 20, barComponent: BarComponent.Typical, quoteComponent: QuoteComponent.Bid
  };
  protected selectedS2: KaufmanAdaptiveMovingAverageLengthParams | KaufmanAdaptiveMovingAverageSmoothingFactorParams = {
    efficiencyRatioLength: 9, fastestSmoothingFactor: 0.5, slowestSmoothingFactor: 0.1, barComponent: BarComponent.Close, quoteComponent: QuoteComponent.Mid
  };
  protected initial1: KaufmanAdaptiveMovingAverageLengthParams | KaufmanAdaptiveMovingAverageSmoothingFactorParams = {
    efficiencyRatioLength: 6, fastestLength: 2, slowestLength: 30, barComponent: BarComponent.Close, quoteComponent: QuoteComponent.Mid
  };
  protected initialS2: KaufmanAdaptiveMovingAverageLengthParams | KaufmanAdaptiveMovingAverageSmoothingFactorParams = {
    efficiencyRatioLength: 10, fastestSmoothingFactor: 0.667, slowestSmoothingFactor: 0.05, barComponent: BarComponent.Typical, quoteComponent: QuoteComponent.Bid
  };
}

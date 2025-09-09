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
  selector: 'app-mb-kaufman-adaptive-moving-average-01-parameters',
  templateUrl: './kaufman-adaptive-moving-average-01-parameters.component.html',
  styleUrls: ['./kaufman-adaptive-moving-average-01-parameters.component.scss'],
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
export class KaufmanAdaptiveMovingAverage01ParametersComponent {
  protected selected1: KaufmanAdaptiveMovingAverageLengthParams | KaufmanAdaptiveMovingAverageSmoothingFactorParams = {
    efficiencyRatioLength: 6, fastestLength: 2, slowestLength: 30, barComponent: BarComponent.Close, quoteComponent: QuoteComponent.Mid
  };
  protected selectedL2: KaufmanAdaptiveMovingAverageLengthParams | KaufmanAdaptiveMovingAverageSmoothingFactorParams = {
    efficiencyRatioLength: 5, fastestLength: 3, slowestLength: 25, barComponent: BarComponent.Close, quoteComponent: QuoteComponent.Mid
  };
  protected selectedL3: KaufmanAdaptiveMovingAverageLengthParams | KaufmanAdaptiveMovingAverageSmoothingFactorParams = {
    efficiencyRatioLength: 7, fastestLength: 4, slowestLength: 20, barComponent: BarComponent.Close, quoteComponent: QuoteComponent.Mid
  };
  protected selectedL4: KaufmanAdaptiveMovingAverageLengthParams | KaufmanAdaptiveMovingAverageSmoothingFactorParams = {
    efficiencyRatioLength: 8, fastestLength: 5, slowestLength: 15, barComponent: BarComponent.Close, quoteComponent: QuoteComponent.Mid
  };
  protected selectedL5: KaufmanAdaptiveMovingAverageLengthParams | KaufmanAdaptiveMovingAverageSmoothingFactorParams = {
    efficiencyRatioLength: 9, fastestLength: 6, slowestLength: 10, barComponent: BarComponent.Close, quoteComponent: QuoteComponent.Mid
  };
  protected initial1: KaufmanAdaptiveMovingAverageLengthParams | KaufmanAdaptiveMovingAverageSmoothingFactorParams = {
    efficiencyRatioLength: 10, fastestLength: 2, slowestLength: 30, barComponent: BarComponent.Close, quoteComponent: QuoteComponent.Mid
  };
  protected initialL2: KaufmanAdaptiveMovingAverageLengthParams | KaufmanAdaptiveMovingAverageSmoothingFactorParams = {
    efficiencyRatioLength: 12, fastestLength: 2, slowestLength: 30, barComponent: BarComponent.Typical
  };
  protected initialL3: KaufmanAdaptiveMovingAverageLengthParams | KaufmanAdaptiveMovingAverageSmoothingFactorParams = {
    efficiencyRatioLength: 13, fastestLength: 2, slowestLength: 30, quoteComponent: QuoteComponent.Bid
  };
  protected initialL4: KaufmanAdaptiveMovingAverageLengthParams | KaufmanAdaptiveMovingAverageSmoothingFactorParams = {
    efficiencyRatioLength: 14, fastestLength: 2, slowestLength: 30, 
  };
  protected initialL5: KaufmanAdaptiveMovingAverageLengthParams | KaufmanAdaptiveMovingAverageSmoothingFactorParams = {
    efficiencyRatioLength: 15, fastestLength: 2, slowestLength: 30, barComponent: BarComponent.Open, quoteComponent: QuoteComponent.Ask
  };
  protected selectedS2: KaufmanAdaptiveMovingAverageLengthParams | KaufmanAdaptiveMovingAverageSmoothingFactorParams = {
    efficiencyRatioLength: 10, fastestSmoothingFactor: 0.667, slowestSmoothingFactor: 0.05, barComponent: BarComponent.Close, quoteComponent: QuoteComponent.Mid
  };
  protected selectedS3: KaufmanAdaptiveMovingAverageLengthParams | KaufmanAdaptiveMovingAverageSmoothingFactorParams = {
    efficiencyRatioLength: 10, fastestSmoothingFactor: 0.667, slowestSmoothingFactor: 0.05, barComponent: BarComponent.Close, quoteComponent: QuoteComponent.Mid
  };
  protected selectedS4: KaufmanAdaptiveMovingAverageLengthParams | KaufmanAdaptiveMovingAverageSmoothingFactorParams = {
    efficiencyRatioLength: 10, fastestSmoothingFactor: 0.667, slowestSmoothingFactor: 0.05, barComponent: BarComponent.Close, quoteComponent: QuoteComponent.Mid
  };
  protected selectedS5: KaufmanAdaptiveMovingAverageLengthParams | KaufmanAdaptiveMovingAverageSmoothingFactorParams = {
    efficiencyRatioLength: 10, fastestSmoothingFactor: 0.667, slowestSmoothingFactor: 0.05, barComponent: BarComponent.Close, quoteComponent: QuoteComponent.Mid
  };
  protected initialS2: KaufmanAdaptiveMovingAverageLengthParams | KaufmanAdaptiveMovingAverageSmoothingFactorParams = {
    efficiencyRatioLength: 10, fastestSmoothingFactor: 0.667, slowestSmoothingFactor: 0.05, barComponent: BarComponent.Typical
  };
  protected initialS3: KaufmanAdaptiveMovingAverageLengthParams | KaufmanAdaptiveMovingAverageSmoothingFactorParams = {
    efficiencyRatioLength: 10, fastestSmoothingFactor: 0.667, slowestSmoothingFactor: 0.05, quoteComponent: QuoteComponent.Bid
  };
  protected initialS4: KaufmanAdaptiveMovingAverageLengthParams | KaufmanAdaptiveMovingAverageSmoothingFactorParams = {
    efficiencyRatioLength: 10, fastestSmoothingFactor: 0.667, slowestSmoothingFactor: 0.05
  };
  protected initialS5: KaufmanAdaptiveMovingAverageLengthParams | KaufmanAdaptiveMovingAverageSmoothingFactorParams = {
    efficiencyRatioLength: 10, fastestSmoothingFactor: 0.667, slowestSmoothingFactor: 0.05, barComponent: BarComponent.Open, quoteComponent: QuoteComponent.Ask
  };
}

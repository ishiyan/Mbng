import { ChangeDetectionStrategy, Component } from '@angular/core';
import { JsonPipe } from '@angular/common';
import { MatCard, MatCardHeader, MatCardTitle, MatCardContent } from '@angular/material/card';

import { BarComponent } from 'projects/mb/src/lib/data/entities/bar-component.enum';
import { QuoteComponent } from 'projects/mb/src/lib/data/entities/quote-component.enum';
import { ExponentialMovingAverageLengthParams, ExponentialMovingAverageSmoothingFactorParams }
  from 'projects/mb/src/lib/trading/indicators/exponential-moving-average/exponential-moving-average-params.interface';
import { ExponentialMovingAverageParamsComponent }
  from 'projects/mb/src/lib/trading/indicators/exponential-moving-average/exponential-moving-average-params.component';

@Component({
  selector: 'app-mb-exponential-moving-average-02-selector',
  templateUrl: './exponential-moving-average-02-selector.component.html',
  styleUrls: ['./exponential-moving-average-02-selector.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [
    JsonPipe,
    MatCard,
    MatCardHeader,
    MatCardTitle,
    MatCardContent,
    ExponentialMovingAverageParamsComponent
  ]
})
export class ExponentialMovingAverage02SelectorComponent {
  protected selected1: ExponentialMovingAverageLengthParams | ExponentialMovingAverageSmoothingFactorParams = {
    length: 6, firstIsAverage: true, barComponent: BarComponent.Close, quoteComponent: QuoteComponent.Mid
  };
  protected selectedL2: ExponentialMovingAverageLengthParams | ExponentialMovingAverageSmoothingFactorParams = {
    length: 5, firstIsAverage: true, barComponent: BarComponent.Close, quoteComponent: QuoteComponent.Mid
  };
  protected initialL2: ExponentialMovingAverageLengthParams | ExponentialMovingAverageSmoothingFactorParams = {
    length: 7, firstIsAverage: true, barComponent: BarComponent.Typical, quoteComponent: QuoteComponent.Bid
  };
  protected selectedS2: ExponentialMovingAverageLengthParams | ExponentialMovingAverageSmoothingFactorParams = {
    smoothingFactor: 0.2, barComponent: BarComponent.Close, quoteComponent: QuoteComponent.Mid
  };
  protected initial1: ExponentialMovingAverageLengthParams | ExponentialMovingAverageSmoothingFactorParams = {
    length: 6, firstIsAverage: true, barComponent: BarComponent.Close, quoteComponent: QuoteComponent.Mid
  };
  protected initialS2: ExponentialMovingAverageLengthParams | ExponentialMovingAverageSmoothingFactorParams = {
    smoothingFactor: 0.1, barComponent: BarComponent.Typical, quoteComponent: QuoteComponent.Bid
  };
}

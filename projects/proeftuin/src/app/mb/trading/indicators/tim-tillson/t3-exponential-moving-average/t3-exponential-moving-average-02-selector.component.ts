import { ChangeDetectionStrategy, Component } from '@angular/core';
import { JsonPipe } from '@angular/common';
import { MatCard, MatCardHeader, MatCardTitle, MatCardContent } from '@angular/material/card';

import { BarComponent } from 'projects/mb/src/lib/data/entities/bar-component.enum';
import { QuoteComponent } from 'projects/mb/src/lib/data/entities/quote-component.enum';
import { T3ExponentialMovingAverageLengthParams, T3ExponentialMovingAverageSmoothingFactorParams }
  from 'projects/mb/src/lib/trading/indicators/tim-tillson/t3-exponential-moving-average/t3-exponential-moving-average-params.interface';
import { T3ExponentialMovingAverageParamsComponent }
  from 'projects/mb/src/lib/trading/indicators/tim-tillson/t3-exponential-moving-average/t3-exponential-moving-average-params.component';

@Component({
  selector: 'app-mb-t3-exponential-moving-average-02-selector',
  templateUrl: './t3-exponential-moving-average-02-selector.component.html',
  styleUrls: ['./t3-exponential-moving-average-02-selector.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [
    JsonPipe,
    MatCard,
    MatCardHeader,
    MatCardTitle,
    MatCardContent,
    T3ExponentialMovingAverageParamsComponent
  ]
})
export class T3ExponentialMovingAverage02SelectorComponent {
  protected selected1: T3ExponentialMovingAverageLengthParams | T3ExponentialMovingAverageSmoothingFactorParams = {
    length: 6, vFactor: 0.7, firstIsAverage: true, barComponent: BarComponent.Close, quoteComponent: QuoteComponent.Mid
  };
  protected selectedL2: T3ExponentialMovingAverageLengthParams | T3ExponentialMovingAverageSmoothingFactorParams = {
    length: 5, vFactor: 0.7, firstIsAverage: true, barComponent: BarComponent.Close, quoteComponent: QuoteComponent.Mid
  };
  protected initial1: T3ExponentialMovingAverageLengthParams | T3ExponentialMovingAverageSmoothingFactorParams = {
    length: 6, vFactor: 0.7, firstIsAverage: true, barComponent: BarComponent.Close, quoteComponent: QuoteComponent.Mid
  };
  protected initialL2: T3ExponentialMovingAverageLengthParams | T3ExponentialMovingAverageSmoothingFactorParams = {
    length: 7, vFactor: 0.7, firstIsAverage: true, barComponent: BarComponent.Typical, quoteComponent: QuoteComponent.Bid
  };
  protected selectedS2: T3ExponentialMovingAverageLengthParams | T3ExponentialMovingAverageSmoothingFactorParams = {
    smoothingFactor: 0.2, vFactor: 0.7, barComponent: BarComponent.Close, quoteComponent: QuoteComponent.Mid
  };
  protected initialS2: T3ExponentialMovingAverageLengthParams | T3ExponentialMovingAverageSmoothingFactorParams = {
    smoothingFactor: 0.1, vFactor: 0.7, barComponent: BarComponent.Typical, quoteComponent: QuoteComponent.Bid
  };
}

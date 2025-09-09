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
  selector: 'app-mb-t3-exponential-moving-average-01-parameters',
  templateUrl: './t3-exponential-moving-average-01-parameters.component.html',
  styleUrls: ['./t3-exponential-moving-average-01-parameters.component.scss'],
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
export class T3ExponentialMovingAverage01ParametersComponent {
  protected selected1: T3ExponentialMovingAverageLengthParams | T3ExponentialMovingAverageSmoothingFactorParams = {
    length: 6, vFactor: 0.7, firstIsAverage: true, barComponent: BarComponent.Close, quoteComponent: QuoteComponent.Mid
  };
  protected selectedL2: T3ExponentialMovingAverageLengthParams | T3ExponentialMovingAverageSmoothingFactorParams = {
    length: 5, vFactor: 0.7, firstIsAverage: true, barComponent: BarComponent.Close, quoteComponent: QuoteComponent.Mid
  };
  protected selectedL3: T3ExponentialMovingAverageLengthParams | T3ExponentialMovingAverageSmoothingFactorParams = {
    length: 7, vFactor: 0.7, firstIsAverage: true, barComponent: BarComponent.Close, quoteComponent: QuoteComponent.Mid
  };
  protected selectedL4: T3ExponentialMovingAverageLengthParams | T3ExponentialMovingAverageSmoothingFactorParams = {
    length: 7, vFactor: 0.7, firstIsAverage: true, barComponent: BarComponent.Close, quoteComponent: QuoteComponent.Mid
  };
  protected selectedL5: T3ExponentialMovingAverageLengthParams | T3ExponentialMovingAverageSmoothingFactorParams = {
    length: 7, vFactor: 0.7, firstIsAverage: true, barComponent: BarComponent.Close, quoteComponent: QuoteComponent.Mid
  };
  protected initial1: T3ExponentialMovingAverageLengthParams | T3ExponentialMovingAverageSmoothingFactorParams = {
    length: 6, vFactor: 0.7, firstIsAverage: true, barComponent: BarComponent.Close, quoteComponent: QuoteComponent.Mid
  };
  protected initialL2: T3ExponentialMovingAverageLengthParams | T3ExponentialMovingAverageSmoothingFactorParams = {
    length: 12, vFactor: 0.7, firstIsAverage: true, barComponent: BarComponent.Typical
  };
  protected initialL3: T3ExponentialMovingAverageLengthParams | T3ExponentialMovingAverageSmoothingFactorParams = {
    length: 13, vFactor: 0.7, firstIsAverage: true, quoteComponent: QuoteComponent.Bid
  };
  protected initialL4: T3ExponentialMovingAverageLengthParams | T3ExponentialMovingAverageSmoothingFactorParams = {
    length: 14, vFactor: 0.7, firstIsAverage: true, 
  };
  protected initialL5: T3ExponentialMovingAverageLengthParams | T3ExponentialMovingAverageSmoothingFactorParams = {
    length: 15, vFactor: 0.7, firstIsAverage: true, barComponent: BarComponent.Open, quoteComponent: QuoteComponent.Ask
  };
  protected selectedS2: T3ExponentialMovingAverageLengthParams | T3ExponentialMovingAverageSmoothingFactorParams = {
    smoothingFactor: 0.2, vFactor: 0.7, barComponent: BarComponent.Close, quoteComponent: QuoteComponent.Mid
  };
  protected selectedS3: T3ExponentialMovingAverageLengthParams | T3ExponentialMovingAverageSmoothingFactorParams = {
    smoothingFactor: 0.2, vFactor: 0.7, barComponent: BarComponent.Close, quoteComponent: QuoteComponent.Mid
  };
  protected selectedS4: T3ExponentialMovingAverageLengthParams | T3ExponentialMovingAverageSmoothingFactorParams = {
    smoothingFactor: 0.2, vFactor: 0.7, barComponent: BarComponent.Close, quoteComponent: QuoteComponent.Mid
  };
  protected selectedS5: T3ExponentialMovingAverageLengthParams | T3ExponentialMovingAverageSmoothingFactorParams = {
    smoothingFactor: 0.2, vFactor: 0.7, barComponent: BarComponent.Close, quoteComponent: QuoteComponent.Mid
  };
  protected initialS2: T3ExponentialMovingAverageLengthParams | T3ExponentialMovingAverageSmoothingFactorParams = {
    smoothingFactor: 0.1, vFactor: 0.7, barComponent: BarComponent.Typical
  };
  protected initialS3: T3ExponentialMovingAverageLengthParams | T3ExponentialMovingAverageSmoothingFactorParams = {
    smoothingFactor: 0.1, vFactor: 0.7, quoteComponent: QuoteComponent.Bid
  };
  protected initialS4: T3ExponentialMovingAverageLengthParams | T3ExponentialMovingAverageSmoothingFactorParams = {
    smoothingFactor: 0.1, vFactor: 0.7
  };
  protected initialS5: T3ExponentialMovingAverageLengthParams | T3ExponentialMovingAverageSmoothingFactorParams = {
    smoothingFactor: 0.1, vFactor: 0.7, barComponent: BarComponent.Open, quoteComponent: QuoteComponent.Ask
  };
}

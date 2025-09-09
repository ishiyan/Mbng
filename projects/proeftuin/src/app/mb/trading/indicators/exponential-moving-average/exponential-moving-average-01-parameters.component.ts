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
  selector: 'app-mb-exponential-moving-average-01-parameters',
  templateUrl: './exponential-moving-average-01-parameters.component.html',
  styleUrls: ['./exponential-moving-average-01-parameters.component.scss'],
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
export class ExponentialMovingAverage01ParametersComponent {
  protected selected1: ExponentialMovingAverageLengthParams | ExponentialMovingAverageSmoothingFactorParams = {
    length: 6, firstIsAverage: true, barComponent: BarComponent.Close, quoteComponent: QuoteComponent.Mid
  };
  protected selectedL2: ExponentialMovingAverageLengthParams | ExponentialMovingAverageSmoothingFactorParams = {
    length: 5, firstIsAverage: true, barComponent: BarComponent.Close, quoteComponent: QuoteComponent.Mid
  };
  protected selectedL3: ExponentialMovingAverageLengthParams | ExponentialMovingAverageSmoothingFactorParams = {
    length: 7, firstIsAverage: true, barComponent: BarComponent.Close, quoteComponent: QuoteComponent.Mid
  };
  protected selectedL4: ExponentialMovingAverageLengthParams | ExponentialMovingAverageSmoothingFactorParams = {
    length: 7, firstIsAverage: true, barComponent: BarComponent.Close, quoteComponent: QuoteComponent.Mid
  };
  protected selectedL5: ExponentialMovingAverageLengthParams | ExponentialMovingAverageSmoothingFactorParams = {
    length: 7, firstIsAverage: true, barComponent: BarComponent.Close, quoteComponent: QuoteComponent.Mid
  };
  protected initial1: ExponentialMovingAverageLengthParams | ExponentialMovingAverageSmoothingFactorParams = {
    length: 6, firstIsAverage: true, barComponent: BarComponent.Close, quoteComponent: QuoteComponent.Mid
  };
  protected initialL2: ExponentialMovingAverageLengthParams | ExponentialMovingAverageSmoothingFactorParams = {
    length: 12, firstIsAverage: true, barComponent: BarComponent.Typical
  };
  protected initialL3: ExponentialMovingAverageLengthParams | ExponentialMovingAverageSmoothingFactorParams = {
    length: 13, firstIsAverage: true, quoteComponent: QuoteComponent.Bid
  };
  protected initialL4: ExponentialMovingAverageLengthParams | ExponentialMovingAverageSmoothingFactorParams = {
    length: 14, firstIsAverage: true, 
  };
  protected initialL5: ExponentialMovingAverageLengthParams | ExponentialMovingAverageSmoothingFactorParams = {
    length: 15, firstIsAverage: true, barComponent: BarComponent.Open, quoteComponent: QuoteComponent.Ask
  };
  protected selectedS2: ExponentialMovingAverageLengthParams | ExponentialMovingAverageSmoothingFactorParams = {
    smoothingFactor: 0.2, barComponent: BarComponent.Close, quoteComponent: QuoteComponent.Mid
  };
  protected selectedS3: ExponentialMovingAverageLengthParams | ExponentialMovingAverageSmoothingFactorParams = {
    smoothingFactor: 0.2, barComponent: BarComponent.Close, quoteComponent: QuoteComponent.Mid
  };
  protected selectedS4: ExponentialMovingAverageLengthParams | ExponentialMovingAverageSmoothingFactorParams = {
    smoothingFactor: 0.2, barComponent: BarComponent.Close, quoteComponent: QuoteComponent.Mid
  };
  protected selectedS5: ExponentialMovingAverageLengthParams | ExponentialMovingAverageSmoothingFactorParams = {
    smoothingFactor: 0.2, barComponent: BarComponent.Close, quoteComponent: QuoteComponent.Mid
  };
  protected initialS2: ExponentialMovingAverageLengthParams | ExponentialMovingAverageSmoothingFactorParams = {
    smoothingFactor: 0.1, barComponent: BarComponent.Typical
  };
  protected initialS3: ExponentialMovingAverageLengthParams | ExponentialMovingAverageSmoothingFactorParams = {
    smoothingFactor: 0.1, quoteComponent: QuoteComponent.Bid
  };
  protected initialS4: ExponentialMovingAverageLengthParams | ExponentialMovingAverageSmoothingFactorParams = {
    smoothingFactor: 0.1 
  };
  protected initialS5: ExponentialMovingAverageLengthParams | ExponentialMovingAverageSmoothingFactorParams = {
    smoothingFactor: 0.1, barComponent: BarComponent.Open, quoteComponent: QuoteComponent.Ask
  };
}

import { ChangeDetectionStrategy, Component } from '@angular/core';
import { JsonPipe } from '@angular/common';
import { MatCard, MatCardHeader, MatCardTitle, MatCardContent } from '@angular/material/card';

import { BarComponent } from 'projects/mb/src/lib/data/entities/bar-component.enum';
import { QuoteComponent } from 'projects/mb/src/lib/data/entities/quote-component.enum';
import { T2ExponentialMovingAverageLengthParams, T2ExponentialMovingAverageSmoothingFactorParams }
  from 'projects/mb/src/lib/trading/indicators/tim-tillson/t2-exponential-moving-average/t2-exponential-moving-average-params.interface';
import { T2ExponentialMovingAverageParamsComponent }
  from 'projects/mb/src/lib/trading/indicators/tim-tillson/t2-exponential-moving-average/t2-exponential-moving-average-params.component';

@Component({
  selector: 'app-sample-t2-exponential-moving-average-2',
  templateUrl: './sample-t2-exponential-moving-average-2.component.html',
  styleUrls: ['./sample-t2-exponential-moving-average-2.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [
    JsonPipe,
    MatCard,
    MatCardHeader,
    MatCardTitle,
    MatCardContent,
    T2ExponentialMovingAverageParamsComponent
  ]
})
export class SampleT2ExponentialMovingAverage2Component {
  protected selected1: T2ExponentialMovingAverageLengthParams | T2ExponentialMovingAverageSmoothingFactorParams = {
    length: 6, vFactor: 0.7, firstIsAverage: true, barComponent: BarComponent.Close, quoteComponent: QuoteComponent.Mid
  };
  protected selectedL2: T2ExponentialMovingAverageLengthParams | T2ExponentialMovingAverageSmoothingFactorParams = {
    length: 5, vFactor: 0.7, firstIsAverage: true, barComponent: BarComponent.Close, quoteComponent: QuoteComponent.Mid
  };
  protected initialL2: T2ExponentialMovingAverageLengthParams | T2ExponentialMovingAverageSmoothingFactorParams = {
    length: 7, vFactor: 0.7, firstIsAverage: true, barComponent: BarComponent.Typical, quoteComponent: QuoteComponent.Bid
  };
  protected selectedS2: T2ExponentialMovingAverageLengthParams | T2ExponentialMovingAverageSmoothingFactorParams = {
    smoothingFactor: 0.2, vFactor: 0.7, barComponent: BarComponent.Close, quoteComponent: QuoteComponent.Mid
  };
  protected initial1: T2ExponentialMovingAverageLengthParams | T2ExponentialMovingAverageSmoothingFactorParams = {
    length: 6, vFactor: 0.7, firstIsAverage: true, barComponent: BarComponent.Close, quoteComponent: QuoteComponent.Mid
  };
  protected initialS2: T2ExponentialMovingAverageLengthParams | T2ExponentialMovingAverageSmoothingFactorParams = {
    smoothingFactor: 0.1, vFactor: 0.7, barComponent: BarComponent.Typical, quoteComponent: QuoteComponent.Bid
  };
}

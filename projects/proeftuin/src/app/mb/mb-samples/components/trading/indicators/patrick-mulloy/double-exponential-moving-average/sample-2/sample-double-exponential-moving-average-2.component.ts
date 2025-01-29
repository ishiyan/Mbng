import { ChangeDetectionStrategy, Component } from '@angular/core';
import { JsonPipe } from '@angular/common';
import { MatCard, MatCardHeader, MatCardTitle, MatCardContent } from '@angular/material/card';

import { BarComponent } from 'projects/mb/src/lib/data/entities/bar-component.enum';
import { QuoteComponent } from 'projects/mb/src/lib/data/entities/quote-component.enum';
import { DoubleExponentialMovingAverageLengthParams, DoubleExponentialMovingAverageSmoothingFactorParams }
  from 'projects/mb/src/lib/trading/indicators/patrick-mulloy/double-exponential-moving-average/double-exponential-moving-average-params.interface';
import { DoubleExponentialMovingAverageParamsComponent }
  from 'projects/mb/src/lib/trading/indicators/patrick-mulloy/double-exponential-moving-average/double-exponential-moving-average-params.component';

@Component({
    selector: 'app-sample-double-exponential-moving-average-2',
    templateUrl: './sample-double-exponential-moving-average-2.component.html',
    styleUrls: ['./sample-double-exponential-moving-average-2.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush,
    imports: [
      JsonPipe,
      MatCard,
      MatCardHeader,
      MatCardTitle,
      MatCardContent,
      DoubleExponentialMovingAverageParamsComponent
    ]
})
export class SampleDoubleExponentialMovingAverage2Component {
  protected selected1: DoubleExponentialMovingAverageLengthParams | DoubleExponentialMovingAverageSmoothingFactorParams = {
    length: 6, firstIsAverage: true, barComponent: BarComponent.Close, quoteComponent: QuoteComponent.Mid
  };
  protected selectedL2: DoubleExponentialMovingAverageLengthParams | DoubleExponentialMovingAverageSmoothingFactorParams = {
    length: 5, firstIsAverage: true, barComponent: BarComponent.Close, quoteComponent: QuoteComponent.Mid
  };
  protected initial1: DoubleExponentialMovingAverageLengthParams | DoubleExponentialMovingAverageSmoothingFactorParams = {
    length: 6, firstIsAverage: true, barComponent: BarComponent.Close, quoteComponent: QuoteComponent.Mid
  };
  protected initialL2: DoubleExponentialMovingAverageLengthParams | DoubleExponentialMovingAverageSmoothingFactorParams = {
    length: 7, firstIsAverage: true, barComponent: BarComponent.Typical, quoteComponent: QuoteComponent.Bid
  };
  protected selectedS2: DoubleExponentialMovingAverageLengthParams | DoubleExponentialMovingAverageSmoothingFactorParams = {
    smoothingFactor: 0.2, barComponent: BarComponent.Close, quoteComponent: QuoteComponent.Mid
  };
  protected initialS2: DoubleExponentialMovingAverageLengthParams | DoubleExponentialMovingAverageSmoothingFactorParams = {
    smoothingFactor: 0.1, barComponent: BarComponent.Typical, quoteComponent: QuoteComponent.Bid
  };
}

import { ChangeDetectionStrategy, Component } from '@angular/core';

import { DoubleExponentialMovingAverageLengthParams, DoubleExponentialMovingAverageSmoothingFactorParams }
  from 'projects/mb/src/lib/trading/indicators/patrick-mulloy/double-exponential-moving-average/double-exponential-moving-average-params.interface';
import { BarComponent } from 'projects/mb/src/lib/data/entities/bar-component.enum';
import { QuoteComponent } from 'projects/mb/src/lib/data/entities/quote-component.enum';

@Component({
  selector: 'app-sample-double-exponential-moving-average-1',
  templateUrl: './sample-double-exponential-moving-average-1.component.html',
  styleUrls: ['./sample-double-exponential-moving-average-1.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class SampleDoubleExponentialMovingAverage1Component {
  protected selected1: DoubleExponentialMovingAverageLengthParams | DoubleExponentialMovingAverageSmoothingFactorParams = {
    length: 6, firstIsAverage: true, barComponent: BarComponent.Close, quoteComponent: QuoteComponent.Mid
  };
  protected selectedL2: DoubleExponentialMovingAverageLengthParams | DoubleExponentialMovingAverageSmoothingFactorParams = {
    length: 5, firstIsAverage: true, barComponent: BarComponent.Close, quoteComponent: QuoteComponent.Mid
  };
  protected selectedL3: DoubleExponentialMovingAverageLengthParams | DoubleExponentialMovingAverageSmoothingFactorParams = {
    length: 7, firstIsAverage: true, barComponent: BarComponent.Close, quoteComponent: QuoteComponent.Mid
  };
  protected selectedL4: DoubleExponentialMovingAverageLengthParams | DoubleExponentialMovingAverageSmoothingFactorParams = {
    length: 7, firstIsAverage: true, barComponent: BarComponent.Close, quoteComponent: QuoteComponent.Mid
  };
  protected selectedL5: DoubleExponentialMovingAverageLengthParams | DoubleExponentialMovingAverageSmoothingFactorParams = {
    length: 7, firstIsAverage: true, barComponent: BarComponent.Close, quoteComponent: QuoteComponent.Mid
  };
  protected initialL2: DoubleExponentialMovingAverageLengthParams | DoubleExponentialMovingAverageSmoothingFactorParams = {
    length: 12, firstIsAverage: true, barComponent: BarComponent.Typical
  };
  protected initialL3: DoubleExponentialMovingAverageLengthParams | DoubleExponentialMovingAverageSmoothingFactorParams = {
    length: 13, firstIsAverage: true, quoteComponent: QuoteComponent.Bid
  };
  protected initialL4: DoubleExponentialMovingAverageLengthParams | DoubleExponentialMovingAverageSmoothingFactorParams = {
    length: 14, firstIsAverage: true, 
  };
  protected initialL5: DoubleExponentialMovingAverageLengthParams | DoubleExponentialMovingAverageSmoothingFactorParams = {
    length: 15, firstIsAverage: true, barComponent: BarComponent.Open, quoteComponent: QuoteComponent.Ask
  };
  protected selectedS2: DoubleExponentialMovingAverageLengthParams | DoubleExponentialMovingAverageSmoothingFactorParams = {
    smoothingFactor: 0.2, barComponent: BarComponent.Close, quoteComponent: QuoteComponent.Mid
  };
  protected selectedS3: DoubleExponentialMovingAverageLengthParams | DoubleExponentialMovingAverageSmoothingFactorParams = {
    smoothingFactor: 0.2, barComponent: BarComponent.Close, quoteComponent: QuoteComponent.Mid
  };
  protected selectedS4: DoubleExponentialMovingAverageLengthParams | DoubleExponentialMovingAverageSmoothingFactorParams = {
    smoothingFactor: 0.2, barComponent: BarComponent.Close, quoteComponent: QuoteComponent.Mid
  };
  protected selectedS5: DoubleExponentialMovingAverageLengthParams | DoubleExponentialMovingAverageSmoothingFactorParams = {
    smoothingFactor: 0.2, barComponent: BarComponent.Close, quoteComponent: QuoteComponent.Mid
  };
  protected initialS2: DoubleExponentialMovingAverageLengthParams | DoubleExponentialMovingAverageSmoothingFactorParams = {
    smoothingFactor: 0.1, barComponent: BarComponent.Typical
  };
  protected initialS3: DoubleExponentialMovingAverageLengthParams | DoubleExponentialMovingAverageSmoothingFactorParams = {
    smoothingFactor: 0.1, quoteComponent: QuoteComponent.Bid
  };
  protected initialS4: DoubleExponentialMovingAverageLengthParams | DoubleExponentialMovingAverageSmoothingFactorParams = {
    smoothingFactor: 0.1
  };
  protected initialS5: DoubleExponentialMovingAverageLengthParams | DoubleExponentialMovingAverageSmoothingFactorParams = {
    smoothingFactor: 0.1, barComponent: BarComponent.Open, quoteComponent: QuoteComponent.Ask
  };
}

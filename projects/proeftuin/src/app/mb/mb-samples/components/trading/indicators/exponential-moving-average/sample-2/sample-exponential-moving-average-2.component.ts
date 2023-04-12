import { ChangeDetectionStrategy, Component } from '@angular/core';

import { ExponentialMovingAverageLengthParams, ExponentialMovingAverageSmoothingFactorParams }
  from 'projects/mb/src/lib/trading/indicators/exponential-moving-average/exponential-moving-average-params.interface';
import { BarComponent } from 'projects/mb/src/lib/data/entities/bar-component.enum';
import { QuoteComponent } from 'projects/mb/src/lib/data/entities/quote-component.enum';

@Component({
  selector: 'app-sample-exponential-moving-average-2',
  templateUrl: './sample-exponential-moving-average-2.component.html',
  styleUrls: ['./sample-exponential-moving-average-2.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class SampleExponentialMovingAverage2Component {
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
  protected initialS2: ExponentialMovingAverageLengthParams | ExponentialMovingAverageSmoothingFactorParams = {
    smoothingFactor: 0.1, barComponent: BarComponent.Typical, quoteComponent: QuoteComponent.Bid
  };
}

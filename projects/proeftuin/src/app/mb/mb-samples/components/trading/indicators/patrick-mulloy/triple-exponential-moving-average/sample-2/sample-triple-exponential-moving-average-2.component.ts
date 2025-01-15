import { ChangeDetectionStrategy, Component } from '@angular/core';

import { TripleExponentialMovingAverageLengthParams, TripleExponentialMovingAverageSmoothingFactorParams }
  from 'projects/mb/src/lib/trading/indicators/patrick-mulloy/triple-exponential-moving-average/triple-exponential-moving-average-params.interface';
import { BarComponent } from 'projects/mb/src/lib/data/entities/bar-component.enum';
import { QuoteComponent } from 'projects/mb/src/lib/data/entities/quote-component.enum';
import { MatCard, MatCardHeader, MatCardTitle, MatCardContent } from '@angular/material/card';
import { TripleExponentialMovingAverageModule } from '../../../../../../../../../../../mb/src/lib/trading/indicators/patrick-mulloy/triple-exponential-moving-average/triple-exponential-moving-average.module';
import { JsonPipe } from '@angular/common';

@Component({
    selector: 'app-sample-triple-exponential-moving-average-2',
    templateUrl: './sample-triple-exponential-moving-average-2.component.html',
    styleUrls: ['./sample-triple-exponential-moving-average-2.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush,
    imports: [MatCard, MatCardHeader, MatCardTitle, MatCardContent, TripleExponentialMovingAverageModule, JsonPipe]
})
export class SampleTripleExponentialMovingAverage2Component {
  protected selected1: TripleExponentialMovingAverageLengthParams | TripleExponentialMovingAverageSmoothingFactorParams = {
    length: 6, firstIsAverage: true, barComponent: BarComponent.Close, quoteComponent: QuoteComponent.Mid
  };
  protected selectedL2: TripleExponentialMovingAverageLengthParams | TripleExponentialMovingAverageSmoothingFactorParams = {
    length: 5, firstIsAverage: true, barComponent: BarComponent.Close, quoteComponent: QuoteComponent.Mid
  };
  protected initialL2: TripleExponentialMovingAverageLengthParams | TripleExponentialMovingAverageSmoothingFactorParams = {
    length: 7, firstIsAverage: true, barComponent: BarComponent.Typical, quoteComponent: QuoteComponent.Bid
  };
  protected selectedS2: TripleExponentialMovingAverageLengthParams | TripleExponentialMovingAverageSmoothingFactorParams = {
    smoothingFactor: 0.2, barComponent: BarComponent.Close, quoteComponent: QuoteComponent.Mid
  };
  protected initialS2: TripleExponentialMovingAverageLengthParams | TripleExponentialMovingAverageSmoothingFactorParams = {
    smoothingFactor: 0.1, barComponent: BarComponent.Typical, quoteComponent: QuoteComponent.Bid
  };
}

import { ChangeDetectionStrategy, Component } from '@angular/core';
import { JsonPipe } from '@angular/common';
import { MatCard, MatCardHeader, MatCardTitle, MatCardContent } from '@angular/material/card';

import { BarComponent } from 'projects/mb/src/lib/data/entities/bar-component.enum';
import { QuoteComponent } from 'projects/mb/src/lib/data/entities/quote-component.enum';
import { WeightedMovingAverageParams }
  from 'projects/mb/src/lib/trading/indicators/weighted-moving-average/weighted-moving-average-params.interface';
import { WeightedMovingAverageParamsComponent }
  from 'projects/mb/src/lib/trading/indicators/weighted-moving-average/weighted-moving-average-params.component';

@Component({
    selector: 'app-sample-weighted-moving-average-2',
    templateUrl: './sample-weighted-moving-average-2.component.html',
    styleUrls: ['./sample-weighted-moving-average-2.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush,
    imports: [
      JsonPipe,
      MatCard,
      MatCardHeader,
      MatCardTitle,
      MatCardContent,
      WeightedMovingAverageParamsComponent
    ]
})
export class SampleWeightedMovingAverage2Component {
  protected selected1: WeightedMovingAverageParams = {
    length: 6, barComponent: BarComponent.Close, quoteComponent: QuoteComponent.Mid
  };
  protected selected2: WeightedMovingAverageParams = {
    length: 5, barComponent: BarComponent.Close, quoteComponent: QuoteComponent.Mid
  };
  protected initial1: WeightedMovingAverageParams = {
    length: 6, barComponent: BarComponent.Close, quoteComponent: QuoteComponent.Mid
  };
  protected initial2: WeightedMovingAverageParams = {
    length: 7, barComponent: BarComponent.Typical, quoteComponent: QuoteComponent.Bid
  };
}

import { Component } from '@angular/core';

// eslint-disable-next-line max-len
import { WeightedMovingAverageParams } from 'projects/mb/src/lib/trading/indicators/weighted-moving-average/weighted-moving-average-params.interface';
import { BarComponent } from 'projects/mb/src/lib/data/entities/bar-component.enum';
import { QuoteComponent } from 'projects/mb/src/lib/data/entities/quote-component.enum';

@Component({
  selector: 'app-sample-weighted-moving-average-2',
  templateUrl: './sample-weighted-moving-average-2.component.html',
  styleUrls: ['./sample-weighted-moving-average-2.component.scss']
})
export class SampleWeightedMovingAverage2Component {
  protected selected1: WeightedMovingAverageParams = {
    length: 6, barComponent: BarComponent.Close, quoteComponent: QuoteComponent.Mid
  };
  protected selected2: WeightedMovingAverageParams = {
    length: 5, barComponent: BarComponent.Close, quoteComponent: QuoteComponent.Mid
  };
  protected initial2: WeightedMovingAverageParams = {
    length: 7, barComponent: BarComponent.Typical, quoteComponent: QuoteComponent.Bid
  };
}

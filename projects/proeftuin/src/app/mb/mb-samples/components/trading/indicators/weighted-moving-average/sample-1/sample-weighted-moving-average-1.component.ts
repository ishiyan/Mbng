import { Component } from '@angular/core';

import { WeightedMovingAverageParams }
  from 'projects/mb/src/lib/trading/indicators/weighted-moving-average/weighted-moving-average-params.interface';
import { BarComponent } from 'projects/mb/src/lib/data/entities/bar-component.enum';
import { QuoteComponent } from 'projects/mb/src/lib/data/entities/quote-component.enum';

@Component({
  selector: 'app-sample-weighted-moving-average-1',
  templateUrl: './sample-weighted-moving-average-1.component.html',
  styleUrls: ['./sample-weighted-moving-average-1.component.scss']
})
export class SampleWeightedMovingAverage1Component {
  protected selected1: WeightedMovingAverageParams = {
    length: 6, barComponent: BarComponent.Close, quoteComponent: QuoteComponent.Mid
  };
  protected selected2: WeightedMovingAverageParams = {
    length: 5, barComponent: BarComponent.Close, quoteComponent: QuoteComponent.Mid
  };
  protected selected3: WeightedMovingAverageParams = {
    length: 7, barComponent: BarComponent.Close, quoteComponent: QuoteComponent.Mid
  };
  protected selected4: WeightedMovingAverageParams = {
    length: 7, barComponent: BarComponent.Close, quoteComponent: QuoteComponent.Mid
  };
  protected selected5: WeightedMovingAverageParams = {
    length: 7, barComponent: BarComponent.Close, quoteComponent: QuoteComponent.Mid
  };
  protected initial2: WeightedMovingAverageParams = {
    length: 12, barComponent: BarComponent.Typical
  };
  protected initial3: WeightedMovingAverageParams = {
    length: 13, quoteComponent: QuoteComponent.Bid
  };
  protected initial4: WeightedMovingAverageParams = {
    length: 14
  };
  protected initial5: WeightedMovingAverageParams = {
    length: 15, barComponent: BarComponent.Open, quoteComponent: QuoteComponent.Ask
  };
}

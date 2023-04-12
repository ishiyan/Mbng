import { Component } from '@angular/core';

import { StandardDeviationParams }
  from 'projects/mb/src/lib/trading/indicators/statistics/standard-deviation/standard-deviation-params.interface';
import { BarComponent } from 'projects/mb/src/lib/data/entities/bar-component.enum';
import { QuoteComponent } from 'projects/mb/src/lib/data/entities/quote-component.enum';

@Component({
  selector: 'app-sample-standard-deviation-1',
  templateUrl: './sample-standard-deviation-1.component.html',
  styleUrls: ['./sample-standard-deviation-1.component.scss']
})
export class SampleStandardDeviation1Component {
  protected selected1: StandardDeviationParams = {
    length: 6, unbiased: true, barComponent: BarComponent.Close, quoteComponent: QuoteComponent.Mid
  };
  protected selected2: StandardDeviationParams = {
    length: 5, unbiased: true, barComponent: BarComponent.Close, quoteComponent: QuoteComponent.Mid
  };
  protected selected3: StandardDeviationParams = {
    length: 7, unbiased: true, barComponent: BarComponent.Close, quoteComponent: QuoteComponent.Mid
  };
  protected selected4: StandardDeviationParams = {
    length: 7, unbiased: true, barComponent: BarComponent.Close, quoteComponent: QuoteComponent.Mid
  };
  protected selected5: StandardDeviationParams = {
    length: 7, unbiased: true, barComponent: BarComponent.Close, quoteComponent: QuoteComponent.Mid
  };
  protected initial2: StandardDeviationParams = {
    length: 12, unbiased: true, barComponent: BarComponent.Typical
  };
  protected initial3: StandardDeviationParams = {
    length: 13, unbiased: false, quoteComponent: QuoteComponent.Bid
  };
  protected initial4: StandardDeviationParams = {
    length: 14, unbiased: true
  };
  protected initial5: StandardDeviationParams = {
    length: 15, unbiased: false, barComponent: BarComponent.Open, quoteComponent: QuoteComponent.Ask
  };
}

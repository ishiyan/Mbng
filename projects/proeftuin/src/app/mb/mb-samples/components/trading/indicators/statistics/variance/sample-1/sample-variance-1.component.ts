import { Component } from '@angular/core';

import { VarianceParams }
  from 'projects/mb/src/lib/trading/indicators/statistics/variance/variance-params.interface';
import { BarComponent } from 'projects/mb/src/lib/data/entities/bar-component.enum';
import { QuoteComponent } from 'projects/mb/src/lib/data/entities/quote-component.enum';

@Component({
    selector: 'app-sample-variance-1',
    templateUrl: './sample-variance-1.component.html',
    styleUrls: ['./sample-variance-1.component.scss'],
    standalone: false
})
export class SampleVariance1Component {
  protected selected1: VarianceParams = {
    length: 6, unbiased: true, barComponent: BarComponent.Close, quoteComponent: QuoteComponent.Mid
  };
  protected selected2: VarianceParams = {
    length: 5, unbiased: true, barComponent: BarComponent.Close, quoteComponent: QuoteComponent.Mid
  };
  protected selected3: VarianceParams = {
    length: 7, unbiased: true, barComponent: BarComponent.Close, quoteComponent: QuoteComponent.Mid
  };
  protected selected4: VarianceParams = {
    length: 7, unbiased: true, barComponent: BarComponent.Close, quoteComponent: QuoteComponent.Mid
  };
  protected selected5: VarianceParams = {
    length: 7, unbiased: true, barComponent: BarComponent.Close, quoteComponent: QuoteComponent.Mid
  };
  protected initial2: VarianceParams = {
    length: 12, unbiased: true, barComponent: BarComponent.Typical
  };
  protected initial3: VarianceParams = {
    length: 13, unbiased: false, quoteComponent: QuoteComponent.Bid
  };
  protected initial4: VarianceParams = {
    length: 14, unbiased: true
  };
  protected initial5: VarianceParams = {
    length: 15, unbiased: false, barComponent: BarComponent.Open, quoteComponent: QuoteComponent.Ask
  };
}

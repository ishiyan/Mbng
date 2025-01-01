import { Component } from '@angular/core';

import { SimpleMovingAverageParams }
  from 'projects/mb/src/lib/trading/indicators/simple-moving-average/simple-moving-average-params.interface';
import { BarComponent } from 'projects/mb/src/lib/data/entities/bar-component.enum';
import { QuoteComponent } from 'projects/mb/src/lib/data/entities/quote-component.enum';

@Component({
    selector: 'app-sample-simple-moving-average-1',
    templateUrl: './sample-simple-moving-average-1.component.html',
    styleUrls: ['./sample-simple-moving-average-1.component.scss'],
    standalone: false
})
export class SampleSimpleMovingAverage1Component {
  protected selected1: SimpleMovingAverageParams = {
    length: 6, barComponent: BarComponent.Close, quoteComponent: QuoteComponent.Mid
  };
  protected selected2: SimpleMovingAverageParams = {
    length: 5, barComponent: BarComponent.Close, quoteComponent: QuoteComponent.Mid
  };
  protected selected3: SimpleMovingAverageParams = {
    length: 7, barComponent: BarComponent.Close, quoteComponent: QuoteComponent.Mid
  };
  protected selected4: SimpleMovingAverageParams = {
    length: 7, barComponent: BarComponent.Close, quoteComponent: QuoteComponent.Mid
  };
  protected selected5: SimpleMovingAverageParams = {
    length: 7, barComponent: BarComponent.Close, quoteComponent: QuoteComponent.Mid
  };
  protected initial2: SimpleMovingAverageParams = {
    length: 12, barComponent: BarComponent.Typical
  };
  protected initial3: SimpleMovingAverageParams = {
    length: 13, quoteComponent: QuoteComponent.Bid
  };
  protected initial4: SimpleMovingAverageParams = {
    length: 14
  };
  protected initial5: SimpleMovingAverageParams = {
    length: 15, barComponent: BarComponent.Open, quoteComponent: QuoteComponent.Ask
  };
}

import { Component } from '@angular/core';

import { SimpleMovingAverageParams }
  from 'projects/mb/src/lib/trading/indicators/simple-moving-average/simple-moving-average-params.interface';
import { BarComponent } from 'projects/mb/src/lib/data/entities/bar-component.enum';
import { QuoteComponent } from 'projects/mb/src/lib/data/entities/quote-component.enum';

@Component({
    selector: 'app-sample-simple-moving-average-2',
    templateUrl: './sample-simple-moving-average-2.component.html',
    styleUrls: ['./sample-simple-moving-average-2.component.scss'],
    standalone: false
})
export class SampleSimpleMovingAverage2Component {
  protected selected1: SimpleMovingAverageParams = {
    length: 6, barComponent: BarComponent.Close, quoteComponent: QuoteComponent.Mid
  };
  protected selected2: SimpleMovingAverageParams = {
    length: 5, barComponent: BarComponent.Close, quoteComponent: QuoteComponent.Mid
  };
  protected initial2: SimpleMovingAverageParams = {
    length: 7, barComponent: BarComponent.Typical, quoteComponent: QuoteComponent.Bid
  };
}

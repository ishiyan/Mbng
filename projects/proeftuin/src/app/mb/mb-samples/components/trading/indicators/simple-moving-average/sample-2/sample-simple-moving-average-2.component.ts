import { ChangeDetectionStrategy, Component } from '@angular/core';
import { JsonPipe } from '@angular/common';
import { MatCard, MatCardHeader, MatCardTitle, MatCardContent } from '@angular/material/card';

import { BarComponent } from 'projects/mb/src/lib/data/entities/bar-component.enum';
import { QuoteComponent } from 'projects/mb/src/lib/data/entities/quote-component.enum';
import { SimpleMovingAverageParams }
  from 'projects/mb/src/lib/trading/indicators/simple-moving-average/simple-moving-average-params.interface';
import { SimpleMovingAverageParamsComponent }
  from 'projects/mb/src/lib/trading/indicators/simple-moving-average/simple-moving-average-params.component';

@Component({
  selector: 'app-sample-simple-moving-average-2',
  templateUrl: './sample-simple-moving-average-2.component.html',
  styleUrls: ['./sample-simple-moving-average-2.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [
    JsonPipe,
    MatCard,
    MatCardHeader,
    MatCardTitle,
    MatCardContent,
    SimpleMovingAverageParamsComponent
  ]
})
export class SampleSimpleMovingAverage2Component {
  protected selected1: SimpleMovingAverageParams = {
    length: 6, barComponent: BarComponent.Close, quoteComponent: QuoteComponent.Mid
  };
  protected selected2: SimpleMovingAverageParams = {
    length: 5, barComponent: BarComponent.Close, quoteComponent: QuoteComponent.Mid
  };
  protected initial1: SimpleMovingAverageParams = {
    length: 6, barComponent: BarComponent.Close, quoteComponent: QuoteComponent.Mid
  };
  protected initial2: SimpleMovingAverageParams = {
    length: 7, barComponent: BarComponent.Typical, quoteComponent: QuoteComponent.Bid
  };
}

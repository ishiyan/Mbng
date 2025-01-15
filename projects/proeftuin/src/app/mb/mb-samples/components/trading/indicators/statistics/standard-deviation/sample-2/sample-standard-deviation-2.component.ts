import { Component } from '@angular/core';

import { StandardDeviationParams }
  from 'projects/mb/src/lib/trading/indicators/statistics/standard-deviation/standard-deviation-params.interface';
import { BarComponent } from 'projects/mb/src/lib/data/entities/bar-component.enum';
import { QuoteComponent } from 'projects/mb/src/lib/data/entities/quote-component.enum';
import { MatCard, MatCardHeader, MatCardTitle, MatCardContent } from '@angular/material/card';
import { StandardDeviationModule } from '../../../../../../../../../../../mb/src/lib/trading/indicators/statistics/standard-deviation/standard-deviation.module';
import { JsonPipe } from '@angular/common';

@Component({
    selector: 'app-sample-standard-deviation-2',
    templateUrl: './sample-standard-deviation-2.component.html',
    styleUrls: ['./sample-standard-deviation-2.component.scss'],
    imports: [MatCard, MatCardHeader, MatCardTitle, MatCardContent, StandardDeviationModule, JsonPipe]
})
export class SampleStandardDeviation2Component {
  protected selected1: StandardDeviationParams = {
    length: 6, unbiased: true, barComponent: BarComponent.Close, quoteComponent: QuoteComponent.Mid
  };
  protected selected2: StandardDeviationParams = {
    length: 5, unbiased: true, barComponent: BarComponent.Close, quoteComponent: QuoteComponent.Mid
  };
  protected initial2: StandardDeviationParams = {
    length: 7, unbiased: false, barComponent: BarComponent.Typical, quoteComponent: QuoteComponent.Bid
  };
}

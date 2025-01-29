import { ChangeDetectionStrategy, Component } from '@angular/core';
import { JsonPipe } from '@angular/common';
import { MatCard, MatCardHeader, MatCardTitle, MatCardContent } from '@angular/material/card';

import { BarComponent } from 'projects/mb/src/lib/data/entities/bar-component.enum';
import { QuoteComponent } from 'projects/mb/src/lib/data/entities/quote-component.enum';
import { VarianceParams }
  from 'projects/mb/src/lib/trading/indicators/statistics/variance/variance-params.interface';
import { VarianceParamsComponent }
  from 'projects/mb/src/lib/trading/indicators/statistics/variance/variance-params.component';

@Component({
    selector: 'app-sample-variance-2',
    templateUrl: './sample-variance-2.component.html',
    styleUrls: ['./sample-variance-2.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush,
    imports: [
      JsonPipe,
      MatCard,
      MatCardHeader,
      MatCardTitle,
      MatCardContent,
      VarianceParamsComponent
    ]
})
export class SampleVariance2Component {
  protected selected1: VarianceParams = {
    length: 6, unbiased: true, barComponent: BarComponent.Close, quoteComponent: QuoteComponent.Mid
  };
  protected selected2: VarianceParams = {
    length: 5, unbiased: true, barComponent: BarComponent.Close, quoteComponent: QuoteComponent.Mid
  };
  protected initial1: VarianceParams = {
    length: 6, unbiased: true, barComponent: BarComponent.Close, quoteComponent: QuoteComponent.Mid
  };
  protected initial2: VarianceParams = {
    length: 7, unbiased: false, barComponent: BarComponent.Typical, quoteComponent: QuoteComponent.Bid
  };
}

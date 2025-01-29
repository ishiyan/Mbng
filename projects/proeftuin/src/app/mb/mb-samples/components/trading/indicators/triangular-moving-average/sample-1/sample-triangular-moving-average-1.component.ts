import { ChangeDetectionStrategy, Component } from '@angular/core';
import { JsonPipe } from '@angular/common';
import { MatCard, MatCardHeader, MatCardTitle, MatCardContent } from '@angular/material/card';

import { BarComponent } from 'projects/mb/src/lib/data/entities/bar-component.enum';
import { QuoteComponent } from 'projects/mb/src/lib/data/entities/quote-component.enum';
import { TriangularMovingAverageParams }
  from 'projects/mb/src/lib/trading/indicators/triangular-moving-average/triangular-moving-average-params.interface';
import { TriangularMovingAverageParamsComponent }
  from 'projects/mb/src/lib/trading/indicators/triangular-moving-average/triangular-moving-average-params.component';

@Component({
    selector: 'app-sample-triangular-moving-average-1',
    templateUrl: './sample-triangular-moving-average-1.component.html',
    styleUrls: ['./sample-triangular-moving-average-1.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush,
    imports: [
      JsonPipe,
      MatCard,
      MatCardHeader,
      MatCardTitle,
      MatCardContent,
      TriangularMovingAverageParamsComponent
    ]
})
export class SampleTriangularMovingAverage1Component {
  protected selected1: TriangularMovingAverageParams = {
    length: 6, barComponent: BarComponent.Close, quoteComponent: QuoteComponent.Mid
  };
  protected selected2: TriangularMovingAverageParams = {
    length: 5, barComponent: BarComponent.Close, quoteComponent: QuoteComponent.Mid
  };
  protected selected3: TriangularMovingAverageParams = {
    length: 7, barComponent: BarComponent.Close, quoteComponent: QuoteComponent.Mid
  };
  protected selected4: TriangularMovingAverageParams = {
    length: 7, barComponent: BarComponent.Close, quoteComponent: QuoteComponent.Mid
  };
  protected selected5: TriangularMovingAverageParams = {
    length: 7, barComponent: BarComponent.Close, quoteComponent: QuoteComponent.Mid
  };
  protected initial1: TriangularMovingAverageParams = {
    length: 6, barComponent: BarComponent.Close, quoteComponent: QuoteComponent.Mid
  };
  protected initial2: TriangularMovingAverageParams = {
    length: 12, barComponent: BarComponent.Typical
  };
  protected initial3: TriangularMovingAverageParams = {
    length: 13, quoteComponent: QuoteComponent.Bid
  };
  protected initial4: TriangularMovingAverageParams = {
    length: 14
  };
  protected initial5: TriangularMovingAverageParams = {
    length: 15, barComponent: BarComponent.Open, quoteComponent: QuoteComponent.Ask
  };
}

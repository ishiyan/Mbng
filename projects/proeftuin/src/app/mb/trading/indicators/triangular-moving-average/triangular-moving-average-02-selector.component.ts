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
  selector: 'app-mb-triangular-moving-average-02-selector',
  templateUrl: './triangular-moving-average-02-selector.component.html',
  styleUrls: ['./triangular-moving-average-02-selector.component.scss'],
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
export class TriangularMovingAverage02SelectorComponent {
  protected selected1: TriangularMovingAverageParams = {
    length: 6, barComponent: BarComponent.Close, quoteComponent: QuoteComponent.Mid
  };
  protected selected2: TriangularMovingAverageParams = {
    length: 5, barComponent: BarComponent.Close, quoteComponent: QuoteComponent.Mid
  };
  protected initial1: TriangularMovingAverageParams = {
    length: 6, barComponent: BarComponent.Close, quoteComponent: QuoteComponent.Mid
  };
  protected initial2: TriangularMovingAverageParams = {
    length: 7, barComponent: BarComponent.Typical, quoteComponent: QuoteComponent.Bid
  };
}

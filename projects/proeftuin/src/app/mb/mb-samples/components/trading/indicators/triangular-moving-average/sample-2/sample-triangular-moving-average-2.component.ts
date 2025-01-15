import { Component } from '@angular/core';

import { TriangularMovingAverageParams }
  from 'projects/mb/src/lib/trading/indicators/triangular-moving-average/triangular-moving-average-params.interface';
import { BarComponent } from 'projects/mb/src/lib/data/entities/bar-component.enum';
import { QuoteComponent } from 'projects/mb/src/lib/data/entities/quote-component.enum';
import { MatCard, MatCardHeader, MatCardTitle, MatCardContent } from '@angular/material/card';
import { TriangularMovingAverageModule } from '../../../../../../../../../../mb/src/lib/trading/indicators/triangular-moving-average/triangular-moving-average.module';
import { JsonPipe } from '@angular/common';

@Component({
    selector: 'app-sample-triangular-moving-average-2',
    templateUrl: './sample-triangular-moving-average-2.component.html',
    styleUrls: ['./sample-triangular-moving-average-2.component.scss'],
    imports: [MatCard, MatCardHeader, MatCardTitle, MatCardContent, TriangularMovingAverageModule, JsonPipe]
})
export class SampleTriangularMovingAverage2Component {
  protected selected1: TriangularMovingAverageParams = {
    length: 6, barComponent: BarComponent.Close, quoteComponent: QuoteComponent.Mid
  };
  protected selected2: TriangularMovingAverageParams = {
    length: 5, barComponent: BarComponent.Close, quoteComponent: QuoteComponent.Mid
  };
  protected initial2: TriangularMovingAverageParams = {
    length: 7, barComponent: BarComponent.Typical, quoteComponent: QuoteComponent.Bid
  };
}

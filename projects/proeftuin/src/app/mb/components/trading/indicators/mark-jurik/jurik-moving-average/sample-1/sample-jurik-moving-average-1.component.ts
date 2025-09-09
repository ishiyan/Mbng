import { ChangeDetectionStrategy, Component } from '@angular/core';
import { JsonPipe } from '@angular/common';
import { MatCard, MatCardHeader, MatCardTitle, MatCardContent } from '@angular/material/card';

import { BarComponent } from 'projects/mb/src/lib/data/entities/bar-component.enum';
import { QuoteComponent } from 'projects/mb/src/lib/data/entities/quote-component.enum';
import { JurikMovingAverageParams }
  from 'projects/mb/src/lib/trading/indicators/mark-jurik/jurik-moving-average/jurik-moving-average-params.interface';
import { JurikMovingAverageParamsComponent }
  from 'projects/mb/src/lib/trading/indicators/mark-jurik/jurik-moving-average/jurik-moving-average-params.component';

@Component({
  selector: 'app-sample-jurik-moving-average-1',
  templateUrl: './sample-jurik-moving-average-1.component.html',
  styleUrls: ['./sample-jurik-moving-average-1.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [
    JsonPipe,
    MatCard,
    MatCardHeader,
    MatCardTitle,
    MatCardContent,
    JurikMovingAverageParamsComponent
  ]
})
export class SampleJurikMovingAverage1Component {
  protected selected1: JurikMovingAverageParams = {
    length: 10, phase: 0, barComponent: BarComponent.Close, quoteComponent: QuoteComponent.Mid
  };
  protected selected2: JurikMovingAverageParams = {
    length: 5, phase: 0, barComponent: BarComponent.Close, quoteComponent: QuoteComponent.Mid
  };
  protected selected3: JurikMovingAverageParams = {
    length: 7, phase: 0, barComponent: BarComponent.Close, quoteComponent: QuoteComponent.Mid
  };
  protected selected4: JurikMovingAverageParams = {
    length: 7, phase: 0, barComponent: BarComponent.Close, quoteComponent: QuoteComponent.Mid
  };
  protected selected5: JurikMovingAverageParams = {
    length: 7, phase: 0, barComponent: BarComponent.Close, quoteComponent: QuoteComponent.Mid
  };
  protected initial1: JurikMovingAverageParams = {
    length: 6, phase: 0, barComponent: BarComponent.Close, quoteComponent: QuoteComponent.Mid
  };
  protected initial2: JurikMovingAverageParams = {
    length: 12, phase: 50, barComponent: BarComponent.Typical
  };
  protected initial3: JurikMovingAverageParams = {
    length: 13, phase: -50, quoteComponent: QuoteComponent.Bid
  };
  protected initial4: JurikMovingAverageParams = {
    length: 14, phase: 100, 
  };
  protected initial5: JurikMovingAverageParams = {
    length: 15, phase: -100, barComponent: BarComponent.Open, quoteComponent: QuoteComponent.Ask
  };
}

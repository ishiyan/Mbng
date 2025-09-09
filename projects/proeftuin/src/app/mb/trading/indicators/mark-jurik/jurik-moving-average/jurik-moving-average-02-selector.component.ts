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
  selector: 'app-mb-jurik-moving-average-02-selector',
  templateUrl: './jurik-moving-average-02-selector.component.html',
  styleUrls: ['./jurik-moving-average-02-selector.component.scss'],
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
export class JurikMovingAverage02SelectorComponent {
  protected selected1: JurikMovingAverageParams = {
    length: 6, phase: 0, barComponent: BarComponent.Close, quoteComponent: QuoteComponent.Mid
  };
  protected selected2: JurikMovingAverageParams = {
    length: 5, phase: 0, barComponent: BarComponent.Close, quoteComponent: QuoteComponent.Mid
  };
  protected initial2: JurikMovingAverageParams = {
    length: 7, phase: 0, barComponent: BarComponent.Typical, quoteComponent: QuoteComponent.Bid
  };
  protected initial1: JurikMovingAverageParams = {
    length: 6, phase: 0, barComponent: BarComponent.Close, quoteComponent: QuoteComponent.Mid
  };
}

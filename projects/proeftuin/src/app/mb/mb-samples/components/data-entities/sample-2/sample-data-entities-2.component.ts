import { ChangeDetectionStrategy, Component } from '@angular/core';
import { MatCard, MatCardHeader, MatCardTitle, MatCardContent } from '@angular/material/card';

import { QuoteComponent } from 'projects/mb/src/lib/data/entities/quote-component.enum';
import { QuoteComponentComponent } from 'projects/mb/src/lib/data/entities/quote-component.component';

@Component({
    selector: 'app-sample-data-entities-2',
    templateUrl: './sample-data-entities-2.component.html',
    styleUrls: ['./sample-data-entities-2.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush,
    imports: [
      MatCard,
      MatCardHeader,
      MatCardTitle,
      MatCardContent,
      QuoteComponentComponent
    ]
})
export class SampleDataEntities2Component {

  protected default = QuoteComponent.Mid;
  protected initial = QuoteComponent.WeightedMid;
  protected selected1 = '';
  protected selected2 = '';
  protected selected3 = '';

  protected selectionChange(log: string, component: QuoteComponent): string {
    log += ' ' + component + ',' ;
    return log;
  }
}

import { Component } from '@angular/core';

import { QuoteComponent } from 'mb';
import { MatCard, MatCardHeader, MatCardTitle, MatCardContent } from '@angular/material/card';
import { EntitiesModule } from '../../../../../../../../mb/src/lib/data/entities/entities.module';

@Component({
    selector: 'app-sample-data-entities-2',
    templateUrl: './sample-data-entities-2.component.html',
    styleUrls: ['./sample-data-entities-2.component.scss'],
    imports: [MatCard, MatCardHeader, MatCardTitle, MatCardContent, EntitiesModule]
})
export class SampleDataEntities2Component {

  protected initial = QuoteComponent.WeightedMid;
  protected selected1 = '';
  protected selected2 = '';
  protected selected3 = '';

  protected selectionChange(log: string, component: QuoteComponent): string {
    log += ' ' + component + ',' ;
    return log;
  }
}

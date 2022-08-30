import { Component } from '@angular/core';

import { QuoteComponent } from 'mb';

@Component({
  selector: 'mb-sample-data-entities-2',
  templateUrl: './sample-data-entities-2.component.html',
  styleUrls: ['./sample-data-entities-2.component.scss']
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

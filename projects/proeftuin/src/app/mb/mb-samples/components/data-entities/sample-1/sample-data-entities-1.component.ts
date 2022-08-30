import { Component } from '@angular/core';

import { BarComponent } from 'mb';

@Component({
  selector: 'mb-sample-data-entities-1',
  templateUrl: './sample-data-entities-1.component.html',
  styleUrls: ['./sample-data-entities-1.component.scss']
})
export class SampleDataEntities1Component {

  protected initial = BarComponent.Weighted;
  protected selected1 = '';
  protected selected2 = '';
  protected selected3 = '';

  protected selectionChange(log: string, component: BarComponent): string {
    log += ' ' + component + ',' ;
    return log;
  }
}

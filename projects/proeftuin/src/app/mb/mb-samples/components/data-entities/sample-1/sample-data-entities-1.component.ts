import { Component } from '@angular/core';

import { BarComponent } from 'mb';
import { MatCard, MatCardHeader, MatCardTitle, MatCardContent } from '@angular/material/card';
import { EntitiesModule } from '../../../../../../../../mb/src/lib/data/entities/entities.module';

@Component({
    selector: 'app-sample-data-entities-1',
    templateUrl: './sample-data-entities-1.component.html',
    styleUrls: ['./sample-data-entities-1.component.scss'],
    imports: [MatCard, MatCardHeader, MatCardTitle, MatCardContent, EntitiesModule]
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

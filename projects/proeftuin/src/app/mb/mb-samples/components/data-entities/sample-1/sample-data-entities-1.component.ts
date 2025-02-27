import { ChangeDetectionStrategy, Component } from '@angular/core';
import { MatCard, MatCardHeader, MatCardTitle, MatCardContent } from '@angular/material/card';

import { BarComponent } from 'projects/mb/src/lib/data/entities/bar-component.enum';
import { BarComponentComponent } from 'projects/mb/src/lib/data/entities/bar-component.component';

@Component({
  selector: 'app-sample-data-entities-1',
  templateUrl: './sample-data-entities-1.component.html',
  styleUrls: ['./sample-data-entities-1.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [
    MatCard,
    MatCardHeader,
    MatCardTitle,
    MatCardContent,
    BarComponentComponent
  ]
})
export class SampleDataEntities1Component {
  protected default = BarComponent.Typical;
  protected initial = BarComponent.Weighted;
  protected selected1 = '';
  protected selected2 = '';
  protected selected3 = '';

  protected selectionChange(log: string, component: BarComponent): string {
    log += ' ' + component + ',' ;
    return log;
  }
}

import { ChangeDetectionStrategy, Component } from '@angular/core';
import { MatCard, MatCardHeader, MatCardTitle, MatCardContent } from '@angular/material/card';

import { BarComponent } from 'projects/mb/src/lib/data/entities/bar-component.enum';
import { BarComponentComponent } from 'projects/mb/src/lib/data/entities/bar-component.component';

@Component({
  selector: 'app-mb-data-entities-01-bar-component-selector',
  templateUrl: './entities-01-bar-component-selector.component.html',
  styleUrls: ['./entities-01-bar-component-selector.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [
    MatCard,
    MatCardHeader,
    MatCardTitle,
    MatCardContent,
    BarComponentComponent
  ]
})
export class Entities01BarComponentSelectorComponent {
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

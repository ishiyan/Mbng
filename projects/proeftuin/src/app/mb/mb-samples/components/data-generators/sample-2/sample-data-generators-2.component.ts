import { ChangeDetectionStrategy, Component } from '@angular/core';
import { MatCard, MatCardHeader, MatCardTitle, MatCardContent } from '@angular/material/card';

import { ChirpParameters } from 'projects/mb/src/lib/data/generators/chirp/chirp-parameters';
import { ChirpParametersComponent } from 'projects/mb/src/lib/data/generators/chirp/chirp-parameters.component';

@Component({
  selector: 'app-sample-data-generators-2',
  templateUrl: './sample-data-generators-2.component.html',
  styleUrls: ['./sample-data-generators-2.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [
    MatCard,
    MatCardHeader,
    MatCardTitle,
    MatCardContent,
    ChirpParametersComponent
  ]
})
export class SampleDataGenerators2Component {
  protected default = new ChirpParameters();
  protected initial = new ChirpParameters();
  protected selected1 = '';

  protected selectionChange(log: string, component: ChirpParameters): string {
    log += ' ' + component + ',' ;
    return log;
  }
}

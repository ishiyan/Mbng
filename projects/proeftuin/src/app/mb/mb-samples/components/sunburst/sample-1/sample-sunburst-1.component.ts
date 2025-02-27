import { ChangeDetectionStrategy, Component } from '@angular/core';
import { MatCard, MatCardHeader, MatCardTitle, MatCardContent } from '@angular/material/card';

import { SunburstComponent } from 'projects/mb/src/lib/charts/hierarchy-tree/sunburst/sunburst.component';

import { flare } from '../../../test-data/hierarchies/flare';

@Component({
  selector: 'app-sample-sunburst-1',
  templateUrl: './sample-sunburst-1.component.html',
  styleUrls: ['./sample-sunburst-1.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [
    MatCard,
    MatCardHeader,
    MatCardTitle,
    MatCardContent,
    SunburstComponent
  ]
})
export class SampleSunburst1Component {
  flareHierarchy = flare;
}

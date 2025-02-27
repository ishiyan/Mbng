import { ChangeDetectionStrategy, Component } from '@angular/core';
import { MatCard, MatCardHeader, MatCardTitle, MatCardContent } from '@angular/material/card';

import { CirclepackComponent } from 'projects/mb/src/lib/charts/hierarchy-tree/circlepack/circlepack.component';

import { flare } from '../../../test-data/hierarchies/flare';

@Component({
  selector: 'app-sample-circlepack-1',
  templateUrl: './sample-circlepack-1.component.html',
  styleUrls: ['./sample-circlepack-1.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [
    MatCard,
    MatCardHeader,
    MatCardTitle,
    MatCardContent,
    CirclepackComponent
  ]
})
export class SampleCirclepack1Component {
  flareHierarchy = flare;
}

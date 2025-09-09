import { ChangeDetectionStrategy, Component } from '@angular/core';
import { MatCard, MatCardHeader, MatCardTitle, MatCardContent } from '@angular/material/card';

import { CirclepackComponent } from 'projects/mb/src/lib/charts/hierarchy-tree/circlepack/circlepack.component';

import { flare } from '../../test-data/hierarchies/flare';

@Component({
  selector: 'app-mb-circlepack-01-features',
  templateUrl: './circlepack-01-features.component.html',
  styleUrls: ['./circlepack-01-features.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [
    MatCard,
    MatCardHeader,
    MatCardTitle,
    MatCardContent,
    CirclepackComponent
  ]
})
export class Circlepack01FeaturesComponent {
  flareHierarchy = flare;
}

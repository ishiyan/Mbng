import { ChangeDetectionStrategy, Component } from '@angular/core';
import { MatCard, MatCardHeader, MatCardTitle, MatCardContent } from '@angular/material/card';

import { SunburstComponent } from 'projects/mb/src/lib/charts/hierarchy-tree/sunburst/sunburst.component';

import { flare } from '../../test-data/hierarchies/flare';

@Component({
  selector: 'app-mb-sunburst-01-features',
  templateUrl: './sunburst-01-features.component.html',
  styleUrls: ['./sunburst-01-features.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [
    MatCard,
    MatCardHeader,
    MatCardTitle,
    MatCardContent,
    SunburstComponent
  ]
})
export class Sunburst01FeaturesComponent {
  flareHierarchy = flare;
}

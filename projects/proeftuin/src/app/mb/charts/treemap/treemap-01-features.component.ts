import { ChangeDetectionStrategy, Component } from '@angular/core';
import { MatCard, MatCardHeader, MatCardTitle, MatCardContent } from '@angular/material/card';

import { TreemapComponent } from 'projects/mb/src/lib/charts/hierarchy-tree/treemap/treemap.component';

import { flare } from '../../test-data/hierarchies/flare';

@Component({
  selector: 'app-mb-treemap-01-features',
  templateUrl: './treemap-01-features.component.html',
  styleUrls: ['./treemap-01-features.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [
    MatCard,
    MatCardHeader,
    MatCardTitle,
    MatCardContent,
    TreemapComponent
  ]
})
export class Treemap01FeaturesComponent {
  flareHierarchy = flare;
}

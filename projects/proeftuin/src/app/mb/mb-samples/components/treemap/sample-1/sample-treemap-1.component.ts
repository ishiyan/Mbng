import { ChangeDetectionStrategy, Component } from '@angular/core';
import { MatCard, MatCardHeader, MatCardTitle, MatCardContent } from '@angular/material/card';

import { flare } from '../../../test-data/hierarchies/flare';

import { TreemapComponent } from 'projects/mb/src/lib/charts/hierarchy-tree/treemap/treemap.component';

@Component({
  selector: 'app-sample-treemap-1',
  templateUrl: './sample-treemap-1.component.html',
  styleUrls: ['./sample-treemap-1.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [
    MatCard,
    MatCardHeader,
    MatCardTitle,
    MatCardContent,
    TreemapComponent
  ]
})
export class SampleTreemap1Component {
  flareHierarchy = flare;
}

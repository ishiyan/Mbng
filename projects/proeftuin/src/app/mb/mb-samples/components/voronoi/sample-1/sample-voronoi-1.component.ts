import { ChangeDetectionStrategy, Component } from '@angular/core';
import { MatCard, MatCardHeader, MatCardTitle, MatCardContent } from '@angular/material/card';

import { VoronoiComponent } from 'projects/mb/src/lib/charts/hierarchy-tree/voronoi/voronoi.component';

import { flare } from '../../../test-data/hierarchies/flare';

@Component({
  selector: 'app-sample-voronoi-1',
  templateUrl: './sample-voronoi-1.component.html',
  styleUrls: ['./sample-voronoi-1.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [
    MatCard,
    MatCardHeader,
    MatCardTitle,
    MatCardContent,
    VoronoiComponent
  ]
})
export class SampleVoronoi1Component {
  flareHierarchy = flare;
}

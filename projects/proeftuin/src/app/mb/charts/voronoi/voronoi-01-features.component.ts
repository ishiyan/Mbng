import { ChangeDetectionStrategy, Component } from '@angular/core';
import { MatCard, MatCardHeader, MatCardTitle, MatCardContent } from '@angular/material/card';

import { VoronoiComponent } from 'projects/mb/src/lib/charts/hierarchy-tree/voronoi/voronoi.component';

import { flare } from '../../test-data/hierarchies/flare';

@Component({
  selector: 'app-mb-voronoi-01-features',
  templateUrl: './voronoi-01-features.component.html',
  styleUrls: ['./voronoi-01-features.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [
    MatCard,
    MatCardHeader,
    MatCardTitle,
    MatCardContent,
    VoronoiComponent
  ]
})
export class Voronoi01FeaturesComponent {
  flareHierarchy = flare;
}

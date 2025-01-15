import { Component } from '@angular/core';

import { flare } from '../../../test-data/hierarchies/flare';
import { MatCard, MatCardHeader, MatCardTitle, MatCardContent } from '@angular/material/card';

import { VoronoiComponent } from '../../../../../../../../mb/src/lib/charts/hierarchy-tree/voronoi/voronoi.component';

@Component({
    selector: 'app-sample-voronoi-1',
    templateUrl: './sample-voronoi-1.component.html',
    styleUrls: ['./sample-voronoi-1.component.scss'],
    imports: [MatCard, MatCardHeader, MatCardTitle, MatCardContent, VoronoiComponent]
})
export class SampleVoronoi1Component {

  flareHierarchy = flare;
}

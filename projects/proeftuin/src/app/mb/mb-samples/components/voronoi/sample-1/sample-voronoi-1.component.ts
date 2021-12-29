import { Component } from '@angular/core';

import { flare } from '../../../test-data/hierarchies/flare';

@Component({
  selector: 'mb-sample-voronoi-1',
  templateUrl: './sample-voronoi-1.component.html',
  styleUrls: ['./sample-voronoi-1.component.scss']
})
export class SampleVoronoi1Component {

  flareHierarchy = flare;
}

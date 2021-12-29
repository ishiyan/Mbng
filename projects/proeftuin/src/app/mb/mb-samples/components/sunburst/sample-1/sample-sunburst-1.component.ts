import { Component } from '@angular/core';

import { flare } from '../../../test-data/hierarchies/flare';

@Component({
  selector: 'mb-sample-sunburst-1',
  templateUrl: './sample-sunburst-1.component.html',
  styleUrls: ['./sample-sunburst-1.component.scss']
})
export class SampleSunburst1Component {

  flareHierarchy = flare;
}

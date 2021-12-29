import { Component } from '@angular/core';

import { flare } from '../../../test-data/hierarchies/flare';

@Component({
  selector: 'mb-sample-circlepack-1',
  templateUrl: './sample-circlepack-1.component.html',
  styleUrls: ['./sample-circlepack-1.component.scss']
})
export class SampleCirclepack1Component {

  flareHierarchy = flare;
}

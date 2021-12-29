import { Component } from '@angular/core';

import { flare } from '../../../test-data/hierarchies/flare';

@Component({
  selector: 'mb-sample-icicle-1',
  templateUrl: './sample-icicle-1.component.html',
  styleUrls: ['./sample-icicle-1.component.scss']
})
export class SampleIcicle1Component {

  flareHierarchy = flare;
}

import { Component } from '@angular/core';

import { flare } from '../../../test-data/hierarchies/flare';

@Component({
    selector: 'app-sample-treemap-1',
    templateUrl: './sample-treemap-1.component.html',
    styleUrls: ['./sample-treemap-1.component.scss'],
    standalone: false
})
export class SampleTreemap1Component {

  flareHierarchy = flare;
}

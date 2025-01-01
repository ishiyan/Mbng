import { Component } from '@angular/core';

import { flare } from '../../../test-data/hierarchies/flare';

@Component({
    selector: 'app-sample-sunburst-1',
    templateUrl: './sample-sunburst-1.component.html',
    styleUrls: ['./sample-sunburst-1.component.scss'],
    standalone: false
})
export class SampleSunburst1Component {

  flareHierarchy = flare;
}

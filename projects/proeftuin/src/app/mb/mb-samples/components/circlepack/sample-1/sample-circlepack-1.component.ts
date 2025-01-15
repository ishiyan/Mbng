import { Component } from '@angular/core';

import { flare } from '../../../test-data/hierarchies/flare';
import { MatCard, MatCardHeader, MatCardTitle, MatCardContent } from '@angular/material/card';

import { CirclepackComponent } from '../../../../../../../../mb/src/lib/charts/hierarchy-tree/circlepack/circlepack.component';

@Component({
    selector: 'app-sample-circlepack-1',
    templateUrl: './sample-circlepack-1.component.html',
    styleUrls: ['./sample-circlepack-1.component.scss'],
    imports: [MatCard, MatCardHeader, MatCardTitle, MatCardContent, CirclepackComponent]
})
export class SampleCirclepack1Component {

  flareHierarchy = flare;
}

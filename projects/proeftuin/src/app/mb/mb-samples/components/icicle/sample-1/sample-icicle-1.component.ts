import { Component } from '@angular/core';

import { flare } from '../../../test-data/hierarchies/flare';
import { MatCard, MatCardHeader, MatCardTitle, MatCardContent } from '@angular/material/card';

import { IcicleComponent } from '../../../../../../../../mb/src/lib/charts/hierarchy-tree/icicle/icicle.component';

@Component({
    selector: 'app-sample-icicle-1',
    templateUrl: './sample-icicle-1.component.html',
    styleUrls: ['./sample-icicle-1.component.scss'],
    imports: [MatCard, MatCardHeader, MatCardTitle, MatCardContent, IcicleComponent]
})
export class SampleIcicle1Component {

  flareHierarchy = flare;
}

import { Component } from '@angular/core';

import { flare } from '../../../test-data/hierarchies/flare';
import { MatCard, MatCardHeader, MatCardTitle, MatCardContent } from '@angular/material/card';

import { SunburstComponent } from '../../../../../../../../mb/src/lib/charts/hierarchy-tree/sunburst/sunburst.component';

@Component({
    selector: 'app-sample-sunburst-1',
    templateUrl: './sample-sunburst-1.component.html',
    styleUrls: ['./sample-sunburst-1.component.scss'],
    imports: [MatCard, MatCardHeader, MatCardTitle, MatCardContent, SunburstComponent]
})
export class SampleSunburst1Component {

  flareHierarchy = flare;
}

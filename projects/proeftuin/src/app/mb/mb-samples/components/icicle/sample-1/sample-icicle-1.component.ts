import { ChangeDetectionStrategy, Component } from '@angular/core';
import { MatCard, MatCardHeader, MatCardTitle, MatCardContent } from '@angular/material/card';

import { IcicleComponent } from 'projects/mb/src/lib/charts/hierarchy-tree/icicle/icicle.component';

import { flare } from '../../../test-data/hierarchies/flare';

@Component({
  selector: 'app-sample-icicle-1',
  templateUrl: './sample-icicle-1.component.html',
  styleUrls: ['./sample-icicle-1.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [
    MatCard,
    MatCardHeader,
    MatCardTitle,
    MatCardContent,
    IcicleComponent
  ]
})
export class SampleIcicle1Component {
  flareHierarchy = flare;
}

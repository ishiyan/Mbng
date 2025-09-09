import { ChangeDetectionStrategy, Component } from '@angular/core';
import { MatCard, MatCardHeader, MatCardTitle, MatCardContent } from '@angular/material/card';

import { IcicleComponent } from 'projects/mb/src/lib/charts/hierarchy-tree/icicle/icicle.component';

import { flare } from '../../test-data/hierarchies/flare';

@Component({
  selector: 'app-mb-icicle-01-features',
  templateUrl: './icicle-01-features.component.html',
  styleUrls: ['./icicle-01-features.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [
    MatCard,
    MatCardHeader,
    MatCardTitle,
    MatCardContent,
    IcicleComponent
  ]
})
export class Icicle01FeaturesComponent {
  flareHierarchy = flare;
}

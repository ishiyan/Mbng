import { ChangeDetectionStrategy, Component } from '@angular/core';
import { MatCard, MatCardHeader, MatCardTitle, MatCardContent, MatCardSubtitle } from '@angular/material/card';
import * as d3 from 'd3';

import { HilbertCurveComponent } from 'projects/mb/src/lib/charts/hilbert-curve/hilbert-curve.component';

@Component({
  selector: 'app-mb-hilbert-curve-01-features',
  templateUrl: './hilbert-curve-01-features.component.html',
  styleUrls: ['./hilbert-curve-01-features.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [
    MatCard,
    MatCardHeader,
    MatCardTitle,
    MatCardContent,
    MatCardSubtitle,
    HilbertCurveComponent
  ]
})
export class HilbertCurve01FeaturesComponent {
  readonly cool = d3.interpolateCool;
  readonly warm = d3.interpolateWarm;
  readonly rainbow = d3.interpolateRainbow;
  readonly sinebow = d3.interpolateSinebow;
}

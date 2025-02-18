import { Component } from '@angular/core';
import { MatCard, MatCardHeader, MatCardTitle, MatCardContent, MatCardSubtitle } from '@angular/material/card';
import * as d3 from 'd3';

import { HilbertCurveComponent } from 'projects/mb/src/lib/charts/hilbert-curve/hilbert-curve.component';

@Component({
    selector: 'app-sample-hilbert-curve-1',
    templateUrl: './sample-hilbert-curve-1.component.html',
    styleUrls: ['./sample-hilbert-curve-1.component.scss'],
    imports: [MatCard, MatCardHeader, MatCardTitle, MatCardContent, HilbertCurveComponent, MatCardSubtitle]
})
export class SampleHilbertCurve1Component {
    readonly cool = d3.interpolateCool;
    readonly warm = d3.interpolateWarm;
    readonly rainbow = d3.interpolateRainbow;
    readonly sinebow = d3.interpolateSinebow;
}

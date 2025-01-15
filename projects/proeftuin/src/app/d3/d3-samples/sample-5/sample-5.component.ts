import { Component } from '@angular/core';
import { HilbertCurveComponent } from './hilbert-curve/hilbert-curve.component';
import { HilbertPathsComponent } from './hilbert-paths/hilbert-paths.component';
import { HilbertStocksComponent } from './hilbert-stocks/hilbert-stocks.component';

@Component({
    selector: 'app-d3-sample-5',
    templateUrl: './sample-5.component.html',
    styleUrls: ['./sample-5.component.scss'],
    imports: [HilbertCurveComponent, HilbertPathsComponent, HilbertStocksComponent]
})
export class Sample5Component { }

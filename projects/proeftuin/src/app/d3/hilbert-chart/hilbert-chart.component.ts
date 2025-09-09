import { Component } from '@angular/core';
import { HilbertCurveComponent } from './hilbert-curve/hilbert-curve.component';
import { HilbertPathsComponent } from './hilbert-paths/hilbert-paths.component';
import { HilbertStocksComponent } from './hilbert-stocks/hilbert-stocks.component';

@Component({
    selector: 'app-d3-hilbert-chart',
    templateUrl: './hilbert-chart.component.html',
    styleUrls: ['./hilbert-chart.component.scss'],
    imports: [HilbertCurveComponent, HilbertPathsComponent, HilbertStocksComponent]
})
export class HilbertChartComponent { }

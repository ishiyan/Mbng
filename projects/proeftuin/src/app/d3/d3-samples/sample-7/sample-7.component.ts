import { Component } from '@angular/core';
import { D3tcHorizonChartInteractiveComponent } from './d3tc-horizon-chart-interactive/d3tc-horizon-chart-interactive.component';
import { D3tcHorizonChartBandsComponent } from './d3tc-horizon-chart-bands/d3tc-horizon-chart-bands.component';

@Component({
    selector: 'app-d3-sample-7',
    templateUrl: './sample-7.component.html',
    styleUrls: ['./sample-7.component.scss'],
    imports: [D3tcHorizonChartInteractiveComponent, D3tcHorizonChartBandsComponent]
})
export class Sample7Component { }

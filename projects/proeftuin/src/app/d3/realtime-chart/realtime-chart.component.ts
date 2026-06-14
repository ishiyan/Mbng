import { Component, ChangeDetectionStrategy } from '@angular/core';
import { RealTimeChartComponent } from './real-time-chart/real-time-chart.component';

@Component({
    selector: 'app-d3-realtime-chart',
    templateUrl: './realtime-chart.component.html',
    styleUrls: ['./realtime-chart.component.scss'],
    changeDetection: ChangeDetectionStrategy.Eager,
    imports: [RealTimeChartComponent]
})
export class RealtimeChartComponent { }

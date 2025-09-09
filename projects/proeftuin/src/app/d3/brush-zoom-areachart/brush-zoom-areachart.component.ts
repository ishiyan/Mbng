import { ChangeDetectionStrategy, Component } from '@angular/core';

import { BrushAndZoomAreaChartComponent } from './brush-and-zoom-area-chart/brush-and-zoom-area-chart.component';

@Component({
  selector: 'app-d3-brush-zoom-areachart',
  templateUrl: './brush-zoom-areachart.component.html',
  styleUrls: ['./brush-zoom-areachart.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [BrushAndZoomAreaChartComponent]
})
export class BrushZoomAreachartComponent { }

import { ChangeDetectionStrategy, Component } from '@angular/core';

import { LineStyle } from 'projects/mb/src/lib/charts/ohlcv-chart/selector/line-style';
import { MatCard, MatCardHeader, MatCardTitle, MatCardContent } from '@angular/material/card';
import { LineStyleComponent } from 'projects/mb/src/lib/charts/ohlcv-chart/selector/line-style.component';
import { JsonPipe } from '@angular/common';

const initialStyle = (): LineStyle => {
  const style = new LineStyle();
  style.color = '#00ff00';
  style.width = 2;
  style.dash = '4,2';
  style.interpolation = 'camullRom';
  return style;
};

@Component({
    selector: 'app-sample-ohlcv-chart-selector-5',
    templateUrl: './sample-ohlcv-chart-selector-5.component.html',
    styleUrls: ['./sample-ohlcv-chart-selector-5.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush,
    imports: [MatCard, MatCardHeader, MatCardTitle, MatCardContent, LineStyleComponent, JsonPipe]
})
export class SampleOhlcvChartSelector5Component {
  protected def = new LineStyle();
  protected selected1 = new LineStyle();
  protected selected2 = new LineStyle();
  protected initial2 = initialStyle();
}

import { Component } from '@angular/core';

import { LineStyle } from 'projects/mb/src/lib/charts/ohlcv-chart/selector/line-style';

const initialStyle = (): LineStyle => {
  const style = new LineStyle();
  style.color = '#00ff00';
  style.width = 2;
  style.dash = '4,2';
  style.interpolation = 'camullRom';
  return style;
};

@Component({
  selector: 'app-sample-ohlcv-chart-selector-6',
  templateUrl: './sample-ohlcv-chart-selector-6.component.html',
  styleUrls: ['./sample-ohlcv-chart-selector-6.component.scss']
})
export class SampleOhlcvChartSelector6Component {
  protected selected1 = new LineStyle();
  protected selected2 = new LineStyle();
  protected initial2 = initialStyle();
}

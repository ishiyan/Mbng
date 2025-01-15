import { Component } from '@angular/core';

import { LineStyle } from 'projects/mb/src/lib/charts/ohlcv-chart/selector/line-style';
import { MatCard, MatCardHeader, MatCardTitle, MatCardContent } from '@angular/material/card';
import { OhlcvChartSelectorModule } from '../../../../../../../../mb/src/lib/charts/ohlcv-chart/selector/ohlcv-chart-selector.module';
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
    imports: [MatCard, MatCardHeader, MatCardTitle, MatCardContent, OhlcvChartSelectorModule, JsonPipe]
})
export class SampleOhlcvChartSelector5Component {
  protected selected1 = new LineStyle();
  protected selected2 = new LineStyle();
  protected initial2 = initialStyle();
}

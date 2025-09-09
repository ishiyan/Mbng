import { ChangeDetectionStrategy, Component } from '@angular/core';
import { JsonPipe } from '@angular/common';
import { MatCard, MatCardHeader, MatCardTitle, MatCardContent } from '@angular/material/card';

import { LineStyle } from 'projects/mb/src/lib/charts/ohlcv-chart/selector/line-style';
import { LineStyleComponent } from 'projects/mb/src/lib/charts/ohlcv-chart/selector/line-style.component';

const initialStyle = (): LineStyle => {
  const style = new LineStyle();
  style.color = '#00ff00';
  style.width = 2;
  style.dash = '4,2';
  style.interpolation = 'camullRom';
  return style;
};

@Component({
  selector: 'app-mb-ohlcv-chart-selectors-05-line-style',
  templateUrl: './ohlcv-chart-selectors-05-line-style.component.html',
  styleUrls: ['./ohlcv-chart-selectors-05-line-style.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [
    JsonPipe,
    MatCard,
    MatCardHeader,
    MatCardTitle,
    MatCardContent,
    LineStyleComponent
  ]
})
export class OhlcvChartSelectors05LineStyleComponent {
  protected def = new LineStyle();
  protected selected1 = new LineStyle();
  protected selected2 = new LineStyle();
  protected initial2 = initialStyle();
}

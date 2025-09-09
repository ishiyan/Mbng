import { ChangeDetectionStrategy, Component } from '@angular/core';
import { JsonPipe } from '@angular/common';
import { MatCard, MatCardHeader, MatCardTitle, MatCardContent } from '@angular/material/card';

import { LineStyle } from 'projects/mb/src/lib/charts/ohlcv-chart/selector/line-style';
import { LineStyleSelectorComponent } from 'projects/mb/src/lib/charts/ohlcv-chart/selector/line-style-selector.component';

const initialStyle = (): LineStyle => {
  const style = new LineStyle();
  style.color = '#00ff00';
  style.width = 2;
  style.dash = '4,2';
  style.interpolation = 'camullRom';
  return style;
};

@Component({
  selector: 'app-mb-ohlcv-chart-selectors-06-line-selector',
  templateUrl: './ohlcv-chart-selectors-06-line-selector.component.html',
  styleUrls: ['./ohlcv-chart-selectors-06-line-selector.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [
    JsonPipe,
    MatCard,
    MatCardHeader,
    MatCardTitle,
    MatCardContent,
    LineStyleSelectorComponent
  ]
})
export class OhlcvChartSelectors06LineSelectorComponent {
  protected def = new LineStyle();
  protected selected1 = new LineStyle();
  protected selected2 = new LineStyle();
  protected initial2 = initialStyle();
}

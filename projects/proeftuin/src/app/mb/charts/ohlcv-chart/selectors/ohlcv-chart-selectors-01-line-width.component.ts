import { ChangeDetectionStrategy, Component } from '@angular/core';
import { MatCard, MatCardHeader, MatCardTitle, MatCardContent } from '@angular/material/card';

import { LineWidthComponent } from 'projects/mb/src/lib/charts/ohlcv-chart/selector/line-width.component';

@Component({
  selector: 'app-mb-ohlcv-chart-selectors-01-line-width',
  templateUrl: './ohlcv-chart-selectors-01-line-width.component.html',
  styleUrls: ['./ohlcv-chart-selectors-01-line-width.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [
    MatCard,
    MatCardHeader,
    MatCardTitle,
    MatCardContent,
    LineWidthComponent
  ]
})
export class OhlcvChartSelectors01LineWidthComponent {
  protected def = 1.0;
  protected initial = 3.5;
  protected selected1 = '';
  protected selected2 = '';
  protected selected3 = '';

  protected selectionChange(log: string, value: number): string {
    log += ' ' + value + ',';
    return log;
  }
}

import { ChangeDetectionStrategy, Component } from '@angular/core';
import { MatCard, MatCardHeader, MatCardTitle, MatCardContent } from '@angular/material/card';

import { LineInterpolationComponent } from 'projects/mb/src/lib/charts/ohlcv-chart/selector/line-interpolation.component';

@Component({
  selector: 'app-mb-ohlcv-chart-selectors-03-line-interpolation',
  templateUrl: './ohlcv-chart-selectors-03-line-interpolation.component.html',
  styleUrls: ['./ohlcv-chart-selectors-03-line-interpolation.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [
    MatCard,
    MatCardHeader,
    MatCardTitle,
    MatCardContent,
    LineInterpolationComponent
  ]
})
export class OhlcvChartSelectors03LineInterpolationComponent {
  protected def = 'linear';
  protected initial = 'cardinal';
  protected selected1 = '';
  protected selected2 = '';
  protected selected3 = '';

  protected selectionChange(log: string, value: string): string {
    log += ' ' + value + ',';
    return log;
  }
}

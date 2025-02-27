import { ChangeDetectionStrategy, Component } from '@angular/core';
import { MatCard, MatCardHeader, MatCardTitle, MatCardContent } from '@angular/material/card';

import { LineDashComponent } from 'projects/mb/src/lib/charts/ohlcv-chart/selector/line-dash.component';

@Component({
  selector: 'app-sample-ohlcv-chart-selector-2',
  templateUrl: './sample-ohlcv-chart-selector-2.component.html',
  styleUrls: ['./sample-ohlcv-chart-selector-2.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [
    MatCard,
    MatCardHeader,
    MatCardTitle,
    MatCardContent,
    LineDashComponent
  ]
})
export class SampleOhlcvChartSelector2Component {
  protected def = '';
  protected initial = '5,5';
  protected selected1 = '';
  protected selected2 = '';
  protected selected3 = '';

  protected selectionChange(log: string, value: string): string {
    log += ' "' + value + '",';
    return log;
  }
}

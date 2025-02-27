import { ChangeDetectionStrategy, Component } from '@angular/core';
import { MatCard, MatCardHeader, MatCardTitle, MatCardContent } from '@angular/material/card';

import { ColorComponent } from 'projects/mb/src/lib/charts/ohlcv-chart/selector/color.component';

@Component({
  selector: 'app-sample-ohlcv-chart-selector-4',
  templateUrl: './sample-ohlcv-chart-selector-4.component.html',
  styleUrls: ['./sample-ohlcv-chart-selector-4.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [
    MatCard,
    MatCardHeader,
    MatCardTitle,
    MatCardContent,
    ColorComponent
  ]
})
export class SampleOhlcvChartSelector4Component {
  protected def = '#000';
  protected initial = '#ff00ff';
  protected selected1 = '';
  protected selected2 = '';
  protected selected3 = '';

  protected selectionChange(log: string, value: string): string {
    log = value;
    return log;
  }
}

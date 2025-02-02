import { ChangeDetectionStrategy, Component } from '@angular/core';
import { MatCard, MatCardHeader, MatCardTitle, MatCardContent } from '@angular/material/card';

import { LineInterpolationComponent } from 'projects/mb/src/lib/charts/ohlcv-chart/selector/line-interpolation.component';

@Component({
    selector: 'app-sample-ohlcv-chart-selector-3',
    templateUrl: './sample-ohlcv-chart-selector-3.component.html',
    styleUrls: ['./sample-ohlcv-chart-selector-3.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush,
    imports: [MatCard, MatCardHeader, MatCardTitle, MatCardContent, LineInterpolationComponent]
})
export class SampleOhlcvChartSelector3Component {

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

import { Component } from '@angular/core';
import { MatCard, MatCardHeader, MatCardTitle, MatCardContent } from '@angular/material/card';
import { OhlcvChartSelectorModule } from '../../../../../../../../mb/src/lib/charts/ohlcv-chart/selector/ohlcv-chart-selector.module';

@Component({
    selector: 'app-sample-ohlcv-chart-selector-4',
    templateUrl: './sample-ohlcv-chart-selector-4.component.html',
    styleUrls: ['./sample-ohlcv-chart-selector-4.component.scss'],
    imports: [MatCard, MatCardHeader, MatCardTitle, MatCardContent, OhlcvChartSelectorModule]
})
export class SampleOhlcvChartSelector4Component {

  protected initial = '#ff00ff';
  protected selected1 = '';
  protected selected2 = '';
  protected selected3 = '';

  protected selectionChange(log: string, value: string): string {
    log = value;
    return log;
  }
}

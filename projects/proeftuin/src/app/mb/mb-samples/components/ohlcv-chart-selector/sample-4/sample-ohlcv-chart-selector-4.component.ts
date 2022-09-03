import { Component } from '@angular/core';

@Component({
  selector: 'mb-sample-ohlcv-chart-selector-4',
  templateUrl: './sample-ohlcv-chart-selector-4.component.html',
  styleUrls: ['./sample-ohlcv-chart-selector-4.component.scss']
})
export class SampleOhlcvChartSelector4Component {

  protected initial = 'cardinal';
  protected selected1 = '';
  protected selected2 = '';
  protected selected3 = '';

  protected selectionChange(log: string, value: string): string {
    log += ' ' + value + ',';
    return log;
  }
}

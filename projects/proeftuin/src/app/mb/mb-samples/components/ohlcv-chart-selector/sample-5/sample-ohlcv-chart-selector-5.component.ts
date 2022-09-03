import { Component } from '@angular/core';

@Component({
  selector: 'mb-sample-ohlcv-chart-selector-5',
  templateUrl: './sample-ohlcv-chart-selector-5.component.html',
  styleUrls: ['./sample-ohlcv-chart-selector-5.component.scss']
})
export class SampleOhlcvChartSelector5Component {

  protected initial = 'cardinal';
  protected selected1 = '';
  protected selected2 = '';
  protected selected3 = '';

  protected selectionChange(log: string, value: string): string {
    log += ' ' + value + ',';
    return log;
  }
}

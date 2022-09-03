import { Component } from '@angular/core';

@Component({
  selector: 'mb-sample-ohlcv-chart-selector-1',
  templateUrl: './sample-ohlcv-chart-selector-1.component.html',
  styleUrls: ['./sample-ohlcv-chart-selector-1.component.scss']
})
export class SampleOhlcvChartSelector1Component {

  protected initial = 3.5;
  protected selected1 = '';
  protected selected2 = '';
  protected selected3 = '';

  protected selectionChange(log: string, value: number): string {
    log += ' ' + value + ',';
    return log;
  }
}

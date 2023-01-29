import { Component } from '@angular/core';

@Component({
  selector: 'app-sample-ohlcv-chart-selector-3',
  templateUrl: './sample-ohlcv-chart-selector-3.component.html',
  styleUrls: ['./sample-ohlcv-chart-selector-3.component.scss']
})
export class SampleOhlcvChartSelector3Component {

  protected initial = 'cardinal';
  protected selected1 = '';
  protected selected2 = '';
  protected selected3 = '';

  protected selectionChange(log: string, value: string): string {
    log += ' ' + value + ',';
    return log;
  }
}

import { Component } from '@angular/core';

@Component({
  selector: 'app-sample-ohlcv-chart-selector-2',
  templateUrl: './sample-ohlcv-chart-selector-2.component.html',
  styleUrls: ['./sample-ohlcv-chart-selector-2.component.scss']
})
export class SampleOhlcvChartSelector2Component {

  protected initial = '5,5';
  protected selected1 = '';
  protected selected2 = '';
  protected selected3 = '';

  protected selectionChange(log: string, value: string): string {
    log += ' "' + value + '",';
    return log;
  }
}

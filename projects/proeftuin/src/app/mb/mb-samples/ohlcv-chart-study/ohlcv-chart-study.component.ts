import { Component } from '@angular/core';

import { Configuration } from 'projects/mb/src/lib/charts/ohlcv-chart/template/configuration';
import { TestData } from './test-data/test-data';

@Component({
    selector: 'mb-sample-ohlcv-chart-study',
    templateUrl: './ohlcv-chart-study.component.html',
    styleUrls: ['./ohlcv-chart-study.component.scss'],
    standalone: false
})
export class OhlcvChartStudyComponent {
  public showPortal = false;
  public configPrefilled: Configuration = TestData.configDataPrefilled;

  private testData: TestData = new TestData();
  public configModifiable: Configuration = this.testData.config;

  public clearData(): void {
    this.testData.clear();
    this.configModifiable = { ...this.configModifiable };
  }

  public addData1(): void {
    this.testData.addSingle();
    this.configModifiable = { ...this.configModifiable };
  }

  public addData10(): void {
    this.testData.addTen();
    this.configModifiable = { ...this.configModifiable };
  }

  public addDataAll(): void {
    this.testData.addAll();
    this.configModifiable = { ...this.configModifiable };
  }
}

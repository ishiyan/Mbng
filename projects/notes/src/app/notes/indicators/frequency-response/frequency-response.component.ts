import { Component } from '@angular/core';

import { FrequencyResponse, SimpleMovingAverage } from 'projects/mb/src/public-api';

const sl = 4096;

@Component({
  selector: 'app-ind-frequency-response',
  templateUrl: './frequency-response.component.html',
  styleUrls: ['./frequency-response.component.scss']
})
export class FrequencyResponseComponent {
  private sma2 = FrequencyResponse.calculate(sl, new SimpleMovingAverage(2), 4);
  private sma3 = FrequencyResponse.calculate(sl, new SimpleMovingAverage(3), 6);
  private sma4 = FrequencyResponse.calculate(sl, new SimpleMovingAverage(4), 8);
  private sma5 = FrequencyResponse.calculate(sl, new SimpleMovingAverage(5), 10);
  private sma6 = FrequencyResponse.calculate(sl, new SimpleMovingAverage(6), 12);
  private sma7 = FrequencyResponse.calculate(sl, new SimpleMovingAverage(7), 14);

  protected filters = [this.sma2, this.sma3, this.sma4, this.sma5, this.sma6, this.sma7];
}

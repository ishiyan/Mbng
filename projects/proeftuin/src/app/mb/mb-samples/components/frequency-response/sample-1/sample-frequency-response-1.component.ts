import { Component } from '@angular/core';

import { FrequencyResponse, SimpleMovingAverage } from 'projects/mb/src/public-api';

const sl = 2048;

@Component({
  selector: 'mb-sample-frequency-response-1',
  templateUrl: './sample-frequency-response-1.component.html',
  styleUrls: ['./sample-frequency-response-1.component.scss']
})
export class SampleFrequencyResponse1Component {
  protected readonly sma2 = FrequencyResponse.calculate(sl, new SimpleMovingAverage(2), 4);
  protected readonly sma3 = FrequencyResponse.calculate(sl, new SimpleMovingAverage(3), 6);
  protected readonly sma4 = FrequencyResponse.calculate(sl, new SimpleMovingAverage(4), 8);
  protected readonly sma5 = FrequencyResponse.calculate(sl, new SimpleMovingAverage(5), 10);
  protected readonly sma6 = FrequencyResponse.calculate(sl, new SimpleMovingAverage(6), 12);
  protected readonly sma7 = FrequencyResponse.calculate(sl, new SimpleMovingAverage(7), 14);
}

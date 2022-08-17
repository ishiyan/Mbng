import { Component } from '@angular/core';

import { FrequencyResponse, SimpleMovingAverage } from 'projects/mb/src/public-api';

import { frequencyResponseOfAnIndicator, simpleMovingAverage } from '../../../notes';
import { IdentityFilter } from './identity-filter';

const sl = 4096;

@Component({
  selector: 'app-ind-frequency-response',
  templateUrl: './frequency-response.component.html',
  styleUrls: ['./frequency-response.component.scss']
})
export class FrequencyResponseComponent {
  protected fr = frequencyResponseOfAnIndicator;
  protected sma = simpleMovingAverage;

  protected sma2 = FrequencyResponse.calculate(sl, new SimpleMovingAverage(2), 4);
  protected sma3 = FrequencyResponse.calculate(sl, new SimpleMovingAverage(3), 6);
  protected sma4 = FrequencyResponse.calculate(sl, new SimpleMovingAverage(4), 8);
  protected sma5 = FrequencyResponse.calculate(sl, new SimpleMovingAverage(5), 10);
  protected sma6 = FrequencyResponse.calculate(sl, new SimpleMovingAverage(6), 12);
  protected sma7 = FrequencyResponse.calculate(sl, new SimpleMovingAverage(7), 14);

  protected identity = FrequencyResponse.calculate(sl, new IdentityFilter(), 0);

  protected filters = [this.sma2, this.sma3, this.sma4, this.sma5, this.sma6, this.sma7];
}

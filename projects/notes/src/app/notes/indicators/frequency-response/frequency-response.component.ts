import { Component } from '@angular/core';

import { FrequencyResponse, SimpleMovingAverage } from 'mb';

import { frequencyResponseOfAnIndicatorNote, simpleMovingAverageNote } from '../../../notes';
import { IdentityFilter } from './identity-filter';

const sl = 4096;

@Component({
  selector: 'app-ind-frequency-response',
  templateUrl: './frequency-response.component.html',
  styleUrls: ['./frequency-response.component.scss']
})
export class FrequencyResponseComponent {
  protected frNote = frequencyResponseOfAnIndicatorNote;
  protected smaNote = simpleMovingAverageNote;

  protected sma2 = FrequencyResponse.calculate(sl, new SimpleMovingAverage({length: 2}), 4);
  protected sma3 = FrequencyResponse.calculate(sl, new SimpleMovingAverage({length: 3}), 6);
  protected sma4 = FrequencyResponse.calculate(sl, new SimpleMovingAverage({length: 4}), 8);
  protected sma5 = FrequencyResponse.calculate(sl, new SimpleMovingAverage({length: 5}), 10);
  protected sma6 = FrequencyResponse.calculate(sl, new SimpleMovingAverage({length: 6}), 12);
  protected sma7 = FrequencyResponse.calculate(sl, new SimpleMovingAverage({length: 7}), 14);

  protected identity = FrequencyResponse.calculate(sl, new IdentityFilter(), 0);

  protected filters = [this.sma2, this.sma3, this.sma4, this.sma5, this.sma6, this.sma7];
}

import { ChangeDetectionStrategy, Component } from '@angular/core';
import { JsonPipe } from '@angular/common';
import { MatCard, MatCardHeader, MatCardTitle, MatCardContent } from '@angular/material/card';

import { FractalAdaptiveMovingAverageParams }
  from 'projects/mb/src/lib/trading/indicators/john-ehlers/fractal-adaptive-moving-average/fractal-adaptive-moving-average-params.interface';
import { FractalAdaptiveMovingAverageParamsComponent }
  from 'projects/mb/src/lib/trading/indicators/john-ehlers/fractal-adaptive-moving-average/fractal-adaptive-moving-average-params.component';
import { BarComponent } from 'projects/mb/src/lib/data/entities/bar-component.enum';
import { QuoteComponent } from 'projects/mb/src/lib/data/entities/quote-component.enum';
  
@Component({
  selector: 'app-sample-fractal-adaptive-moving-average-params-1',
  templateUrl: './sample-fractal-adaptive-moving-average-params-1.component.html',
  styleUrls: ['./sample-fractal-adaptive-moving-average-params-1.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [
    JsonPipe,
    MatCard,
    MatCardHeader,
    MatCardTitle,
    MatCardContent,
    FractalAdaptiveMovingAverageParamsComponent
  ]
})
export class SampleFractalAdaptiveMovingAverageParams1Component {
  protected selected1: FractalAdaptiveMovingAverageParams = {
    length: 16
  };
  protected initial1: FractalAdaptiveMovingAverageParams = {
    length: 16
  };

  protected selected2: FractalAdaptiveMovingAverageParams = {
    length: 16, slowestSmoothingFactor: 0.01
  };
  protected initial2: FractalAdaptiveMovingAverageParams = {
    length: 16, slowestSmoothingFactor: 0.01
  };

  protected selected3: FractalAdaptiveMovingAverageParams = {
    length: 16,
    barComponent: BarComponent.Median
  };
  protected initial3: FractalAdaptiveMovingAverageParams = {
    length: 16,
    barComponent: BarComponent.Median
  };

  protected selected4: FractalAdaptiveMovingAverageParams = {
    length: 16, slowestSmoothingFactor: 0.01,
    barComponent: BarComponent.Typical
  };
  protected initial4: FractalAdaptiveMovingAverageParams = {
    length: 16, slowestSmoothingFactor: 0.01,
    barComponent: BarComponent.Typical
  };

  protected selected5: FractalAdaptiveMovingAverageParams = {
    length: 16,
    quoteComponent: QuoteComponent.Weighted
  };
  protected initial5: FractalAdaptiveMovingAverageParams = {
    length: 16,
    quoteComponent: QuoteComponent.Weighted
  };

  protected selected6: FractalAdaptiveMovingAverageParams = {
    length: 16, slowestSmoothingFactor: 0.01,
    quoteComponent: QuoteComponent.SpreadBp
  };
  protected initial6: FractalAdaptiveMovingAverageParams = {
    length: 16, slowestSmoothingFactor: 0.01,
    quoteComponent: QuoteComponent.SpreadBp
  };

  protected selected7: FractalAdaptiveMovingAverageParams = {
    length: 16,
    barComponent: BarComponent.Median, quoteComponent: QuoteComponent.Weighted
  };
  protected initial7: FractalAdaptiveMovingAverageParams = {
    length: 16,
    barComponent: BarComponent.Median, quoteComponent: QuoteComponent.Weighted
  };

  protected selected8: FractalAdaptiveMovingAverageParams = {
    length: 16, slowestSmoothingFactor: 0.01,
    barComponent: BarComponent.Typical, quoteComponent: QuoteComponent.SpreadBp
  };
  protected initial8: FractalAdaptiveMovingAverageParams = {
    length: 16, slowestSmoothingFactor: 0.01,
    barComponent: BarComponent.Typical, quoteComponent: QuoteComponent.SpreadBp
  };
}

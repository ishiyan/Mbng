import { AfterContentInit, ChangeDetectionStrategy, Component, effect, input, output } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatFormField, MatLabel } from '@angular/material/form-field';
import { MatInput } from '@angular/material/input';

import { BarComponent } from '../../../../data/entities/bar-component.enum';
import { QuoteComponent } from '../../../../data/entities/quote-component.enum';
import { BarComponentComponent } from '../../../../data/entities/bar-component.component';
import { QuoteComponentComponent } from '../../../../data/entities/quote-component.component';
import { FractalAdaptiveMovingAverageParams } from './fractal-adaptive-moving-average-params.interface';

@Component({
  selector: 'mb-fractal-adaptive-moving-average-params',
  templateUrl: './fractal-adaptive-moving-average-params.component.html',
  styleUrls: ['./fractal-adaptive-moving-average-params.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [
    FormsModule,
    MatFormField,
    MatLabel,
    MatInput,
    BarComponentComponent,
    QuoteComponentComponent
  ]
})
export class FractalAdaptiveMovingAverageParamsComponent implements AfterContentInit {
  private initialized = false;

  protected params: FractalAdaptiveMovingAverageParams = {
    length: 16, slowestSmoothingFactor: 0.01,
    barComponent: BarComponent.Median
  };

  protected get lengthParam(): number {
    return this.params.length;
  }
  protected set lengthParam(value: number) {
    if (!value || value < 2) {
      value = 2;
    }

    if (this.params.length === value) {
      return;
    }

    this.params.length = value;
    this.params = { ...this.params };
    this.notify();
  }

  protected get alphaParam(): number {
    return this.params.slowestSmoothingFactor ? this.params.slowestSmoothingFactor : 0.01;
  }
  protected set alphaParam(value: number) {
    if (value === undefined) {
      value = 0.01;
    }
    if (value < 0) {
      value = 0;
    }
    if (value > 1) {
      value = 1;
    }

    this.params.slowestSmoothingFactor = value;
    this.params = { ...this.params };
    this.notify();
  }

  protected barComponent?: BarComponent;
  protected quoteComponent?: QuoteComponent;
  protected barComponentVisible = false;
  protected quoteComponentVisible = false;
  
  protected alphaParamVisible = false;

  /** Event emitted when the selected value has been changed by the user. */
  readonly selectionChange = output<FractalAdaptiveMovingAverageParams>();

  /** Specifies an initial value. */
  initial = input.required<FractalAdaptiveMovingAverageParams>();

  constructor() {
    effect(() => {
      const value = this.initial();
      this.params = value;
      this.lengthParam = value.length;
      if (value.slowestSmoothingFactor === undefined) {
        this.alphaParamVisible = false;
        this.params.slowestSmoothingFactor = undefined;
      } else {
        this.alphaParamVisible = true;
        this.params.slowestSmoothingFactor = value.slowestSmoothingFactor;
      }

      this.params.barComponent = value.barComponent;
      this.barComponent = value.barComponent;
      this.params.quoteComponent = value.quoteComponent;
      this.quoteComponent = value.quoteComponent;
      this.barComponentVisible = value.barComponent !== undefined;
      this.quoteComponentVisible = value.quoteComponent !== undefined;
    });
  }

  ngAfterContentInit() {
    this.initialized = true;
    this.notify();
  }

  protected barComponentChanged(component: BarComponent) {
    this.params.barComponent = component;
    this.params = { ...this.params };
    this.notify();
  }

  protected quoteComponentChanged(component: QuoteComponent) {
    this.params.quoteComponent = component;
    this.params = { ...this.params };
    this.notify();
  }

  private notify() {
    if (this.initialized) {
      this.selectionChange.emit(this.params);
    }
  }
}

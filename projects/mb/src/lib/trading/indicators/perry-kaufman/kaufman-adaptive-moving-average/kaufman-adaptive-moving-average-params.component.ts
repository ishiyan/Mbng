import { AfterContentInit, ChangeDetectionStrategy, Component, effect, input, output } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatFormField, MatLabel } from '@angular/material/form-field';
import { MatInput } from '@angular/material/input';
import { MatSlideToggle } from '@angular/material/slide-toggle';

import { BarComponent } from '../../../../data/entities/bar-component.enum';
import { QuoteComponent } from '../../../../data/entities/quote-component.enum';
import { BarComponentComponent } from '../../../../data/entities/bar-component.component';
import { QuoteComponentComponent } from '../../../../data/entities/quote-component.component';
import { KaufmanAdaptiveMovingAverageLengthParams } from './kaufman-adaptive-moving-average-params.interface';
import { KaufmanAdaptiveMovingAverageSmoothingFactorParams } from './kaufman-adaptive-moving-average-params.interface';

const guardLength = (object: any): object is KaufmanAdaptiveMovingAverageLengthParams => 'fastestLength' in object;

@Component({
  selector: 'mb-kaufman-adaptive-moving-average-params',
  templateUrl: './kaufman-adaptive-moving-average-params.component.html',
  styleUrls: ['./kaufman-adaptive-moving-average-params.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [
    FormsModule,
    MatFormField,
    MatLabel,
    MatInput,
    MatSlideToggle,
    BarComponentComponent,
    QuoteComponentComponent
  ]
})
export class KaufmanAdaptiveMovingAverageParamsComponent implements AfterContentInit {
  private initialized = false;
  private useAlphaInternal = false;

  protected paramsLength: KaufmanAdaptiveMovingAverageLengthParams = {
    efficiencyRatioLength: 10, fastestLength: 2, slowestLength: 30, barComponent: BarComponent.Close
  };

  protected paramsAlpha: KaufmanAdaptiveMovingAverageSmoothingFactorParams = {
    efficiencyRatioLength: 10, fastestSmoothingFactor: 2. / 3., slowestSmoothingFactor: 2. / 31.,
    barComponent: BarComponent.Close
  };

  protected get efficiencyRatioLengthParam(): number {
    return this.paramsLength.efficiencyRatioLength;
  }
  protected set efficiencyRatioLengthParam(value: number) {
    if (!value || value < 2) {
      value = 2;
    }

    this.paramsLength.efficiencyRatioLength = value;
    this.paramsLength = { ...this.paramsLength };

    this.paramsAlpha.efficiencyRatioLength = value;
    this.paramsAlpha = { ...this.paramsAlpha };
    this.notify();
  }

  protected get fastestLengthParam(): number {
    return this.paramsLength.fastestLength;
  }
  protected set fastestLengthParam(value: number) {
    if (!value || value < 2) {
      value = 2;
    }

    let a = 2 / (value + 1);
    a = a < 0.0001 ? 0.0001 : a;
    a = a > 1 ? 1 : a;
    this.paramsAlpha.fastestSmoothingFactor = a;
    this.paramsAlpha = { ...this.paramsAlpha };

    this.paramsLength.fastestLength = value;
    this.paramsLength = { ...this.paramsLength };

    this.notify();
  }

  protected get slowestLengthParam(): number {
    return this.paramsLength.slowestLength;
  }
  protected set slowestLengthParam(value: number) {
    if (!value || value < 2) {
      value = 2;
    }

    let a = 2 / (value + 1);
    a = a < 0.0001 ? 0.0001 : a;
    a = a > 1 ? 1 : a;
    this.paramsAlpha.slowestSmoothingFactor = a;
    this.paramsAlpha = { ...this.paramsAlpha };

    this.paramsLength.slowestLength = value;
    this.paramsLength = { ...this.paramsLength };

    this.notify();
  }

  protected get useAlpha(): boolean {
    return this.useAlphaInternal;
  }
  protected set useAlpha(value: boolean) {
    if (this.useAlphaInternal === value) {
      return;
    }

    this.useAlphaInternal = value;

    if (this.useAlphaInternal) {
      this.paramsAlpha = { ...this.paramsAlpha };
      this.notify();
    } else {
      this.paramsLength = { ...this.paramsLength };
      this.notify();
    }
  }

  protected get fastestAlphaParam(): number {
    return this.paramsAlpha.fastestSmoothingFactor;
  }
  protected set fastestAlphaParam(value: number) {
    if (!value || value > 1) {
      value = 1;
    }

    let l = 2 / value - 1;
    l = l < 2 ? 2 : l;
    l = l > 1024 ? 1024 : l;
    this.paramsLength.fastestLength = l;

    this.paramsAlpha.fastestSmoothingFactor = value;
    this.paramsAlpha = { ...this.paramsAlpha };
    this.notify();
  }

  protected get slowestAlphaParam(): number {
    return this.paramsAlpha.slowestSmoothingFactor;
  }
  protected set slowestAlphaParam(value: number) {
    if (!value || value > 1) {
      value = 1;
    }

    let l = 2 / value - 1;
    l = l < 2 ? 2 : l;
    l = l > 1024 ? 1024 : l;
    this.paramsLength.slowestLength = l;

    this.paramsAlpha.slowestSmoothingFactor = value;
    this.paramsAlpha = { ...this.paramsAlpha };
    this.notify();
  }

  protected barComponent?: BarComponent;
  protected quoteComponent?: QuoteComponent;
  protected barComponentVisible = this.barComponent !== undefined;
  protected quoteComponentVisible = this.quoteComponent !== undefined;

  /** Event emitted when the selected value has been changed by the user. */
  readonly selectionChange = output<KaufmanAdaptiveMovingAverageLengthParams | KaufmanAdaptiveMovingAverageSmoothingFactorParams>();

  /** Specifies an initial value. */
  initial = input.required<KaufmanAdaptiveMovingAverageLengthParams | KaufmanAdaptiveMovingAverageSmoothingFactorParams>();

  constructor() {
    effect(() => {
      const value = this.initial();
      if (guardLength(value)) {
        this.paramsLength = value as KaufmanAdaptiveMovingAverageLengthParams;
        this.useAlpha = false;
      } else {
        this.paramsAlpha = value as KaufmanAdaptiveMovingAverageSmoothingFactorParams;
        this.useAlpha = true;
      }

      this.barComponent = value.barComponent;
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
    this.paramsLength.barComponent = component;
    this.paramsAlpha.barComponent = component;
    this.paramsLength = { ...this.paramsLength };
    this.paramsAlpha = { ...this.paramsAlpha };
    this.notify();
  }

  protected quoteComponentChanged(component: QuoteComponent) {
    this.paramsLength.quoteComponent = component;
    this.paramsAlpha.quoteComponent = component;
    this.paramsLength = { ...this.paramsLength };
    this.paramsAlpha = { ...this.paramsAlpha };
    this.notify();
  }

  private notify() {
    if (this.initialized) {
      if (this.useAlpha) {
        this.selectionChange.emit(this.paramsAlpha);
      } else {
        this.selectionChange.emit(this.paramsLength);
      }
    }
  }
}

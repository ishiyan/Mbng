import { AfterContentInit, ChangeDetectionStrategy, Component, effect, input, output } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatFormField, MatLabel } from '@angular/material/form-field';
import { MatInput } from '@angular/material/input';

import { HilbertTransformerCycleEstimatorParams } from './hilbert-transformer-cycle-estimator-params.interface';

@Component({
  selector: 'mb-hilbert-transformer-cycle-estimator-params',
  templateUrl: './hilbert-transformer-cycle-estimator-params.component.html',
  styleUrls: ['./hilbert-transformer-cycle-estimator-params.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [
    FormsModule,
    MatFormField,
    MatLabel,
    MatInput
  ]
})
export class HilbertTransformerCycleEstimatorParamsComponent implements AfterContentInit {
  private initialized = false;

  protected params: HilbertTransformerCycleEstimatorParams = {
    smoothingLength: 4, alphaEmaQuadratureInPhase: 0.2, alphaEmaPeriod: 0.2, warmUpPeriod: 0
  };

  protected get smoothingLengthParam(): number {
    return this.params.smoothingLength;
  }
  protected set smoothingLengthParam(value: number) {
    if (!value || value < 2) {
      value = 2;
    }
    if (value > 4) {
      value = 4;
    }
    this.params.smoothingLength = value;
    this.params = { ...this.params };
    this.notify();
  }

  protected get alphaQuadParam(): number {
    return this.params.alphaEmaQuadratureInPhase;
  }
  protected set alphaQuadParam(value: number) {
    if (!value) {
      value = 0;
    } else if (value < 0) {
      value = 0;
    } else if (value > 1) {
      value = 1;
    }
    this.params.alphaEmaQuadratureInPhase = value;
    this.params = { ...this.params };
    this.notify();
  }

  protected get alphaPeriodParam(): number {
    return this.params.alphaEmaPeriod;
  }
  protected set alphaPeriodParam(value: number) {
    if (!value) {
      value = 0;
    } else if (value < 0) {
      value = 0;
    } else if (value > 1) {
      value = 1;
    }
    this.params.alphaEmaPeriod = value;
    this.params = { ...this.params };
    this.notify();
  }

  protected get warmUpParam(): number {
    return this.params.warmUpPeriod ? this.params.warmUpPeriod : 0;
  }
  protected set warmUpParam(value: number) {
    if (!value || value <= 0) {
      value = 0;
    }
    if (value === this.params.warmUpPeriod) {
      return;
    }
    if (value === 0) {
      this.params.warmUpPeriod = undefined
    } else {
      this.params.warmUpPeriod = value;
    }
    this.params = { ...this.params };
    this.notify();
  }

  /** Event emitted when the selected value has been changed by the user. */
  readonly selectionChange = output<HilbertTransformerCycleEstimatorParams>();

  /** Specifies an initial value. */
  initial = input.required<HilbertTransformerCycleEstimatorParams>();

  constructor() {
    effect(() => {
      const value = this.initial();
      this.params = value;
    });
  }

  ngAfterContentInit() {
    this.initialized = true;
    this.notify();
  }

  private notify() {
    if (this.initialized) {
      this.selectionChange.emit(this.params);
    }
  }
}

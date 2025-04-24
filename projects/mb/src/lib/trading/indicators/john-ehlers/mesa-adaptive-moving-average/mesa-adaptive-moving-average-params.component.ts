import { AfterContentInit, ChangeDetectionStrategy, Component, effect, input, output } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatFormField, MatLabel } from '@angular/material/form-field';
import { MatInput } from '@angular/material/input';
import { MatSlideToggle } from '@angular/material/slide-toggle';

import { BarComponent } from '../../../../data/entities/bar-component.enum';
import { QuoteComponent } from '../../../../data/entities/quote-component.enum';
import { BarComponentComponent } from '../../../../data/entities/bar-component.component';
import { QuoteComponentComponent } from '../../../../data/entities/quote-component.component';
import { HilbertTransformerCycleEstimatorType } from '../hilbert-transformer/hilbert-transformer-cycle-estimator-type.enum';
import { HilbertTransformerCycleEstimatorTypeComponent } from '../hilbert-transformer/hilbert-transformer-cycle-estimator-type.component';
import { HilbertTransformerCycleEstimatorParams } from '../hilbert-transformer/hilbert-transformer-cycle-estimator-params.interface';
import { HilbertTransformerCycleEstimatorParamsComponent } from '../hilbert-transformer/hilbert-transformer-cycle-estimator-params.component';
import { MesaAdaptiveMovingAverageLengthParams } from './mesa-adaptive-moving-average-params.interface';
import { MesaAdaptiveMovingAverageSmoothingFactorParams } from './mesa-adaptive-moving-average-params.interface';

const guardLength = (object: any): object is MesaAdaptiveMovingAverageLengthParams => 'fastLimitLength' in object;

@Component({
  selector: 'mb-mesa-adaptive-moving-average-params',
  templateUrl: './mesa-adaptive-moving-average-params.component.html',
  styleUrls: ['./mesa-adaptive-moving-average-params.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [
    FormsModule,
    MatFormField,
    MatLabel,
    MatInput,
    MatSlideToggle,
    HilbertTransformerCycleEstimatorTypeComponent,
    HilbertTransformerCycleEstimatorParamsComponent,
    BarComponentComponent,
    QuoteComponentComponent
  ]
})
export class MesaAdaptiveMovingAverageParamsComponent implements AfterContentInit {
  private initialized = false;
  private useAlphaInternal = false;

  protected paramsLength: MesaAdaptiveMovingAverageLengthParams = {
    fastLimitLength: 3, slowLimitLength: 39,
    estimatorType: HilbertTransformerCycleEstimatorType.HomodyneDiscriminator,
    barComponent: BarComponent.Close
  };

  protected paramsAlpha: MesaAdaptiveMovingAverageSmoothingFactorParams = {
    fastLimitSmoothingFactor: .5, slowLimitSmoothingFactor: .05,
    estimatorType: HilbertTransformerCycleEstimatorType.HomodyneDiscriminator,
    barComponent: BarComponent.Close
  };

  protected get estimatorTypeParam(): HilbertTransformerCycleEstimatorType {
    return this.paramsLength.estimatorType || HilbertTransformerCycleEstimatorType.HomodyneDiscriminator;
  }
  protected set estimatorTypeParam(value: HilbertTransformerCycleEstimatorType) {
    this.paramsAlpha.estimatorType = value;
    this.paramsAlpha = { ...this.paramsAlpha };

    this.paramsLength.estimatorType = value;
    this.paramsLength = { ...this.paramsLength };

    this.notify();
  }
  protected estimatorTypeChanged(value: HilbertTransformerCycleEstimatorType) {
    this.estimatorTypeParam = value;
  }

  protected get estimatorParamsParam(): HilbertTransformerCycleEstimatorParams {
    return this.estimatorParams;
  }
  protected set estimatorParamsParam(value: HilbertTransformerCycleEstimatorParams) {
    this.paramsAlpha.estimatorParams = value;
    this.paramsAlpha = { ...this.paramsAlpha };

    this.paramsLength.estimatorParams = value;
    this.paramsLength = { ...this.paramsLength };

    this.estimatorParams = value;
    this.notify();
  }

  protected get fastLengthParam(): number {
    return this.paramsLength.fastLimitLength;
  }
  protected set fastLengthParam(value: number) {
    if (!value || value < 2) {
      value = 2;
    }

    let a = 2 / (value + 1);
    a = a < 0.0001 ? 0.0001 : a;
    a = a > 1 ? 1 : a;
    this.paramsAlpha.fastLimitSmoothingFactor = a;
    this.paramsAlpha = { ...this.paramsAlpha };

    this.paramsLength.fastLimitLength = value;
    this.paramsLength = { ...this.paramsLength };

    this.notify();
  }

  protected get slowLengthParam(): number {
    return this.paramsLength.slowLimitLength;
  }
  protected set slowLengthParam(value: number) {
    if (!value || value < 2) {
      value = 2;
    }

    let a = 2 / (value + 1);
    a = a < 0.0001 ? 0.0001 : a;
    a = a > 1 ? 1 : a;
    this.paramsAlpha.slowLimitSmoothingFactor = a;
    this.paramsAlpha = { ...this.paramsAlpha };

    this.paramsLength.slowLimitLength = value;
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

  protected get fastAlphaParam(): number {
    return this.paramsAlpha.fastLimitSmoothingFactor;
  }
  protected set fastAlphaParam(value: number) {
    if (!value || value > 1) {
      value = 1;
    }

    let l = 2 / value - 1;
    l = l < 2 ? 2 : l;
    l = l > 1024 ? 1024 : l;
    this.paramsLength.fastLimitLength = l;

    this.paramsAlpha.fastLimitSmoothingFactor = value;
    this.paramsAlpha = { ...this.paramsAlpha };
    this.notify();
  }

  protected get slowAlphaParam(): number {
    return this.paramsAlpha.slowLimitSmoothingFactor;
  }
  protected set slowAlphaParam(value: number) {
    if (!value || value > 1) {
      value = 1;
    }

    let l = 2 / value - 1;
    l = l < 2 ? 2 : l;
    l = l > 1024 ? 1024 : l;
    this.paramsLength.slowLimitLength = l;

    this.paramsAlpha.slowLimitSmoothingFactor = value;
    this.paramsAlpha = { ...this.paramsAlpha };
    this.notify();
  }

  protected barComponent?: BarComponent;
  protected quoteComponent?: QuoteComponent;
  protected barComponentVisible = this.barComponent !== undefined;
  protected quoteComponentVisible = this.quoteComponent !== undefined;
  
  private estimatorParams: HilbertTransformerCycleEstimatorParams = {
    smoothingLength: 3, alphaEmaQuadratureInPhase: 0.3, alphaEmaPeriod: 0.3
  };
  protected estimatorParamsVisible = false;

  /** Event emitted when the selected value has been changed by the user. */
  readonly selectionChange = output<MesaAdaptiveMovingAverageLengthParams | MesaAdaptiveMovingAverageSmoothingFactorParams>();

  /** Specifies an initial value. */
  initial = input.required<MesaAdaptiveMovingAverageLengthParams | MesaAdaptiveMovingAverageSmoothingFactorParams>();

  constructor() {
    effect(() => {
      const value = this.initial();
      if (guardLength(value)) {
        this.useAlpha = false;
        this.paramsLength = value as MesaAdaptiveMovingAverageLengthParams;
        this.slowLengthParam = value.slowLimitLength;
        this.fastLengthParam = value.fastLimitLength;
      } else {
        this.useAlpha = true;
        this.paramsAlpha = value as MesaAdaptiveMovingAverageSmoothingFactorParams;
        this.slowAlphaParam = value.slowLimitSmoothingFactor;
        this.fastAlphaParam = value.fastLimitSmoothingFactor;
      }

      this.estimatorTypeParam = value.estimatorType || HilbertTransformerCycleEstimatorType.HomodyneDiscriminator;
      if (value.estimatorParams) {
        this.estimatorParams = value.estimatorParams;
        this.estimatorParamsVisible = true;
        this.estimatorParamsParam = value.estimatorParams;
      }

      this.paramsLength.barComponent = value.barComponent;
      this.paramsAlpha.barComponent = value.barComponent;      
      this.barComponent = value.barComponent;
      this.paramsLength.quoteComponent = value.quoteComponent;
      this.paramsAlpha.quoteComponent = value.quoteComponent;
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

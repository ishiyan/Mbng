import { Component, EventEmitter, Input, AfterContentInit, Output } from '@angular/core';

import { BarComponent } from '../../../../data/entities/bar-component.enum';
import { QuoteComponent } from '../../../../data/entities/quote-component.enum';

import { T2ExponentialMovingAverageLengthParams } from './t2-exponential-moving-average-params.interface';
import { T2ExponentialMovingAverageSmoothingFactorParams } from './t2-exponential-moving-average-params.interface';

const firstIsAverageDefault = true;
const guardLength = (object: any): object is T2ExponentialMovingAverageLengthParams => 'length' in object;

@Component({
    selector: 'mb-t2-exponential-moving-average-params',
    templateUrl: './t2-exponential-moving-average-params.component.html',
    styleUrls: ['./t2-exponential-moving-average-params.component.scss'],
    standalone: false
})
export class T2ExponentialMovingAverageParamsComponent implements AfterContentInit {
  private initialized = false;
  private firstIsAverage = firstIsAverageDefault;
  private useAlphaInternal = false;
  private vFactorInternal = 0.7;

  protected paramsLength: T2ExponentialMovingAverageLengthParams = {
    length: 6, vFactor: 0.7, firstIsAverage: firstIsAverageDefault, barComponent: BarComponent.Close
  };

  protected paramsAlpha: T2ExponentialMovingAverageSmoothingFactorParams = {
    smoothingFactor: 0.285, vFactor: 0.7, barComponent: BarComponent.Close
  };

  protected get lengthParam(): number {
    return this.paramsLength.length;
  }
  protected set lengthParam(value: number) {
    if (!value || value < 2) {
      value = 2;
    }

    let a  = 2 / (value + 1);
    a = a < 0.001 ? 0.001 : a;
    a = a > 1 ? 1 : a;
    this.paramsAlpha.smoothingFactor = a;

    this.paramsLength.length = value;
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

  protected get alphaParam(): number {
    return this.paramsAlpha.smoothingFactor;
  }
  protected set alphaParam(value: number) {
    if (!value || value > 1) {
      value = 1;
    }

    let l = 2 / value - 1;
    l = l < 2 ? 2 : l;
    l = l > 1024 ? 1024 : l;
    this.paramsLength.length = l;

    this.paramsAlpha.smoothingFactor = value;
    this.paramsAlpha = { ...this.paramsAlpha };
    this.notify();
  }

  protected get vFactorParam(): number {
    return this.vFactorInternal;
  }
  protected set vFactorParam(value: number) {
    if (!value || value > 1) {
      value = 1;
    }

    this.vFactorInternal = value;
    this.paramsAlpha.vFactor = value;
    this.paramsLength.vFactor = value;

    if (this.useAlpha) {
      this.paramsAlpha = { ...this.paramsAlpha };
      this.notify();
    } else {
      this.paramsLength = { ...this.paramsLength };
      this.notify();
    }
  }

  protected get firstIsAverageParam(): boolean {
    return this.firstIsAverage;
  }
  protected set firstIsAverageParam(value: boolean) {
    if (this.firstIsAverage === value) {
      return;
    }

    this.firstIsAverage = value;
    this.paramsLength.firstIsAverage = value;

    if (this.useAlpha) {
      this.paramsAlpha = { ...this.paramsAlpha };
      this.notify();
    } else {
      this.paramsLength = { ...this.paramsLength };
      this.notify();
    }
  }

  protected barComponent?: BarComponent;
  protected quoteComponent?: QuoteComponent;
  protected barComponentVisible = this.barComponent !== undefined;
  protected quoteComponentVisible = this.quoteComponent !== undefined;

  /** Event emitted when the selected value has been changed by the user. */
  @Output() readonly selectionChange: EventEmitter<T2ExponentialMovingAverageLengthParams | T2ExponentialMovingAverageSmoothingFactorParams> =
    new EventEmitter<T2ExponentialMovingAverageLengthParams | T2ExponentialMovingAverageSmoothingFactorParams>();

  /** Specifies an initial value. */
  @Input() set initial(value: T2ExponentialMovingAverageLengthParams | T2ExponentialMovingAverageSmoothingFactorParams) {
    if (guardLength(value)) {
      this.paramsLength = value as T2ExponentialMovingAverageLengthParams;
      this.firstIsAverage = this.paramsLength.firstIsAverage;
      this.useAlpha = false;
    } else {
      this.paramsAlpha = value as T2ExponentialMovingAverageSmoothingFactorParams;
      this.useAlpha = true;
      this.firstIsAverage = false;
    }

    this.barComponent = value.barComponent;
    this.quoteComponent = value.quoteComponent;
    this.barComponentVisible = value.barComponent !== undefined;
    this.quoteComponentVisible = value.quoteComponent !== undefined;
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
    if ( this.initialized) {
      if (this.useAlpha) {
        this.selectionChange.emit(this.paramsAlpha);
      } else {
        this.selectionChange.emit(this.paramsLength);
      }
    }
  }
}

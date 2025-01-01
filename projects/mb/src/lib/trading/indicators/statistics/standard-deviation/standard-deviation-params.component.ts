import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

import { BarComponent } from '../../../../data/entities/bar-component.enum';
import { QuoteComponent } from '../../../../data/entities/quote-component.enum';

import { StandardDeviationParams } from './standard-deviation-params.interface';

@Component({
    selector: 'mb-standard-deviation-params',
    templateUrl: './standard-deviation-params.component.html',
    styleUrls: ['./standard-deviation-params.component.scss'],
    standalone: false
})
export class StandardDeviationParamsComponent implements OnInit {

  protected params: StandardDeviationParams = {
    length: 6, unbiased: true, barComponent: BarComponent.Close
  };

  protected get lengthParam(): number {
    return this.params.length;
  }
  protected set lengthParam(value: number) {
    if (!value || value < 2) {
      value = 2;
    }
    this.params.length = value;
    this.params = { ...this.params };
    this.selectionChange.emit(this.params);
  }

  protected get unbiasedParam(): boolean {
    return this.params.unbiased;
  }
  protected set unbiasedParam(value: boolean) {
    this.params.unbiased = value;
    this.params = { ...this.params };
    this.selectionChange.emit(this.params);
  }

  protected barComponentVisible = this.params.barComponent !== undefined;
  protected quoteComponentVisible = this.params.quoteComponent !== undefined;

  /** Event emitted when the selected value has been changed by the user. */
  @Output() readonly selectionChange: EventEmitter<StandardDeviationParams> = new EventEmitter<StandardDeviationParams>();

  /** Specifies an initial value. */
  @Input() set initial(value: StandardDeviationParams) {
    this.params = value;
    this.barComponentVisible = value.barComponent !== undefined;
    this.quoteComponentVisible = value.quoteComponent !== undefined;
  }

  ngOnInit() {
    this.selectionChange.emit(this.params);
  }

  protected barComponentChanged(component: BarComponent) {
    this.params.barComponent = component;
    this.params = { ...this.params };
    this.selectionChange.emit(this.params);
  }

  protected quoteComponentChanged(component: QuoteComponent) {
    this.params.quoteComponent = component;
    this.params = { ...this.params };
    this.selectionChange.emit(this.params);
  }
}

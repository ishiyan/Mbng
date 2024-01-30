import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

import { BarComponent } from '../../../data/entities/bar-component.enum';
import { QuoteComponent } from '../../../data/entities/quote-component.enum';

import { SimpleMovingAverageParams } from './simple-moving-average-params.interface';

@Component({
  selector: 'mb-simple-moving-average-params',
  templateUrl: './simple-moving-average-params.component.html',
  styleUrls: ['./simple-moving-average-params.component.scss']
})
export class SimpleMovingAverageParamsComponent implements OnInit {

  protected params: SimpleMovingAverageParams = {
    length: 6, barComponent: BarComponent.Close
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

  protected barComponentVisible = this.params.barComponent !== undefined;
  protected quoteComponentVisible = this.params.quoteComponent !== undefined;

  /** Event emitted when the selected value has been changed by the user. */
  @Output() readonly selectionChange: EventEmitter<SimpleMovingAverageParams> = new EventEmitter<SimpleMovingAverageParams>();

  /** Specifies an initial value. */
  @Input() set initial(value: SimpleMovingAverageParams) {
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

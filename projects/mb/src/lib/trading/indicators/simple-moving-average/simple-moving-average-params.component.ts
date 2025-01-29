import { Component, input, output, effect, OnInit, ChangeDetectionStrategy } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatFormField, MatLabel } from '@angular/material/form-field';
import { MatInput } from '@angular/material/input';

import { BarComponent } from '../../../data/entities/bar-component.enum';
import { QuoteComponent } from '../../../data/entities/quote-component.enum';
import { BarComponentComponent } from '../../../data/entities/bar-component.component';
import { QuoteComponentComponent } from '../../../data/entities/quote-component.component';
import { SimpleMovingAverageParams } from './simple-moving-average-params.interface';

@Component({
    selector: 'mb-simple-moving-average-params',
    templateUrl: './simple-moving-average-params.component.html',
    styleUrls: ['./simple-moving-average-params.component.scss'],
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
  readonly selectionChange = output<SimpleMovingAverageParams>();

  /** Specifies an initial value. */
  initial = input.required<SimpleMovingAverageParams>();

  constructor() {
    effect(() => {
      const value = this.initial();
      this.params = value;
      this.barComponentVisible = value.barComponent !== undefined;
      this.quoteComponentVisible = value.quoteComponent !== undefined;
    });  
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

import { AfterContentInit, ChangeDetectionStrategy, Component, effect, input, output } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatFormField, MatLabel } from '@angular/material/form-field';
import { MatInput } from '@angular/material/input';

import { BarComponent } from '../../../../data/entities/bar-component.enum';
import { QuoteComponent } from '../../../../data/entities/quote-component.enum';
import { BarComponentComponent } from '../../../../data/entities/bar-component.component';
import { QuoteComponentComponent } from '../../../../data/entities/quote-component.component';
import { JurikMovingAverageParams } from './jurik-moving-average-params.interface';

@Component({
  selector: 'mb-jurik-moving-average-params',
  templateUrl: './jurik-moving-average-params.component.html',
  styleUrls: ['./jurik-moving-average-params.component.scss'],
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
export class JurikMovingAverageParamsComponent implements AfterContentInit {
  private initialized = false;

  protected params: JurikMovingAverageParams = {
    length: 10, phase: 0, barComponent: BarComponent.Close
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
    this.notify();
  }

  protected get phaseParam(): number {
    return this.params.phase;
  }
  protected set phaseParam(value: number) {
    if (!value) {
      value = 0;
    } else if (value < -100) {
      value = -100;
    } else if (value > 100) {
      value = 100;
    }
    this.params.phase = value;
    this.params = { ...this.params };
    this.notify();
  }

  protected barComponentVisible = this.params.barComponent !== undefined;
  protected quoteComponentVisible = this.params.quoteComponent !== undefined;
  
  /** Event emitted when the selected value has been changed by the user. */
  readonly selectionChange = output<JurikMovingAverageParams>();

  /** Specifies an initial value. */
  initial = input.required<JurikMovingAverageParams>();

  constructor() {
    effect(() => {
      const value = this.initial();
      this.params = value;
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

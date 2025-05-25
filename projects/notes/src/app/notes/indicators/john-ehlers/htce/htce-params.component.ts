import { ChangeDetectionStrategy, Component, effect, input, output } from '@angular/core';
import { MatIcon } from '@angular/material/icon';
import { MatIconButton } from '@angular/material/button';

import { BarComponent, BarComponentComponent } from 'mb';
import { HilbertTransformerCycleEstimatorType } from 'mb';
import { HilbertTransformerCycleEstimatorTypeComponent } from 'mb';
import { HilbertTransformerCycleEstimatorParams } from 'mb';
import { HilbertTransformerCycleEstimatorParamsComponent } from 'mb';
import { LineStyle, LineStyleSelectorComponent } from 'mb';

import { Htce } from './htce.interface';

@Component({
  selector: 'app-htce-params',
  templateUrl: './htce-params.component.html',
  styleUrls: ['./htce-params.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [
    MatIcon,
    MatIconButton,
    BarComponentComponent,
    LineStyleSelectorComponent,
    HilbertTransformerCycleEstimatorTypeComponent,
    HilbertTransformerCycleEstimatorParamsComponent
  ]
})
export class HtceParamsComponent {

  /** Specifies the input values. */
  readonly initial = input.required<Htce>();

  constructor() {
    effect(() => {
      const init = this.initial();
      this.current = init;
      this.barComponent = init.barComponent;
      this.barComponentVisible = init.barComponent !== undefined;
    });
  }

  /** Event emitted when the indicator has been removed by the user. */
  readonly removed = output<Htce>();

  /** Event emitted when the indicator has been changed by the user. */
  readonly changed = output<Htce>();

  protected current!: Htce;
  protected barComponent?: BarComponent;
  protected barComponentVisible = this.barComponent !== undefined;

  protected updateStyle(style: LineStyle) {
    this.current.style = style;
    this.changed.emit(this.current);
  }

  protected updateType(estimatorType: HilbertTransformerCycleEstimatorType) {
    if (this.sameType(estimatorType)) {
      return;
    }
    this.current.estimatorType = estimatorType;
    this.changed.emit(this.current);
  }

  protected updateParams(params: HilbertTransformerCycleEstimatorParams) {
    if (this.sameParams(params)) {
      return;
    }
    this.current.params = params;
    this.changed.emit(this.current);
  }

  protected remove(): void {
    this.removed.emit(this.current);
  }

  protected barComponentChanged(component: BarComponent) {
    this.current.barComponent = component;
    this.changed.emit(this.current);
  }

  private sameType(estimatorType: HilbertTransformerCycleEstimatorType): boolean {
    return this.current.estimatorType === estimatorType;
  }

  private sameParams(params: HilbertTransformerCycleEstimatorParams): boolean {
    return this.current.params.smoothingLength !== params.smoothingLength ||
      this.current.params.alphaEmaQuadratureInPhase !== params.alphaEmaQuadratureInPhase ||
      this.current.params.alphaEmaPeriod !== params.alphaEmaPeriod ||
      this.current.params.warmUpPeriod !== params.warmUpPeriod;
  }
}

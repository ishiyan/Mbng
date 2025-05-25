import { ChangeDetectionStrategy, Component, effect, input, output } from '@angular/core';
import { MatIcon } from '@angular/material/icon';
import { MatIconButton } from '@angular/material/button';

import { MesaAdaptiveMovingAverageLengthParams, MesaAdaptiveMovingAverageSmoothingFactorParams } from 'mb';
import { MesaAdaptiveMovingAverageParamsComponent } from 'mb';
import { LineStyle, LineStyleSelectorComponent } from 'mb';

import { Mama } from './mama.interface';

const guardLength = (object: any): object is MesaAdaptiveMovingAverageLengthParams => 'fastLength' in object;

@Component({
  selector: 'app-mama-params',
  templateUrl: './mama-params.component.html',
  styleUrls: ['./mama-params.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [
    MatIcon,
    MatIconButton,
    LineStyleSelectorComponent,
    MesaAdaptiveMovingAverageParamsComponent
  ]
})
export class MamaParamsComponent {

  /** Specifies the input values. */
  readonly initial = input.required<Mama>();

  constructor() {
    effect(() => {
      this.current = this.initial();
    });
  }

  /** Event emitted when the indicator has been removed by the user. */
  readonly removed = output<Mama>();

  /** Event emitted when the indicator has been changed by the user. */
  readonly changed = output<Mama>();

  protected current!: Mama;

  protected updateStyle(style: LineStyle) {
    this.current.style = style;
    this.changed.emit(this.current);
  }

  protected updateParams(params: MesaAdaptiveMovingAverageLengthParams | MesaAdaptiveMovingAverageSmoothingFactorParams) {
    if (this.sameParams(params)) {
      return;
    }
    this.current.params = params;
    this.changed.emit(this.current);
  }

  protected remove(): void {
    this.removed.emit(this.current);
  }

  private sameParams(
    params: MesaAdaptiveMovingAverageLengthParams | MesaAdaptiveMovingAverageSmoothingFactorParams
  ): boolean {
    if (this.current.params.estimatorType === undefined) {
      if (params.estimatorType !== undefined) {
        return false;
      }
    } else if (this.current.params.estimatorType !== params.estimatorType) {
      return false;
    }

    if (this.current.params.estimatorParams === undefined) {
      if (params.estimatorParams !== undefined) {
        return false;
      }
    } else if (params.estimatorParams === undefined) {
      return false;
    } else if (
      this.current.params.estimatorParams.smoothingLength !== params.estimatorParams.smoothingLength ||
      this.current.params.estimatorParams.alphaEmaQuadratureInPhase !== params.estimatorParams.alphaEmaQuadratureInPhase ||
      this.current.params.estimatorParams.alphaEmaPeriod !== params.estimatorParams.alphaEmaPeriod ||
      this.current.params.estimatorParams.warmUpPeriod !== params.estimatorParams.warmUpPeriod) {
      return false;
    }
    if (guardLength(params)) {
      if (guardLength(this.current.params)) {
        if (this.current.params.fastLimitLength !== params.fastLimitLength ||
          this.current.params.slowLimitLength !== params.slowLimitLength) {
          return false;
          }
      }
    } else {
      if (!guardLength(this.current.params)) {
        if (this.current.params.fastLimitSmoothingFactor !== params.fastLimitSmoothingFactor ||
          this.current.params.slowLimitSmoothingFactor !== params.slowLimitSmoothingFactor) {
          return false;
        }
      }
    }
    return true;
  }
}

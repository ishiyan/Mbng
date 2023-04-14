import { ChangeDetectionStrategy, Component, EventEmitter, Input, Output } from '@angular/core';

import { ExponentialMovingAverageLengthParams, ExponentialMovingAverageSmoothingFactorParams } from 'mb';
import { LineStyle } from 'mb';
import { Ema } from './ema.interface';

@Component({
  selector: 'app-ema-params',
  templateUrl: './ema-params.component.html',
  styleUrls: ['./ema-params.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class EmaParamsComponent {

  /** Specifies the input values. */
  @Input() set initial(ema: Ema) {
    this.current = ema;
  }

  /** Event emitted when the indicator has been removed by the user. */
  @Output() readonly removed: EventEmitter<Ema> = new EventEmitter<Ema>();

  /** Event emitted when the indicator has been changed by the user. */
  @Output() readonly changed: EventEmitter<Ema> = new EventEmitter<Ema>();

  protected current!: Ema;

  protected updateStyle(style: LineStyle) {
    this.current.style = style;
    this.changed.emit(this.current);
  }

  protected updateParams(params: ExponentialMovingAverageLengthParams | ExponentialMovingAverageSmoothingFactorParams) {
    this.current.params = params;
    this.changed.emit(this.current);
  }

  protected remove(): void {
    this.removed.emit(this.current);
  }
}
